import React, { useState } from "react";
import * as yup from "yup";
import "../../../styles/pages/Login.scss";
import { ASSETS } from "../../../lib/assets";

interface LoginProps {
  open: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
  onEmailContinue: (email: string) => void;
}

const emailSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

const Login: React.FC<LoginProps> = ({
  open,
  onClose,
  onGoogleSignIn,
  onEmailContinue,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await emailSchema.validate({ email });
      onEmailContinue(email);
    } catch (err: any) {
      setError(err.message);
    }
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
        <h2 className="login-drawer__title">Sign in</h2>
        <div className="login-drawer__subtitle">
          Choose how you'd like to sign in
        </div>
        <button className="login-drawer__google" onClick={onGoogleSignIn}>
          <img
            src={ASSETS.HEADER.GOOGLE_ICON}
            alt="Google"
            className="login-drawer__google-icon"
          />
          Sign up with Google
        </button>
        <div className="login-drawer__divider">
          <span>Or</span>
        </div>
        <form className="login-drawer__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-drawer__input"
          />
          {error && <div className="login-drawer__error">{error}</div>}
          <button type="submit" className="login-drawer__continue">
            CONTINUE
          </button>
        </form>
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
