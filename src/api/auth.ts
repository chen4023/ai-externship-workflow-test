import { publicApi } from './instance';

// --- 타입 정의 ---

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    nickname: string;
  };
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: string;
    email: string;
    nickname: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

// --- API 함수 ---

const AUTH_BASE = '/api/auth';

export async function login(params: LoginRequest): Promise<LoginResponse> {
  const { data } = await publicApi.post<LoginResponse>(
    `${AUTH_BASE}/login`,
    params,
  );
  return data;
}

export async function signup(params: SignupRequest): Promise<SignupResponse> {
  const { data } = await publicApi.post<SignupResponse>(
    `${AUTH_BASE}/signup`,
    params,
  );
  return data;
}

export async function refreshToken(
  params: RefreshTokenRequest,
): Promise<RefreshTokenResponse> {
  const { data } = await publicApi.post<RefreshTokenResponse>(
    `${AUTH_BASE}/refresh`,
    params,
  );
  return data;
}
