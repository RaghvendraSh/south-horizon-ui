import { unauthorizedApiCall } from "./apiClient";
import type { AuthResponse } from "../interfaces/auth";

// User Registration
export const registerUser = (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  return unauthorizedApiCall("/api/auth/register", data, "POST", {
    success: "Registration successful!",
    error: "Failed to register. Please try again.",
  });
};

// User Login
export const loginUser = (data: { email: string; password: string }) => {
  return unauthorizedApiCall("/api/auth/login", data, "POST", {
    success: "Login successful!",
    error: "Invalid email or password.",
  });
};

// Phone Login
export const phoneLogin = (data: { phone: string }) => {
  return unauthorizedApiCall("/api/auth/phone-login", data, "POST", {
    success: "OTP sent to your phone!",
    error: "Failed to send OTP. Please try again.",
  });
};

// Verify Phone OTP
export const verifyPhoneOtp = (data: { phone: string; otp: string }) => {
  return unauthorizedApiCall("/api/auth/verify-otp", data, "POST", {
    success: "Phone verified successfully!",
    error: "Invalid OTP. Please try again.",
  });
};

// Google OAuth
export const googleOAuth = (credential: string): Promise<AuthResponse> => {
  return unauthorizedApiCall("/api/auth/google", { credential }, "POST", {
    success: "Google login successful!",
    error: "Failed to authenticate with Google.",
  });
};

// Send Phone OTP
export const sendPhoneOtp = (data: { phone: string }): Promise<void> => {
  return unauthorizedApiCall("/api/auth/send-phone-otp", data, "POST", {
    success: "OTP sent successfully!",
    error: "Failed to send OTP. Please try again.",
  });
};

// Verify Phone
export const verifyPhone = (data: {
  phone: string;
  otp: string;
}): Promise<void> => {
  return unauthorizedApiCall("/api/auth/verify-phone", data, "POST", {
    success: "Phone verified successfully!",
    error: "Invalid OTP. Please try again.",
  });
};

// Verify Email
export const verifyEmail = (token: string): Promise<void> => {
  return unauthorizedApiCall(
    `/api/auth/verify-email?token=${token}`,
    undefined,
    "GET",
    {
      success: "Email verified successfully!",
      error: "Invalid or expired token.",
    }
  );
};
