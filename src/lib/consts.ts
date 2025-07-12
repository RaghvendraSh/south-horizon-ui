import { ASSETS } from "./assets";

export const ROUTES = {
  HOME: "/",
  OTP: "/verify-otp",
  THANK_YOU: "/thank-you",
  HOW_TO_REDEEM: "/how-to-redeem",
  TANDC: "/tandc",
  CONTACT_US: "/contact-us",
  CLAIM_CASHBACK: "/claim-cashback",
};

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

// Sample product data - replace with your actual data
export const products: Product[] = [
  {
    id: "1",
    title: "Mountain Peak Tee",
    description: "Comfy X Collection",
    price: "₹899",
    image: ASSETS.HEADER.P1,
    category: "T-Shirt",
  },
  {
    id: "2",
    title: "South Horizon Hoodie",
    description: "Comfy X Collection",
    price: "₹899",
    image: ASSETS.HEADER.P1,
    category: "Hoodie",
  },
  {
    id: "3",
    title: "Adventure Jacket",
    description: "Comfy X Collection",
    price: "₹899",
    image: ASSETS.HEADER.P1,
    category: "Jacket",
  },
  {
    id: "4",
    title: "Classic Joggers",
    description: "Comfy X Collection",
    price: "₹899",
    image: ASSETS.HEADER.P1,
    category: "Bottom",
  },
  {
    id: "5",
    title: "Explorer Shorts",
    description: "Comfy X Collection",
    price: "₹899",
    image: ASSETS.HEADER.P1,
    category: "Short",
  },
];
