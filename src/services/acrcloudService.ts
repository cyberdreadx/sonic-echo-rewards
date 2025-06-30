
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

  async recognizeAudio(audioBlob: Blob): Promise<ACRCloudResponse> {
    const formData = new FormData();
    formData.append('sample', audioBlob);
    formData.append('access_key', this.config.accessKey);
    
    // Generate timestamp and signature
    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `POST\n/v1/identify\n${this.config.accessKey}\naudio\n1\n${timestamp}`;
    
    // Note: In a real implementation, you'd need to generate HMAC-SHA1 signature
    // For now, we'll make a direct API call (this requires CORS to be enabled on ACRCloud side)
    
    try {
      const response = await fetch(`https://${this.config.host}/v1/identify`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`ACRCloud API error: ${response.status}`);
      }

      return await response.json();
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
