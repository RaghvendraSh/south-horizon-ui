import { registerUser, loginUser, phoneLogin, verifyPhoneOtp } from "./auth";
import { healthCheck } from "./health";
import type {
  RegisterUserRequest,
  LoginUserRequest,
  PhoneLoginRequest,
  VerifyPhoneOtpRequest,
  AuthResponse,
} from "../interfaces/auth";
import type { HealthCheckResponse } from "../interfaces/health";

export const Api = {
  auth: {
    registerUser: (data: RegisterUserRequest): Promise<AuthResponse> =>
      registerUser(data),
    loginUser: (data: LoginUserRequest): Promise<AuthResponse> =>
      loginUser(data),
    phoneLogin: (data: PhoneLoginRequest): Promise<void> => phoneLogin(data),
    verifyPhoneOtp: (data: VerifyPhoneOtpRequest): Promise<AuthResponse> =>
      verifyPhoneOtp(data),
  },
  health: {
    healthCheck: (): Promise<HealthCheckResponse> => healthCheck(),
  },
};
