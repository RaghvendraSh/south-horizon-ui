export interface RegisterUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface PhoneLoginRequest {
  phone: string;
}

export interface VerifyPhoneOtpRequest {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}
