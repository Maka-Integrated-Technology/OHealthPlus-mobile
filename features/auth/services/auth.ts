import { axiosPublic, axiosPrivate } from "@/config/axios";
import type {
  AuthSession,
  AuthUser,
  Enable2faResponse,
  ForgotPasswordRequest,
  GoogleLoginRequest,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
  SignupRequest,
  VerifySignupRequest,
} from "@/features/auth/types/auth";

class AuthService {
  static signup = async (data: SignupRequest): Promise<AuthSession> => {
    const response = await axiosPublic.post<AuthSession>("/auth/signup", data);
    return response.data;
  };

  static login = async (data: LoginRequest): Promise<AuthSession> => {
    const response = await axiosPublic.post<AuthSession>("/auth/login", data);
    return response.data;
  };

  static googleLogin = async (data: GoogleLoginRequest): Promise<AuthSession> => {
    const response = await axiosPublic.post<AuthSession>(
      "/auth/google-login",
      data
    );
    return response.data;
  };

  static refreshToken = async (
    data: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    const response = await axiosPublic.post<RefreshTokenResponse>(
      "/auth/refresh",
      data
    );
    return response.data;
  };

  static forgotPassword = async (data: ForgotPasswordRequest): Promise<void> => {
    await axiosPublic.post("/auth/forgot-password", data);
  };

  static resetPassword = async (data: ResetPasswordRequest): Promise<void> => {
    await axiosPublic.post("/auth/reset-password", data);
  };

  static verifySignup = async (data: VerifySignupRequest): Promise<void> => {
    await axiosPublic.post("/auth/verify", data);
  };

  static resendVerification = async (data: { email: string }): Promise<void> => {
    await axiosPublic.post("/auth/verify/resend", data);
  };

  static activateAccount = async (userId: string): Promise<void> => {
    await axiosPublic.patch(`/auth/users/${userId}/activate`);
  };

  static getMe = async (options?: {
    signal?: AbortSignal;
  }): Promise<AuthUser> => {
    const response = await axiosPrivate.get<AuthUser>("/auth/me", {
      signal: options?.signal,
    });
    return response.data;
  };

  static logout = async (data: LogoutRequest): Promise<void> => {
    await axiosPrivate.post("/auth/logout", data);
  };

  static enable2fa = async (userId: string): Promise<Enable2faResponse> => {
    const response = await axiosPrivate.post<Enable2faResponse>(
      `/auth/2fa/enable/${userId}`
    );
    return response.data;
  };
}

export default AuthService;
