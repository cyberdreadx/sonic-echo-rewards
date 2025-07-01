
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

async function generateSignature(timestamp: number, accessSecret: string, accessKey: string): Promise<string> {
  const stringToSign = `POST\n/v1/identify\n${accessKey}\naudio\n1\n${timestamp}`;
  
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
  console.log('Starting music recognition process...');
  
  // Get credentials from environment variables with proper error handling
  const accessKey = Deno.env.get('ACRCLOUD_ACCESS_KEY');
  const accessSecret = Deno.env.get('ACRCLOUD_ACCESS_SECRET');
  const host = Deno.env.get('ACRCLOUD_HOST') || 'identify-eu-west-1.acrcloud.com';

  console.log('Credentials check:', {
    hasAccessKey: !!accessKey,
    hasAccessSecret: !!accessSecret,
    accessKeyLength: accessKey?.length || 0,
    accessSecretLength: accessSecret?.length || 0,
    host: host
  });

  if (!accessKey || !accessSecret) {
    const error = `Missing ACRCloud credentials - Access Key: ${!!accessKey}, Access Secret: ${!!accessSecret}`;
    console.error(error);
    console.error('Available environment variables:', Object.keys(Deno.env.toObject()));
    throw new Error(error);
  }

  // Validate credentials format
  if (accessKey.length < 10 || accessSecret.length < 10) {
    const error = `Invalid credential format - Access Key length: ${accessKey.length}, Secret length: ${accessSecret.length}`;
    console.error(error);
    throw new Error(error);
  }

  console.log('Audio processing:', {
    blobSize: audioBlob.size,
    blobType: audioBlob.type
  });

  // Validate audio size
  if (audioBlob.size < 10000) { // Less than 10KB is probably too small
    throw new Error(`Audio file too small: ${audioBlob.size} bytes - ACRCloud needs at least 3-5 seconds of audio`);
  }

  // Convert to ArrayBuffer for processing
  const audioBuffer = await audioBlob.arrayBuffer();
  console.log('Audio buffer size:', audioBuffer.byteLength);

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = await generateSignature(timestamp, accessSecret, accessKey);
  
  // Create form data according to ACRCloud API specification
  const formData = new FormData();
  
  // Create proper File object from audio data
  const audioFile = new File([audioBuffer], 'audio.webm', { 
    type: audioBlob.type || 'audio/webm' 
  });
  
  console.log('Created audio file:', {
    name: audioFile.name,
    size: audioFile.size,
    type: audioFile.type
  });
  
  formData.append('sample', audioFile);
  formData.append('access_key', accessKey);
  formData.append('data_type', 'audio');
  formData.append('signature_version', '1');
  formData.append('signature', signature);
  formData.append('timestamp', timestamp.toString());
  formData.append('sample_bytes', audioBuffer.byteLength.toString());
  
  console.log('API request details:', {
    host,
    timestamp,
    signaturePreview: signature.substring(0, 10) + '...',
    audioSize: audioBuffer.byteLength,
    formDataKeys: Array.from(formData.keys()),
    accessKeyPreview: accessKey.substring(0, 4) + '...' + accessKey.substring(accessKey.length - 4)
  });

  try {
    const response = await fetch(`https://${host}/v1/identify`, {
      method: 'POST',
      body: formData,
    });

    console.log('API response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ACRCloud API error response:', errorText);
      throw new Error(`ACRCloud API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('ACRCloud API response:', result);
    return result;
  } catch (error) {
    console.error('ACRCloud API request failed:', error);
    throw error;
  }
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

    const contentType = req.headers.get('content-type') || '';
    console.log('Request content type:', contentType);
    
    // Handle test requests for credential checking
    if (contentType.includes('application/json')) {
      const body = await req.json();
      if (body.test) {
        console.log('Credential test request received');
        
        const accessKey = Deno.env.get('ACRCLOUD_ACCESS_KEY');
        const accessSecret = Deno.env.get('ACRCLOUD_ACCESS_SECRET');
        
        console.log('Test - Environment check:', {
          hasAccessKey: !!accessKey,
          hasAccessSecret: !!accessSecret,
          accessKeyLength: accessKey?.length || 0,
          accessSecretLength: accessSecret?.length || 0,
        });
        
        if (!accessKey || !accessSecret) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'ACRCloud credentials not configured in Supabase secrets' 
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'ACRCloud credentials are properly configured' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle audio recognition requests
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      console.log('No audio file found in request');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'No audio file provided' 
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log('Processing audio recognition request:', {
      fileName: audioFile.name,
      fileSize: audioFile.size,
      fileType: audioFile.type
    });

    const response = await recognizeAudio(audioFile);
    console.log('Recognition response received:', {
      statusCode: response.status.code,
      statusMessage: response.status.msg,
      hasMetadata: !!response.metadata,
      hasMusic: !!response.metadata?.music?.[0]
    });

    if (response.status.code === 0) {
      const musicInfo = formatMusicInfo(response);
      if (musicInfo) {
        return new Response(JSON.stringify({ 
          success: true, 
          data: musicInfo 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'No music match found' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      console.log('ACRCloud API returned error:', response.status);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `ACRCloud error: ${response.status.msg} (Code: ${response.status.code})` 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Music recognition function error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: `Recognition failed: ${error.message}` 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
