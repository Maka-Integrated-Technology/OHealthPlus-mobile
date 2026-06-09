import { useAppRouter } from "@/config/route";
import { useState } from "react";

export default function useAuthModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const router = useAppRouter();

  const handleSkip = () => {
    router.toSignIn();
  };

  const signIn = () => {
    router.toSignIn();
  };

  const createAccount = () => {
    router.toSignUp();
  };

  const handleGoogleSignin = () => {
    console.log("Google signin");
  };

  const handleAppleSignin = () => {
    console.log("Apple signin");
  };

  return {
    modalVisible,
    handleSkip,
    createAccount,
    signIn,
    handleGoogleSignin,
    handleAppleSignin,
    setModalVisible,
  };
}
