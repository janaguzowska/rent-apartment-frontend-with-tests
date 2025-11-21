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

  async request<T>(url: string, options: RequestInit = {}, params?: Record<string, string | number | boolean>, body?: any): Promise<T> {
    let fullUrl = this.baseUrl + url;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      fullUrl += `?${searchParams.toString()}`;
    }

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(fullUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }
    return response.json() as T;
  }

  async post<T>(url: string, params?: Record<string, string | number | boolean>, body?: any): Promise<T> {
    return this.request<T>(url, {method: 'POST'}, params, body);
  }

  async delete<T> (url: string, params?: Record<string, string | number | boolean>):Promise<T> {
    return this.request<T>(url, {method: 'DELETE'}, params);
  }

  async get<T>(url: string, params?: Record<string, string | number | boolean>):Promise<T> {
    return this.request<T>(url, {method: 'GET'}, params);
  }
}

export const api = new ApiService(BASE_URL);
