import {BASE_URL} from '../const.ts';

class ApiService {
  private baseUrl: string;

  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  async request<T>(url: string, options: RequestInit = {}, params?: Record<string, string | number | boolean>):Promise<T | string | null> {
    let fullUrl = this.baseUrl + url;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      fullUrl += `?${searchParams.toString()}`;
    }

    const response = await fetch(fullUrl, {
      ...options,
      headers: this.defaultHeaders,
    });
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    if (!contentLength || contentLength === '0') {
      return null;
    }
    if (!contentType || !contentType.includes('application/json')) {
      return response.text();
    }
    return response.json() as T;
  }

  async post<T>(url: string, params?: Record<string, string | number | boolean>): Promise<T | string | null> {
    return this.request<T>(url, {method: 'POST'}, params);
  }

  async delete<T> (url: string, params?: Record<string, string | number | boolean>):Promise<T | string | null> {
    return this.request<T>(url, {method: 'DELETE'}, params);
  }
}

export const api = new ApiService(BASE_URL);
