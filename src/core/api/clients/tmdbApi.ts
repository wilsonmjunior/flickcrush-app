const TMDB_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

interface TMDbRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: BodyInit | null;
  [key: string]: any;
}

class TMDbClient {
  private accessToken: string;
  private baseURL: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.baseURL = TMDB_BASE_URL!;
  }

  async request<T = any>(endpoint: string, options: TMDbRequestOptions = {}): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);

    // const curl = CurlGenerator.generateCurl(this.baseURL, endpoint, options, this.accessToken);
    // console.log('curl: ', curl);

    // Adiciona parâmetros
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: options.method || 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('errorData: ', errorData);
        throw new Error(
          `TMDb API Error: ${response.status} - ${errorData.status_message || response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('TMDb API Request failed:', error);
      throw error;
    }
  }
}

export const tmdbClient = new TMDbClient(process.env.EXPO_PUBLIC_ACCESS_TOKEN!);

interface CurlOptions {
  pretty?: boolean;
  includeHeaders?: boolean;
  timeout?: number;
}

class CurlGenerator {
  static generateCurl(
    baseURL: string,
    endpoint: string,
    options: TMDbRequestOptions = {},
    accessToken: string,
    curlOptions: CurlOptions = {}
  ): string {
    const { pretty = true, includeHeaders = true, timeout = 30 } = curlOptions;

    // Construir URL com parâmetros
    const url = new URL(`${baseURL}${endpoint}`);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    // Construir comando curl
    let curlCommand = `curl`;

    // Adicionar timeout
    curlCommand += ` --connect-timeout ${timeout}`;

    // Método HTTP
    const method = options.method || 'GET';
    if (method !== 'GET') {
      curlCommand += ` -X ${method}`;
    }

    // Headers
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    Object.entries(headers).forEach(([key, value]) => {
      curlCommand += ` -H "${key}: ${value}"`;
    });

    // Body (para POST, PUT, PATCH)
    if (options.body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      let bodyContent = '';

      if (typeof options.body === 'string') {
        bodyContent = options.body;
      } else {
        bodyContent = JSON.stringify(options.body);
      }

      // Escapar aspas no JSON
      const escapedBody = bodyContent.replace(/"/g, '\\"');
      curlCommand += ` -d "${escapedBody}"`;
    }

    // Incluir headers de resposta
    if (includeHeaders) {
      curlCommand += ` -i`;
    }

    // URL (sempre por último)
    curlCommand += ` "${url.toString()}"`;

    // Formatação pretty
    if (pretty) {
      return this.formatPrettyCurl(curlCommand);
    }

    return curlCommand;
  }

  private static formatPrettyCurl(curlCommand: string): string {
    return curlCommand.replace(/ -/g, ' \\\n  -').replace(/ "http/, ' \\\n  "http');
  }
}
