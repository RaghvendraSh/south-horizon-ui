import React, { useState } from "react";
import * as yup from "yup";
import "../../../styles/pages/Login.scss";
import { ASSETS } from "../../../lib/assets";

interface LoginProps {
  open: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
  onEmailContinue: (email: string) => void;
  onSignUp?: (data: {
    fullName: string;
    email: string;
    password: string;
  }) => void;
  onLogin?: (data: { email: string; password: string }) => void;
}

const signUpSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC<LoginProps> = ({
  open,
  onClose,
  onGoogleSignIn,
  onEmailContinue,
  onSignUp,
  onLogin,
}) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(onEmailContinue, "onEmailContinue");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        await signUpSchema.validate(formData);
        onSignUp?.(formData);
      } else {
        await loginSchema.validate({
          email: formData.email,
          password: formData.password,
        });
        onLogin?.({ email: formData.email, password: formData.password });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setFormData({ fullName: "", email: "", password: "" });
  };

  return (
    <div className={`login-drawer${open ? " open" : ""}`}>
      <button
        className="login-drawer__close"
        onClick={onClose}
        aria-label="Close"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="login-drawer__content">
        <img
          src={ASSETS.HEADER.LOGO}
          alt="South Horizon Logo"
          className="login-drawer__logo"
        />
        <h2 className="login-drawer__title">
          {isSignUp ? "Sign in" : "Login"}
        </h2>
        <div className="login-drawer__subtitle">
          {isSignUp
            ? "Welcome back, Login below to access your account."
            : "Welcome back, Login below to access your account."}
        </div>

        <button className="login-drawer__google" onClick={onGoogleSignIn}>
          <img
            src={ASSETS.HEADER.GOOGLE_ICON}
            alt="Google"
            className="login-drawer__google-icon"
          />
          {isSignUp ? "Sign up with Google" : "Log in with Google"}
        </button>

        <div className="login-drawer__divider">
          <span>Or</span>
        </div>

        <form className="login-drawer__form" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="login-drawer__input"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="login-drawer__input"
          />

          <div className="login-drawer__password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="login-drawer__input"
            />
            <button
              type="button"
              className="login-drawer__password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="login-drawer__options">
            <label className="login-drawer__checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="login-drawer__checkbox-mark"></span>
              Remember me
            </label>
            <a href="/forgot-password" className="login-drawer__forgot">
              Forgot Password?
            </a>
          </div>

          {error && <div className="login-drawer__error">{error}</div>}

          <button type="submit" className="login-drawer__continue">
            {isSignUp ? "SIGN UP" : "SIGN UP"}
          </button>
        </form>

        <div className="login-drawer__toggle">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            className="login-drawer__toggle-btn"
            onClick={toggleMode}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </div>

        <div className="login-drawer__footer">
          <a href="/privacy" className="login-drawer__footer-link">
            Privacy
          </a>
          <a href="/terms" className="login-drawer__footer-link">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
