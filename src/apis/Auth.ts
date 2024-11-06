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
      accessToken: string;
      refreshToken: string;
    }>('/auth/login', {
      provider,
      roles: 'ROLE_STORE_OWNER',
      accessToken,
    });

    console.debug(response);

    return response;
  } catch (error) {
    console.error('로그인 에러:', error);
    return null;
  }
};
