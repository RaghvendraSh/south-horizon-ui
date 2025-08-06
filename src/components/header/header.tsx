import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

interface User {
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Demo cart data
  const cartProducts: CartProduct[] = [
    {
      id: "1",
      name: "Mens T-Shirt",
      image: ASSETS.HEADER.P1,
      color: "Blue",
      size: "XS",
      price: 699,
      quantity: 1,
    },
    {
      id: "2",
      name: "Mens Summer Shorts",
      image: ASSETS.HEADER.P1,
      color: "Coral",
      size: "XL",
      price: 799,
      quantity: 1,
    },
  ];
  const recommendations: CartProduct[] = [
    {
      id: "3",
      name: "Comfy X Collection",
      image: ASSETS.HEADER.P1,
      color: "White",
      size: "M",
      price: 899,
      quantity: 1,
    },
    {
      id: "4",
      name: "Comfy X Collection",
      image: ASSETS.HEADER.P1,
      color: "Black",
      size: "L",
      price: 899,
      quantity: 1,
    },
  ];
  const subtotal = cartProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  // Dummy handlers
  const handleQuantityChange = (id: string, qty: number) => {
    console.log(`Change quantity of ${id} to ${qty}`);
    // Add logic to update quantity in cart
  };
  const handleRemove = (id: string) => {
    console.log(`Remove item with id: ${id}`);
    // Add logic to remove item from cart
  };
  const handleCheckout = () => {
    console.log("Proceed to checkout");
    // Add logic to handle checkout
  };

  // Auth handlers
  const handleSignUp = (data: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    console.log("Sign up with:", data);
    // Simulate successful signup
    const newUser: User = {
      fullName: data.fullName,
      email: data.email,
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setIsLoginDrawerOpen(false);
    // Add actual signup logic here
  };

  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login with:", data);
    // Simulate successful login
    const user: User = {
      fullName: "John Doe", // This would come from your backend
      email: data.email,
      phone: "+91 9876543210",
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
    setIsLoginDrawerOpen(false);
    // Add actual login logic here
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    console.log("User logged out");
    // Add actual logout logic here
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
        recommendations={recommendations}
        subtotal={subtotal}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />

      {/* Login Drawer */}
      <Login
        open={isLoginDrawerOpen}
        onClose={() => setIsLoginDrawerOpen(false)}
        onGoogleSignIn={() => {
          console.log("Google sign in clicked");
        }}
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
