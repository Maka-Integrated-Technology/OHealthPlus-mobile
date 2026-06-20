/**
 * Detects and unwraps the backend's TransformInterceptor envelope.
 *
 * Every authenticated response from the NestJS backend is wrapped by
 * TransformInterceptor into:
 *   { status_code: number, message: string | null, data: T | null }
 *
 * This helper detects that shape (requires both `status_code`/`statusCode`
 * AND `data` to avoid false positives on plain data objects) and returns
 * the inner `data` value — including when `data` is `null`, so that the
 * caller's `?? []` / `?? null` fallback fires correctly.
 *
 * If the value is not an envelope (e.g. already unwrapped, or a raw array
 * from a test), it is returned as-is.
 */

interface BackendEnvelope {
  status_code?: number;
  statusCode?: number;
  message?: string | null;
  data: unknown;
}

function isBackendEnvelope(val: unknown): val is BackendEnvelope {
  if (!val || typeof val !== "object" || Array.isArray(val)) return false;
  const obj = val as Record<string, unknown>;
  // Require numeric status code AND a `data` key — this is what
  // TransformInterceptor always produces.
  return (
    ("status_code" in obj || "statusCode" in obj) &&
    "data" in obj
  );
}

export function unwrapApiData<T>(responseData: unknown): T {
  if (isBackendEnvelope(responseData)) {
    // Return the inner data directly — even when null — so caller-side
    // `?? []` / `?? null` fallbacks work correctly.
    return responseData.data as T;
  }
  return responseData as T;
}
