import { queryClient } from "@/config/queryClient";
import AuthService from "@/features/auth/services/auth";
import type {
  AuthSession,
  ChangePasswordPayload,
  ForgotPasswordRequest,
  GoogleLoginRequest,
  LoginRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
  SignupRequest,
  UpdateProfilePayload,
  VerifySignupRequest,
} from "@/features/auth/types/auth";
import { QUERY_KEYS } from "@/utils/queryKeys";
import {
  clearAuthStorage,
  getRefreshToken,
  getSessionId,
  getUserId,
  saveRefreshToken,
  saveSessionExpiresAt,
  saveSessionId,
  saveToken,
  saveUser,
} from "@/utils/secureStorage";
import { useMutation, useQuery } from "@tanstack/react-query";

async function persistAuthSession(session: AuthSession) {
  const tasks: Promise<void>[] = [];

  if (session.access_token) tasks.push(saveToken(session.access_token));
  if (session.refresh_token)
    tasks.push(saveRefreshToken(session.refresh_token));
  if (session.user)
    tasks.push(saveUser(session.user as unknown as Record<string, unknown>));
  if (session.session_id) tasks.push(saveSessionId(session.session_id));
  if (session.session_expires_at)
    tasks.push(saveSessionExpiresAt(String(session.session_expires_at)));

  await Promise.all(tasks);
}

export function useSignup() {
  return useMutation({
    mutationFn: (data: SignupRequest) => AuthService.signup(data),
    onSuccess: async (session) => {
      console.log("session", session);
      await persistAuthSession(session);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.me });
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => AuthService.login(data),
    onSuccess: async (session) => {
      await persistAuthSession(session);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.me });
    },
  });
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: (data: GoogleLoginRequest) => AuthService.googleLogin(data),
    onSuccess: async (session) => {
      await persistAuthSession(session);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.me });
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async () => {
      const refresh_token = await getRefreshToken();
      if (!refresh_token) throw new Error("No refresh token stored");
      return AuthService.refreshToken({ refresh_token });
    },
    onSuccess: async (data: RefreshTokenResponse) => {
      await Promise.all([
        saveToken(data.access_token),
        saveRefreshToken(data.refresh_token),
      ]);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      AuthService.forgotPassword(data),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => AuthService.resetPassword(data),
  });
}

export function useVerifySignup() {
  return useMutation({
    mutationFn: (data: VerifySignupRequest) => AuthService.verifySignup(data),
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) => AuthService.resendVerification({ email }),
  });
}

export function useActivateAccount() {
  return useMutation({
    mutationFn: (userId: string) => AuthService.activateAccount(userId),
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: QUERY_KEYS.auth.me,
    queryFn: ({ signal }) => AuthService.getMe({ signal }),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: UpdateProfilePayload) =>
      AuthService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.me });
    },
  });
}

/**
 * Authenticated change-password.
 *
 * Side-effect warning: the backend revokes every active session for the
 * user on success. Callers must treat a successful response like a forced
 * logout — clear local auth storage and redirect to sign-in.
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordPayload) =>
      AuthService.changePassword(data),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const [session_id, user_id] = await Promise.all([
        getSessionId(),
        getUserId(),
      ]);
      if (session_id && user_id) {
        await AuthService.logout({ session_id, user_id });
      }
    },
    onSettled: async () => {
      await clearAuthStorage();
      queryClient.removeQueries({ queryKey: QUERY_KEYS.auth.me });
    },
  });
}

export function useEnable2fa() {
  return useMutation({
    mutationFn: (userId: string) => AuthService.enable2fa(userId),
  });
}
