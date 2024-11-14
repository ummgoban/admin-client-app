import apiClient from './ApiClient';

export const loginAuth = async (
  provider: 'KAKAO' | 'NAVER',
  accessToken: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> => {
  try {
    const response = await apiClient.post<{
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }>('/auth/login', {
      provider,
      roles: 'ROLE_STORE_OWNER',
      accessToken,
    });

    return response?.data ?? null;
  } catch (error) {
    console.error('로그인 에러:', error);
    return null;
  }
};
