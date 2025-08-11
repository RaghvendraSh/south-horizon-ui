import { ASSETS } from "./assets";

export const ROUTES = {
  HOME: "/",
  CHECKOUT: "/checkout",
  MEN: "/men",
  WOMEN: "/women",
  KIDS: "/kids",
  HORIZON_X: "/horizon-x",
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

export const FEATURES_DATA = [
  {
    title: "High Quality",
    description: "Crafted with care",
    icon: ASSETS.FOOTER.HIGH_QUALITY_ICON,
  },
  {
    title: "Warranty Protection",
    description: "Over 2 years",
    icon: ASSETS.FOOTER.WARRANTY_PROTECTION_ICON,
  },
  {
    title: "Free Shipping",
    description: "Orders above ₹1000",
    icon: ASSETS.FOOTER.FREE_SHIPPING_ICON,
  },

  {
    title: "24/7 Support",
    description: "Dedicated support",
    icon: ASSETS.FOOTER.SUPPORT_ICON,
  },
];
