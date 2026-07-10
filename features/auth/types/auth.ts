export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  gender?: string;
  dob?: string;
  phone?: string;
  image?: string | null;
  role: UserRole[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type AuthUserSummary = Pick<
  AuthUser,
  "id" | "email" | "first_name" | "last_name" | "role"
>;

export interface ApiResponse<T> {
  status_code: number;
  message: string | null;
  data: T | null;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthSession extends AuthTokens {
  status_code?: number;
  message?: string | null;
  user: AuthUserSummary;
  session_id?: string;
  session_expires_at?: string | Date;
}

export interface RefreshTokenResponse extends AuthTokens {
  status_code?: number;
  message?: string | null;
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
  middle_name?: string;
  gender?: string;
  dob?: string;
  email: string;
  phone?: string;
  role?: UserRole[];
  password: string;
  is_active?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLoginRequest {
  token: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifySignupRequest {
  email: string;
  code: string;
}

export interface LogoutRequest {
  session_id: string;
  user_id: string;
}

export interface Enable2faData {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface Enable2faResponse {
  status_code: number;
  message: string;
  data: Enable2faData;
}

/**
 * Payload for `PATCH /auth/me`. All fields are optional — only fields that
 * are present on the body are applied. `email` is intentionally NOT part of
 * this payload: the backend rejects email changes through this route.
 */
export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  middle_name?: string | null;
  gender?: string | null;
  dob?: string | null;
  phone?: string | null;
  image?: string | null;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
