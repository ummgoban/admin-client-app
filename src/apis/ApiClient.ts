import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from 'react-native-config';

import {SessionType} from '@/types/Session';
import {getStorage} from '@/utils/storage';

class ApiError extends Error {
  response?: AxiosResponse & {
    data: {errorCode: number; errorMessage: string};
  };

  static isApiError = (error: any | unknown): error is ApiError => {
    return (
      error.response?.data?.errorCode !== undefined &&
      error.response?.data?.errorMessage !== undefined
    );
  };
}

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private _jwt: string | null = null;

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

        this._jwt = session?.jwt ?? null;

        if (this._jwt) {
          config.headers.Authorization = `Bearer ${this._jwt}`;
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
          this._jwt = response.data.token; // 토큰 갱신
          console.log('토큰 갱신:', this._jwt);
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

  get = async <T, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<T | null> => {
    try {
      const res = await this.axiosInstance.get<
        T,
        AxiosResponse<
          {
            data: T;
            code: number;
            message: string;
          },
          D
        >,
        D
      >(url, config);

      console.debug('GET', url, JSON.stringify(res.data, null, 2));

      if (res.data.code === 200 && res.data.data) {
        return res.data.data;
      }

      return null;
    } catch (error) {
      console.debug('GET', url, JSON.stringify(error, null, 2));
      if (ApiError.isApiError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
      return null;
    }
  };

  post = async <T, D = unknown>(
    url: string,
    body?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<T | null> => {
    try {
      const res: AxiosResponse = await this.axiosInstance.post<
        T,
        AxiosResponse<T, D>,
        D
      >(url, body, config);

      console.debug('POST', url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      console.debug('POST', url, JSON.stringify(error, null, 2));

      if (ApiError.isApiError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }

      return null;
    }
  };

  patch = async <T, D = unknown>(
    url: string,
    body: D,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<T | null> => {
    try {
      const res = await this.axiosInstance.patch<T, AxiosResponse<T, D>, D>(
        url,
        body,
        config,
      );

      console.debug('PATCH', url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      console.debug('PATCH', url, JSON.stringify(error, null, 2));
      if (ApiError.isApiError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
      return null;
    }
  };

  put = async <T, D = unknown>(
    url: string,
    body: D | undefined,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<T | null> => {
    try {
      const res = await this.axiosInstance.put<T, AxiosResponse<T, any>, D>(
        url,
        body,
        config,
      );

      console.debug('PUT', url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      console.debug('PUT', url, JSON.stringify(error, null, 2));
      if (ApiError.isApiError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
      return null;
    }
  };

  del = async <T>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<T | null> => {
    try {
      const res: AxiosResponse = await this.axiosInstance.delete(url, config);
      console.debug('DELETE', url, res.data);

      return res.data;
    } catch (error) {
      console.debug('DELETE', url, JSON.stringify(error, null, 2));
      if (ApiError.isApiError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
      return null;
    }
  };
}

const apiClient = ApiClient.getInstance();

export default apiClient;
