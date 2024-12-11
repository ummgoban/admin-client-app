import apiClient from './ApiClient';
export const registerFCMToken = async (
  deviceToken: string,
): Promise<boolean> => {
  console.log('Register FCM Token:', deviceToken);
  try {
    const res = await apiClient.post<{code: number; message: string}>(
      '/members/device-token',
      {},
      {
        params: {
          deviceToken,
        },
      },
    );
    return !!res && res.code === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
