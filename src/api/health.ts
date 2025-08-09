import { unauthorizedApiCall } from "./apiClient";

// Health Check
export const healthCheck = () => {
  return unauthorizedApiCall("/health", undefined, "GET", {
    success: "API is healthy!",
    error: "API health check failed.",
  });
};
