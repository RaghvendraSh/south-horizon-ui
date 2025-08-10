import { useState, useCallback } from "react";
import { showToast } from "../../utils/toastService";
import "./RazorpayPayment.scss";

interface RazorpayInstance {
  open(): void;
  on(event: string, callback: (response: unknown) => void): void;
}

interface RazorpayClass {
  new (options: RazorpayOptions): RazorpayInstance;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface PaymentError {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
}

interface PaymentData {
  amount: number;
  orderId: string;
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  description?: string;
  onSuccess?: (response: RazorpayResponse) => void;
  onCancel?: () => void;
  onError?: (error: PaymentError | Error) => void;
}

interface RazorpayPaymentProps {
  children: (
    initiatePayment: (data: PaymentData) => Promise<void>
  ) => React.ReactNode;
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const loadRazorpayScript = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if Razorpay is already loaded
      if ((window as Window & { Razorpay?: RazorpayClass }).Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Razorpay script"));

      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(
    async (data: PaymentData) => {
      try {
        setIsLoading(true);

        // Load Razorpay script
        await loadRazorpayScript();

        const options: RazorpayOptions = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.amount * 100, // Convert to paise
          currency: "INR",
          name: "South Horizon",
          description: data.description || "Order Payment",
          order_id: data.orderId,
          handler: function (response: RazorpayResponse) {
            console.log("Payment successful:", response);
            showToast("Payment completed successfully!", "success");

            if (data.onSuccess) {
              data.onSuccess(response);
            }
          },
          prefill: {
            name: data.customerInfo?.name || "",
            email: data.customerInfo?.email || "",
            contact: data.customerInfo?.phone || "",
          },
          theme: {
            color: "#000000",
          },
          modal: {
            ondismiss: function () {
              console.log("Payment cancelled by user");
              showToast("Payment cancelled", "error");

              if (data.onCancel) {
                data.onCancel();
              }
            },
          },
        };

        const rzp = new (
          window as unknown as Window & { Razorpay: RazorpayClass }
        ).Razorpay(options);

        // Handle payment errors
        rzp.on("payment.failed", function (response: unknown) {
          const errorResponse = response as PaymentError;
          console.error("Payment failed:", errorResponse);
          showToast("Payment failed. Please try again.", "error");

          if (data.onError) {
            data.onError(errorResponse);
          }
        });

        rzp.open();
      } catch (error) {
        console.error("Error initiating payment:", error);
        showToast("Failed to initiate payment. Please try again.", "error");

        if (data.onError) {
          data.onError(error as Error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [loadRazorpayScript]
  );

  return (
    <>
      {children(initiatePayment)}
      {isLoading && (
        <div className="razorpay-loading">
          <div className="razorpay-loading__spinner">
            <div className="spinner"></div>
            <p>Loading payment gateway...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default RazorpayPayment;
export type { PaymentData, RazorpayResponse };
