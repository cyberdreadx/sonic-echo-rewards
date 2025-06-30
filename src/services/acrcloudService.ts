
interface ACRCloudConfig {
  accessKey: string;
  accessSecret: string;
  host: string;
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

export class ACRCloudService {
  private config: ACRCloudConfig;

  constructor(config: ACRCloudConfig) {
    this.config = config;
  }

  private async generateSignature(timestamp: number): Promise<string> {
    const stringToSign = `POST\n/v1/identify\n${this.config.accessKey}\naudio\n1\n${timestamp}`;
    
    // Convert secret to bytes
    const encoder = new TextEncoder();
    const keyBytes = encoder.encode(this.config.accessSecret);
    const dataBytes = encoder.encode(stringToSign);
    
    // Import key for HMAC
    const key = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign']
    );
    
    // Generate signature
    const signature = await crypto.subtle.sign('HMAC', key, dataBytes);
    
    // Convert to base64
    const signatureArray = new Uint8Array(signature);
    const base64Signature = btoa(String.fromCharCode(...signatureArray));
    
    return base64Signature;
  }

  async recognizeAudio(audioBlob: Blob): Promise<ACRCloudResponse> {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await this.generateSignature(timestamp);
    
    const formData = new FormData();
    formData.append('sample', audioBlob, 'audio.webm');
    formData.append('access_key', this.config.accessKey);
    formData.append('data_type', 'audio');
    formData.append('signature_version', '1');
    formData.append('signature', signature);
    formData.append('timestamp', timestamp.toString());
    
    try {
      const response = await fetch(`https://${this.config.host}/v1/identify`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`ACRCloud API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('ACRCloud API response:', result);
      return result;
    } catch (error) {
      console.error('ACRCloud recognition failed:', error);
      throw error;
    }
  }

  formatMusicInfo(response: ACRCloudResponse) {
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
}
