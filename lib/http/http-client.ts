export interface HttpRequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
}

export class HttpClient {
  private buildUrl(url: string, query?: HttpRequestOptions["query"]) {
    if (!query) return url;

    const searchParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, String(value));
      }
    });

    const queryString = searchParams.toString();

    return queryString ? `${url}?${queryString}` : url;
  }

  async get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    const response = await fetch(this.buildUrl(url, options?.query), {
      method: "GET",
      headers: options?.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}

export const httpClient = new HttpClient();