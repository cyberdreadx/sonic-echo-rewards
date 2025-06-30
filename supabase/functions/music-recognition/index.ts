
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ACRCloudResponse {
  status: {
    msg: string;
    code: number;
  };
  metadata?: {
    music?: Array<{
      title: string;
      artists: Array<{
        name: string;
      }>;
      album?: {
        name: string;
      };
      external_metadata?: {
        spotify?: {
          track?: {
            id: string;
          };
        };
        apple_music?: {
          track?: {
            id: string;
          };
        };
        youtube?: {
          vid: string;
        };
      };
      play_offset_ms: number;
      score: number;
    }>;
  };
}

async function generateSignature(timestamp: number, accessSecret: string): Promise<string> {
  const stringToSign = `POST\n/v1/identify\n${Deno.env.get('ACRCLOUD_ACCESS_KEY')}\naudio\n1\n${timestamp}`;
  
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(accessSecret);
  const dataBytes = encoder.encode(stringToSign);
  
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, dataBytes);
  const signatureArray = new Uint8Array(signature);
  const base64Signature = btoa(String.fromCharCode(...signatureArray));
  
  return base64Signature;
}

async function recognizeAudio(audioBlob: Blob): Promise<ACRCloudResponse> {
  const accessKey = Deno.env.get('ACRCLOUD_ACCESS_KEY');
  const accessSecret = Deno.env.get('ACRCLOUD_ACCESS_SECRET');
  const host = Deno.env.get('ACRCLOUD_HOST') || 'identify-eu-west-1.acrcloud.com';

  if (!accessKey || !accessSecret) {
    throw new Error('ACRCloud credentials not configured');
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = await generateSignature(timestamp, accessSecret);
  
  const formData = new FormData();
  formData.append('sample', audioBlob, 'audio.webm');
  formData.append('access_key', accessKey);
  formData.append('data_type', 'audio');
  formData.append('signature_version', '1');
  formData.append('signature', signature);
  formData.append('timestamp', timestamp.toString());
  
  const response = await fetch(`https://${host}/v1/identify`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`ACRCloud API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

function formatMusicInfo(response: ACRCloudResponse) {
  if (!response.metadata?.music?.[0]) {
    return null;
  }

  const track = response.metadata.music[0];
  const artists = track.artists.map(artist => artist.name).join(', ');
  const external = track.external_metadata;

  return {
    title: track.title,
    artists,
    album: track.album?.name,
    score: track.score,
    playOffset: track.play_offset_ms,
    availableOn: {
      spotify: !!external?.spotify?.track?.id,
      appleMusic: !!external?.apple_music?.track?.id,
      youtube: !!external?.youtube?.vid,
    },
    links: {
      spotify: external?.spotify?.track?.id ? `https://open.spotify.com/track/${external.spotify.track.id}` : null,
      appleMusic: external?.apple_music?.track?.id ? `https://music.apple.com/song/${external.apple_music.track.id}` : null,
      youtube: external?.youtube?.vid ? `https://www.youtube.com/watch?v=${external.youtube.vid}` : null,
    }
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const formData = await req.formData();
    const audioBlob = formData.get('audio') as File;

    if (!audioBlob) {
      return new Response('No audio file provided', { status: 400, headers: corsHeaders });
    }

    console.log('Processing audio recognition request');
    const response = await recognizeAudio(audioBlob);
    console.log('ACRCloud response:', response);

    if (response.status.code === 0) {
      const musicInfo = formatMusicInfo(response);
      if (musicInfo) {
        return new Response(JSON.stringify({ success: true, data: musicInfo }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ success: false, error: 'No match found' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new Response(JSON.stringify({ success: false, error: response.status.msg }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Music recognition error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
