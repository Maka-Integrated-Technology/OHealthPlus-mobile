import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";
import { ROUTES } from "@/constants/routes";
import {
  clearAuthStorage,
  getRefreshToken,
  getToken,
  saveRefreshToken,
  saveSessionExpiresAt,
  saveSessionId,
  saveToken,
} from "@/utils/secureStorage";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api";

/** Default axios request timeout (ms). Prevents a hanging mutation from
 *  leaving the UI in a stuck disabled state. */
const REQUEST_TIMEOUT_MS = 30000;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: REQUEST_TIMEOUT_MS,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: REQUEST_TIMEOUT_MS,
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

/**
 * Single-flight refresh: concurrent 401s share one refresh request instead of
 * each firing their own. Resolves to the new access token, or null if refresh
 * is impossible (no refresh token / refresh rejected).
 */
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh_token = await getRefreshToken();
  if (!refresh_token) return null;

  try {
    // Use axiosPublic so the refresh call itself isn't intercepted (no loop).
    const { data } = await axiosPublic.post("/auth/refresh", { refresh_token });
    // Server wraps responses as { status_code, message, data: {...} }.
    const payload = data?.data ?? data;
    const access = payload?.access_token as string | undefined;
    const refresh = payload?.refresh_token as string | undefined;
    const sessionId = payload?.session_id as string | undefined;
    const sessionExpiresAt = payload?.session_expires_at as
      | string
      | undefined;

    if (!access) return null;

    // Refresh rotates the refresh token AND the session, so persist all of it —
    // a stale session_id would make logout target a revoked session.
    await saveToken(access);
    if (refresh) await saveRefreshToken(refresh);
    if (sessionId) await saveSessionId(sessionId);
    if (sessionExpiresAt) await saveSessionExpiresAt(String(sessionExpiresAt));
    return access;
  } catch {
    return null;
  }
}

async function handleAuthFailure() {
  await clearAuthStorage();
  router.replace(ROUTES.SIGN_IN as never);
}

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const status = error.response?.status;

    // Non-401, or no config to retry: pass through. A 401 that we've already
    // retried means even the refreshed token was rejected -> log out.
    if (status !== 401 || !original) {
      return Promise.reject(error);
    }
    if (original._retry) {
      await handleAuthFailure();
      return Promise.reject(error);
    }

    original._retry = true;

    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }
    const newToken = await refreshPromise;

    if (!newToken) {
      await handleAuthFailure();
      return Promise.reject(error);
    }

    original.headers.set("Authorization", `Bearer ${newToken}`);
    return axiosPrivate(original);
  }
);

export default axiosPublic;
