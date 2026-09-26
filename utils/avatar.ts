export function getInitials(
  firstName?: string | null,
  lastName?: string | null,
): string {
  const first = firstName?.trim()?.[0] ?? "";
  const last = lastName?.trim()?.[0] ?? "";
  return `${first}${last}`.toUpperCase() || "?";
}

/** Gets up to 2 initials from a full name string (e.g. "John Doe" -> "JD"). */
export function getNameInitials(fullName?: string | null): string {
  if (!fullName?.trim()) return "?";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase() || "?";
}
