import type { ApiResponse } from "@/features/auth/types/auth";

export function unwrapApiData<T>(payload: T | ApiResponse<T>): T {
  if (
    payload !== null &&
    typeof payload === "object" &&
    "data" in payload &&
    (payload as ApiResponse<T>).data != null
  ) {
    return (payload as ApiResponse<T>).data as T;
  }

  return payload as T;
}
