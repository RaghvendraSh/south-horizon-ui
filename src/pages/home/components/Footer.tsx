import "../../../styles/pages/Footer.scss";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          {/* Newsletter Section */}
          <div className="footer__newsletter">
            <h3 className="footer__newsletter-title">
              Want to be part of our collective?
            </h3>
            <p className="footer__newsletter-description">
              Join our collective to receive first access to exclusive launches,
              seasonal edits, and stories that shape South Horizon. Enjoy 10%
              off on your first order.
            </p>
            <form
              className="footer__newsletter-form"
              onSubmit={handleSubscribe}
            >
              <div className="footer__input-group">
                <input
                  type="email"
                  placeholder="Email address"
                  className="footer__input"
                  required
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="footer__input"
                  required
                />
              </div>
              <button type="submit" className="footer__subscribe-btn">
                SUBSCRIBE
              </button>
            </form>

            {/* Social Media Links */}
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="footer__social-link"
                aria-label="Pinterest"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.962 1.404-5.962s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__column-title">Company</h4>
              <ul className="footer__column-list">
                <li>
                  <a href="#" className="footer__link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Our Mission
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Customer Care</h4>
              <ul className="footer__column-list">
                <li>
                  <a href="#" className="footer__link">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Bulk Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Track Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Help & FAQ's
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Businesses</h4>
              <ul className="footer__column-list">
                <li>
                  <a href="#" className="footer__link">
                    Corporate Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Wholesale Enquiries
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Bulk Purchase
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Retail Partnerships
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Horizon X</h4>
              <ul className="footer__column-list">
                <li>
                  <a href="#" className="footer__link">
                    Horizon Magazine
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Horizon Lab
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Horizon of Hope
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    The Horizon Code
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <p className="footer__copyright">© 2025 South Horizon.</p>
          <div className="footer__language">
            <span className="footer__language-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  d="M2.91663 5.16699L6.41663 8.66699M2.33329 8.66699L5.83329 5.16699L6.99996 3.41699M1.16663 3.41699H8.16663M4.08329 1.66699H4.66663M12.8333 13.3337L9.91663 7.50033L6.99996 13.3337M8.16663 11.0003H11.6666"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span className="footer__language-text">English</span>
            <svg
              className="footer__language-arrow"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="currentColor"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
