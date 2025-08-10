import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginUser,
  googleOAuth,
  getCart,
  updateCartItem,
  removeFromCart,
  getProductById,
} from "../../api";
import type {
  RegisterUserRequest,
  LoginUserRequest,
  AuthResponse,
} from "../../interfaces/auth";
import { showToast } from "../../utils/toastService";
import {
  setAuthToken,
  clearAuth,
  getAuthToken,
  getIsAuthenticated,
} from "../../store/slices/authSlice";
import {
  setUserDetails,
  clearUserDetails,
  getUserDetails,
} from "../../store/slices/userSlice";
import "./header.scss";
import { ASSETS } from "../../lib/assets";
import SearchProduct from "../searchProduct/SearchProduct";
import CartItem, { type CartProduct } from "../cartItem/CartItem";
import Login from "../../pages/home/components/Login";
import UserProfile from "../UserProfile/UserProfile";

interface NavItem {
  title: string;
  route: string;
}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const authToken = useSelector(getAuthToken);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserDetails);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Cart state
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartTotals, setCartTotals] = useState({
    total: 0,
    discount: 0,
    finalTotal: 0,
  });

  useEffect(() => {
    // If there's an auth token in Redux store, user is authenticated
    if (authToken) {
      // You could validate the token with your backend here
      // For now, we'll just set authenticated state based on token presence
      // The Redux store already tracks isAuthenticated
      // You might want to fetch user data from the token or from a separate API call
    }
  }, [authToken]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        document.body.classList.remove("menu-open");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  };

  const handleRouteNavigation = (item: NavItem) => {
    setActiveNavItem(item.title);
    setIsMobileMenuOpen(false);
    navigate(item.route);
  };

  const navItems = [
    { title: "Men", route: "/men" },
    { title: "Women", route: "/women" },
    { title: "Kids", route: "/kids" },
    { title: "Horizon X", route: "/horizon-x" },
  ];

  // Fetch cart data from API
  const fetchCartData = useCallback(async () => {
    if (!isAuthenticated) {
      console.log("User not authenticated, clearing cart");
      setCartProducts([]);
      setCartTotals({ total: 0, discount: 0, finalTotal: 0 });
      return;
    }

    try {
      setCartLoading(true);
      console.log("Fetching cart data...");
      const cartData = await getCart();
      console.log("Cart data received:", cartData);
      console.log("Cart items structure:", cartData.items);
      console.log("First cart item:", cartData.items[0]); // Debug first item structure

      // Transform API cart data to match CartProduct interface
      // Fetch product details for each cart item
      const transformedProducts: CartProduct[] = await Promise.all(
        cartData.items.map(async (item) => {
          console.log("Processing cart item:", item); // Debug individual items
          try {
            const productDetails = await getProductById(item.productId);
            console.log(
              "Product details for",
              item.productId,
              ":",
              productDetails
            ); // Debug product details

            // Determine price with fallback logic
            let itemPrice = 0;
            if (typeof item.price === "number" && item.price > 0) {
              itemPrice = item.price;
            } else if (typeof item.total === "number" && item.total > 0) {
              itemPrice = item.total;
            } else if (
              typeof productDetails.price === "number" &&
              productDetails.price > 0
            ) {
              itemPrice = productDetails.price;
            }

            console.log(
              "Determined price:",
              itemPrice,
              "from item.price:",
              item.price,
              "item.total:",
              item.total,
              "product.price:",
              productDetails.price
            );

            const transformedItem = {
              id: item.id,
              name: productDetails.name,
              image: productDetails.images[0] || ASSETS.HEADER.P1,
              color: productDetails.color[0] || "N/A",
              size: productDetails.size[0] || "N/A",
              price: itemPrice,
              quantity: item.quantity,
            };

            console.log("Transformed item:", transformedItem);
            return transformedItem;
          } catch (error) {
            console.error(
              `Failed to fetch product details for ${item.productId}:`,
              error
            );
            let fallbackPrice = 0;
            if (typeof item.price === "number" && item.price > 0) {
              fallbackPrice = item.price;
            } else if (typeof item.total === "number" && item.total > 0) {
              fallbackPrice = item.total;
            }

            console.log(
              "Fallback price:",
              fallbackPrice,
              "from item.price:",
              item.price,
              "item.total:",
              item.total
            );

            const fallbackItem = {
              id: item.id,
              name: `Product ${item.productId}`,
              image: ASSETS.HEADER.P1,
              color: "N/A",
              size: "N/A",
              price: fallbackPrice,
              quantity: item.quantity,
            };
            return fallbackItem;
          }
        })
      );

      console.log("Transformed cart products:", transformedProducts);
      setCartProducts(transformedProducts);

      // Store cart totals from API response
      setCartTotals({
        total: cartData.total,
        discount: cartData.discount,
        finalTotal: cartData.finalTotal,
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      showToast("Failed to load cart", "error");
      setCartProducts([]); // Clear cart on error
      setCartTotals({ total: 0, discount: 0, finalTotal: 0 });
    } finally {
      setCartLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch cart data when user authentication status changes
  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  // Listen for cart updates from other components (like ProductCard)
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartData();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [fetchCartData]);

  // Cart handlers - Updated to use real API calls
  const handleQuantityChange = async (id: string, qty: number) => {
    if (qty <= 0) return;
    console.log("Attempting to update cart item:", { id, qty });
    try {
      await updateCartItem(id, { quantity: qty });
      showToast("Cart updated successfully", "success");
      // Refresh cart data to ensure consistency
      await fetchCartData();
    } catch (error) {
      console.error("Failed to update cart:", error);
      showToast("Failed to update cart", "error");
      // Refresh cart data even on error to sync with server state
      await fetchCartData();
    }
  };

  const handleRemove = async (id: string) => {
    console.log("Attempting to remove cart item with ID:", id);
    try {
      await removeFromCart(id);
      console.log("Successfully removed item from cart");
      showToast("Item removed from cart", "success");
      // Refresh cart data to ensure consistency
      await fetchCartData();
    } catch (error) {
      console.error("Failed to remove item:", error);
      showToast("Failed to remove item", "error");
      // Refresh cart data even on error to sync with server state
      await fetchCartData();
    }
  };

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    if (!isAuthenticated) {
      showToast("Please login to proceed with checkout", "error");
      setIsLoginDrawerOpen(true);
      setIsCartDrawerOpen(false);
      return;
    }

    // Close cart drawer and navigate to checkout page
    setIsCartDrawerOpen(false);
    navigate("/checkout");
  };

  // Auth handlers
  const handleSignUp = async (data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    try {
      const registerData: RegisterUserRequest = {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

      const response: AuthResponse = await registerUser(registerData);

      // Handle successful registration
      const userData = {
        name: response.user.name,
        email: response.user.email,
        mobile: data.phone,
        fullName: response.user.name,
        phone: data.phone,
        avatar: "",
      };

      dispatch(setUserDetails(userData));
      dispatch(setAuthToken(response.token));
      setIsLoginDrawerOpen(false);
      showToast("Account created successfully!", "success");
    } catch (error) {
      console.error("Signup failed:", error);
      showToast("Signup failed. Please try again.", "error");
    }
  };

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const loginData: LoginUserRequest = {
        email: data.email,
        password: data.password,
      };

      const response: AuthResponse = await loginUser(loginData);

      // Handle successful login
      const userData = {
        name: response.user.name,
        email: response.user.email,
        mobile: response.user.phone,
        fullName: response.user.name,
        phone: response.user.phone,
        avatar: "",
      };

      dispatch(setUserDetails(userData));
      dispatch(setAuthToken(response.token));
      setIsLoginDrawerOpen(false);
      showToast("Login successful!", "success");
    } catch (error) {
      console.error("Login failed:", error);
      showToast("Login failed. Please check your credentials.", "error");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleOAuth();
      showToast("Google sign-in initiated", "success");
      // Note: Google OAuth typically involves redirects or popup windows
      // The actual user data would be handled by the OAuth callback
    } catch (error) {
      console.error("Google sign-in failed:", error);
      showToast("Google sign-in failed. Please try again.", "error");
    }
  };

  const handleLogout = () => {
    dispatch(clearUserDetails());
    dispatch(clearAuth());
    setIsProfileOpen(false);
    showToast("Logged out successfully", "success");
    console.log("User logged out");
  };

  const handleUserButtonClick = () => {
    if (isAuthenticated && currentUser) {
      setIsProfileOpen(true);
    } else {
      setIsLoginDrawerOpen(true);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          {/* Mobile Menu Toggle - Left */}
          <button
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Desktop Navigation - Left */}
          <nav
            className={`header__nav ${
              isMobileMenuOpen ? "header__nav--open" : ""
            }`}
          >
            <ul className="header__nav-list">
              {navItems.map((item) => (
                <li key={item.title} className="header__nav-item">
                  <button
                    type="button"
                    className={`header__nav-link ${
                      activeNavItem === item.title
                        ? "header__nav-link--active"
                        : ""
                    }`}
                    data-text={item.title}
                    onClick={() => handleRouteNavigation(item)}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logo - Center */}
          <a href="/" className="header__logo">
            <img
              src={ASSETS.HEADER.LOGO}
              alt="South Horizon Logo"
              className="header__logo-image"
            />
          </a>

          {/* Actions - Right */}
          <div className="header__actions">
            {/* Search */}
            <div className="header__search">
              <button
                className="header__search-button"
                aria-label="Search"
                onClick={() => setIsSearchDrawerOpen(true)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* User Account */}
            <div className="header__user">
              <button
                className="header__user-button"
                aria-label="User account"
                onClick={handleUserButtonClick}
              >
                {isAuthenticated && currentUser ? (
                  <div className="header__user-avatar">
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.fullName}
                      />
                    ) : (
                      <span className="header__user-initial">
                        {currentUser.fullName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Shopping Cart */}
            <div className="header__cart">
              <button
                className="header__cart-button"
                aria-label="Shopping cart"
                onClick={() => setIsCartDrawerOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1005_2995)">
                    <path
                      d="M15.1875 5.0625H2.8125C2.50184 5.0625 2.25 5.31434 2.25 5.625V14.0625C2.25 14.3732 2.50184 14.625 2.8125 14.625H15.1875C15.4982 14.625 15.75 14.3732 15.75 14.0625V5.625C15.75 5.31434 15.4982 5.0625 15.1875 5.0625Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.1875 5.0625V4.5C6.1875 3.75408 6.48382 3.03871 7.01126 2.51126C7.53871 1.98382 8.25408 1.6875 9 1.6875C9.74592 1.6875 10.4613 1.98382 10.9887 2.51126C11.5162 3.03871 11.8125 3.75408 11.8125 4.5V5.0625"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1005_2995">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="header__cart-count">
                  {cartProducts.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`header__overlay ${
          isMobileMenuOpen ? "header__overlay--visible" : ""
        }`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          document.body.classList.remove("menu-open");
        }}
      />

      <SearchProduct
        open={isSearchDrawerOpen}
        onClose={() => setIsSearchDrawerOpen(false)}
      />

      <CartItem
        open={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        products={cartProducts}
        // recommendations={recommendations}
        subtotal={cartTotals.finalTotal}
        loading={cartLoading}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />

      {/* Login Drawer */}
      <Login
        open={isLoginDrawerOpen}
        onClose={() => setIsLoginDrawerOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onEmailContinue={(email) => {
          console.log("Continue with email:", email);
        }}
        onSignUp={handleSignUp}
        onLogin={handleLogin}
      />

      {/* User Profile */}
      {isAuthenticated && currentUser && (
        <UserProfile
          open={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Header;
