import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "../services/authSlice";

export default function Navbar() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍴</span>
            <span className="text-white font-bold text-xl hidden sm:inline">
              RecipeShare
            </span>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              About
            </Link>
            {user && (
              <Link
                to="/create"
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                Create Recipe
              </Link>
            )}
          </div>

          {/* Right side - User Menu & Auth */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none hover:opacity-90 transition-opacity"
                >
                  <img
                    src={
                      user.profilePicture ||
                      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    }
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="text-white text-sm font-medium hidden sm:inline">
                    {user.username}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-xl z-10 overflow-hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors border-b"
                      onClick={() => setDropdownOpen(false)}
                    >
                      👤 Your Profile
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors border-b"
                      onClick={() => setDropdownOpen(false)}
                    >
                      🏠 Home
                    </Link>
                    <Link
                      to="/about"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors border-b"
                      onClick={() => setDropdownOpen(false)}
                    >
                      ℹ️ About
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
                    >
                      🚪 Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex space-x-2">
                <Link
                  to="/login"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-md transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-indigo-700 rounded-lg mt-2 p-2 space-y-2">
            <Link
              to="/"
              className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {user && (
              <Link
                to="/create"
                className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Recipe
              </Link>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
