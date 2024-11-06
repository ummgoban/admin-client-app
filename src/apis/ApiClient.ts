import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from 'react-native-config';

import {SessionType} from '@/types/Session';
import {getStorage} from '@/utils/storage';
import {DefaultResponseType} from '@/types/Api';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private _JWTToken: string | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: Config.SERVER_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const session: SessionType | null = await getStorage('session');

        this._JWTToken = session?.accessToken ?? null;

        if (this._JWTToken) {
          config.headers.Authorization = `Bearer ${this._JWTToken}`;
        }
        console.debug('Request:', config);
        return config;
      },
      error => Promise.reject(error),
    );

    // 응답 인터셉터: 응답에서 토큰을 받아 저장
    this.axiosInstance.interceptors.response.use(
      response => {
        if (response.data && response.data.token) {
          this._JWTToken = response.data.token; // 토큰 갱신
          console.log('토큰 갱신:', this._JWTToken);
        }
        return response;
      },
      error => Promise.reject(error),
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  get = async <T>(url: string): Promise<T | null> => {
    try {
      const res = await this.axiosInstance.get<DefaultResponseType<T>>(url);
      console.log(res);
      if (res.data.code === 200 && res.data.data) {
        return res.data.data;
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  post = async <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T | null> => {
    try {
      const res = await this.axiosInstance.post<DefaultResponseType<T>>(
        url,
        body,
        config,
      );
      if (res.data.code === 200 && res.data.data) {
        return res.data.data;
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  patch = async <T>(url: string, body: unknown): Promise<T | null> => {
    try {
      const res = await this.axiosInstance.patch<DefaultResponseType<T>>(
        url,
        body,
      );

      if (res.data.code === 200 && res.data.data) {
        return res.data.data;
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  put = async <T>(url: string, body: unknown): Promise<T | null> => {
    try {
      const res = await this.axiosInstance.put<DefaultResponseType<T>>(
        url,
        body,
      );

      if (res.data.code === 200 && res.data.data) {
        return res.data.data;
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  del = async <T>(url: string, body?: unknown): Promise<T | null> => {
    try {
      const res = await this.axiosInstance.delete<DefaultResponseType<T>>(url, {
        data: body,
      });

      if (res.data.code === 200 && res.data.data) {
        return res.data.data;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

const apiClient = ApiClient.getInstance();

export default apiClient;
