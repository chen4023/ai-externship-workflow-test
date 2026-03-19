import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Gender = "male" | "female" | null;

const PHONE_PREFIX = "010" as const;

export function useSignupForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<Gender>(null);
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordValid = password.length >= 8 && password.length <= 15;
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  const isFormValid =
    name.trim().length > 0 &&
    nickname.trim().length > 0 &&
    birthdate.trim().length === 8 &&
    gender !== null &&
    email.trim().length > 0 &&
    passwordValid &&
    passwordsMatch;

  const getPasswordState = () => {
    if (password.length === 0) return "default" as const;
    return passwordValid ? "success" as const : "danger" as const;
  };

  const getConfirmPasswordState = () => {
    if (confirmPassword.length === 0) return "default" as const;
    return passwordsMatch ? "success" as const : "danger" as const;
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    navigate("/login");
  };

  return {
    PHONE_PREFIX,
    name, setName,
    nickname, setNickname,
    birthdate, setBirthdate,
    gender, setGender,
    email, setEmail,
    emailCode, setEmailCode,
    phone2, setPhone2,
    phone3, setPhone3,
    phoneCode, setPhoneCode,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    passwordValid,
    passwordsMatch,
    isFormValid,
    getPasswordState,
    getConfirmPasswordState,
    handleSubmit,
  };
}
