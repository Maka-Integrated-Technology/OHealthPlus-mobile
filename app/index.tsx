import { ROUTES } from "@/constants/routes";
import { hasToken } from "@/utils/secureStorage";
import { Href, Redirect } from "expo-router";
import { useEffect, useState } from "react";

/**
 * Entry point: checks SecureStore for a saved access token and routes
 * returning users directly to the tabs, new/logged-out users to onboarding.
 * Shows nothing while the async check runs (the splash screen covers the gap).
 */
export default function Index() {
  const [destination, setDestination] = useState<string | null>(null);

  useEffect(() => {
    hasToken().then((authenticated) => {
      setDestination(authenticated ? ROUTES.HOME : ROUTES.ONBOARDING);
    });
  }, []);

  if (!destination) return null;

  return <Redirect href={destination as Href} />;
}
