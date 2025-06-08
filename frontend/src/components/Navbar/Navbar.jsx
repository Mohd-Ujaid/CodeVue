import React, {useState} from "react";
import {
  User,
  Code,
  LogOut,
  Menu,
  X,
  BookOpen,
  UserCircle,
  PlusCircle,
  Filter,
} from "lucide-react";
import {Link} from "react-router-dom";
import {useAuthStore} from "../../stores/useAuthStore.js";
import Button from "../ui/Button.jsx";
import ThemeToggle from "../ui/ThemeToggler.jsx";
import LogoutButton from "../LogoutButton.jsx";

const Navbar = () => {
  const {authUser} = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full shadow-xl bg-opacity-90 backdrop-blur-lg animate-fade-in-down">
      <div className="w-full">
        <div className="flex w-full justify-between items-center bg-[var(--primary)]/10 backdrop-blur-lg border-b border-[var(--border)] p-4 shadow-md">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="h-10 w-10 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white border-none p-2 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg navbar-bounce navbar-glow">
              <span className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text ">
                CV
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-extrabold tracking-tight text-[var(--foreground)] hidden md:block">
                CodeVue
              </span>
              <span className="text-xs text-[var(--muted-foreground)] hidden md:block">
                Master Your Coding Skills
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[var(--foreground)] focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/problems">
              <Button
                variant="ghost"
                className="flex items-center gap-2 navbar-link-anim"
                icon={<BookOpen className="w-4 h-4" />}
              >
                Problems
              </Button>
            </Link>

            {authUser ? (
              <>
                <Link to="/playlists">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 navbar-link-anim"
                    icon={<UserCircle className="w-4 h-4" />}
                  >
                    playlists
                  </Button>
                </Link>
                {authUser.role === "ADMIN" && (
                  <>
                    <Link to="/add-problem">
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 navbar-link-anim"
                        icon={<PlusCircle className="w-4 h-4" />}
                      >
                        Add Problem
                      </Button>
                    </Link>
                  </>
                )}
                <ThemeToggle />
                {/* User Profile and Dropdown */}
                <div className="relative ml-2">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 focus:outline-none bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 transition-colors rounded-full py-1 pl-1 pr-3 shadow-md navbar-glow"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--primary)]/50">
                      <img
                        src={
                          authUser?.image ||
                          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        }
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {authUser?.name}
                      </span>
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl py-1 z-20 overflow-hidden animate-fade-in-up">
                      <div className="px-4 py-3 text-lg text-[var(--foreground)] border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 -mt-1">
                        <p className="font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                          {authUser?.name}
                        </p>
                        <p className="text-xs mt-1 truncate">
                          {authUser?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-[var(--foreground)] navbar-link-anim"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          My Profile
                        </div>
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-[var(--foreground)] navbar-link-anim"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Dashboard
                        </div>
                      </Link>
                      {authUser?.role === "ADMIN" && (
                        <>
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-[var(--foreground)] navbar-link-anim"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <div className="flex items-center gap-2">
                              <Code className="w-4 h-4" />
                              Admin Dashboard
                            </div>
                          </Link>
                          <Link
                            to="/add-problem"
                            className="block px-4 py-2 text-sm text-[var(--foreground)] navbar-link-anim"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <div className="flex items-center gap-2">
                              <PlusCircle className="w-4 h-4" />
                              Add Problem
                            </div>
                          </Link>
                        </>
                      )}
                      <LogoutButton
                        className="w-full flex items-center gap-2 text-sm text-[var(--foreground)] hover:text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-all px-4 pt-2 pb-3 rounded-md  -mb-2"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          document
                            .querySelector("[data-logout-button]")
                            ?.click();
                        }}
                        type="button"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </LogoutButton>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Link to="/login">
                  <Button
                    variant="gradient"
                    className="px-6 py-2 rounded-lg font-semibold shadow-md navbar-link-anim"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="outline"
                    className="px-6 py-2 rounded-lg font-semibold shadow-md navbar-link-anim border-[var(--primary)] text-[var(--primary)]"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="w-full mt-2 animate-fade-in-down">
          <div className="md:hidden bg-[var(--card)] shadow-xl border border-[var(--border)] p-4 overflow-hidden rounded-xl animate-fade-in-up">
            <div className="flex flex-col space-y-3">
              <Link
                to="/problems"
                className="flex items-center gap-2 text-[var(--foreground)] navbar-link-anim p-2 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                Problems
              </Link>
              <Link
                to="/filter-problems"
                className="flex items-center gap-2 text-[var(--foreground)] navbar-link-anim p-2 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Filter className="w-5 h-5" />
                Filter Problems
              </Link>
              {authUser ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-[var(--foreground)] navbar-link-anim p-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserCircle className="w-5 h-5" />
                    My Profile
                  </Link>
                  {authUser.role === "ADMIN" && (
                    <>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 text-[var(--foreground)] navbar-link-anim p-2 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Code className="w-5 h-5" />
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/add-problem"
                        className="flex items-center gap-2 text-[var(--foreground)] navbar-link-anim p-2 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <PlusCircle className="w-5 h-5" />
                        Add Problem
                      </Link>
                    </>
                  )}
                  <div
                    className="flex items-center gap-2 text-[var(--foreground)] p-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ThemeToggle />
                  </div>
                  <button
                    className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-all p-2 w-full rounded-lg navbar-link-anim"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.querySelector("[data-logout-button]")?.click();
                    }}
                    type="button"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-[var(--primary)] font-semibold navbar-link-anim"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 text-[var(--primary)] font-semibold navbar-link-anim"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ThemeToggle />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
