export type SessionType = {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpiresAt?: number;
  refreshTokenExpiresAt?: number;
  OAuthProvider: 'NAVER' | 'KAKAO' | 'APPLE';
  jwt: string;
};

export type StorageType = {
  session: SessionType;
};

export type StorageKeyType = keyof StorageType;
