import * as SecureStore from "expo-secure-store";

const KEYS = {
  ACCESS_TOKEN: "ohealth_access_token",
  REFRESH_TOKEN: "ohealth_refresh_token",
  SESSION_ID: "ohealth_session_id",
  SESSION_EXPIRES_AT: "ohealth_session_expires_at",
  USER: "ohealth_user",
};

// Access token (used by the axios interceptor via getToken/saveToken)
export async function saveToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, token);
}

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
}

export async function deleteToken(): Promise<void> {
  await SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN);
}

export async function hasToken(): Promise<boolean> {
  const token = await getToken();
  return token !== null && token.length > 0;
}

// Refresh token
export async function saveRefreshToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, token);
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
}

// Session
export async function saveSessionId(sessionId: string): Promise<void> {
  await SecureStore.setItemAsync(KEYS.SESSION_ID, sessionId);
}

export async function getSessionId(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.SESSION_ID);
}

export async function saveSessionExpiresAt(expiresAt: string): Promise<void> {
  await SecureStore.setItemAsync(KEYS.SESSION_EXPIRES_AT, expiresAt);
}

export async function getSessionExpiresAt(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.SESSION_EXPIRES_AT);
}

// User
export async function saveUser(user: Record<string, unknown>): Promise<void> {
  await SecureStore.setItemAsync(KEYS.USER, JSON.stringify(user));
}

export async function getUser<T = Record<string, unknown>>(): Promise<T | null> {
  const raw = await SecureStore.getItemAsync(KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getUserId(): Promise<string | null> {
  const user = await getUser<{ id: string }>();
  return user?.id ?? null;
}

// Clear all auth storage
export async function clearAuthStorage(): Promise<void> {
  await Promise.all(
    Object.values(KEYS).map((key) => SecureStore.deleteItemAsync(key))
  );
}
