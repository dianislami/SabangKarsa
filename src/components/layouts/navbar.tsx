
import { useState, useEffect, forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toogle";
import {
  User,
  LogOut,
  ChevronDown,
  Home,
  MapPinIcon,
  Car,
  UserCheck,
  Calendar,
  Utensils,
  Info,
  Menu,
  X,
  ShoppingBag,
  Globe,
} from "lucide-react";
import logoNav from "@/assets/JakSabangFIX.svg";

export const Navbar = forwardRef<HTMLElement, { id: string }>((props, ref) => {
  const { id } = props;
  const [user, setUser] = useState<any>(null);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDestinationsDropdownOpen, setIsDestinationsDropdownOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState("ID");
  const navigate = useNavigate();
  const location = useLocation();

  // Set active section based on current route
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveSection("home");
    } else if (
      location.pathname === "/destinations" ||
      location.pathname.startsWith("/destinations/")
    ) {
      setActiveSection("destinations");
    } else if (location.pathname.startsWith("/layanan")) {
      setActiveSection("services");
    } else if (location.pathname === "/agenda") {
      setActiveSection("agenda");
    } else if (location.pathname === "/stroll") {
      setActiveSection("stroll");
    } else if (location.pathname === "/about") {
      setActiveSection("about");
    } else if (
      location.pathname === "/login" ||
      location.pathname === "/register"
    ) {
      setActiveSection("auth");
    } else {
      setActiveSection("other");
    }
  }, [location.pathname]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isServicesDropdownOpen &&
        !(event.target as Element).closest(".services-dropdown-container")
      ) {
        setIsServicesDropdownOpen(false);
      }
      if (
        isDestinationsDropdownOpen &&
        !(event.target as Element).closest(".destinations-dropdown-container")
      ) {
        setIsDestinationsDropdownOpen(false);
      }
      if (
        isProfileDropdownOpen &&
        !(event.target as Element).closest(".profile-dropdown-container")
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        isLanguageDropdownOpen &&
        !(event.target as Element).closest(".language-dropdown-container")
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [
    isServicesDropdownOpen,
    isDestinationsDropdownOpen,
    isProfileDropdownOpen,
    isLanguageDropdownOpen,
  ]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const handleNavigation = (itemId: string) => {
    // Direct navigation for specific routes
    if (itemId === "agenda") {
      navigate("/agenda");
    } else if (itemId === "stroll") {
      navigate("/stroll");
    } else if (itemId === "about") {
      navigate("/about");
    } else if (itemId === "home") {
      navigate("/");
    } else {
      // Scroll to section for other items (if on homepage)
      if (location.pathname !== "/") {
        navigate("/#" + itemId);
      } else {
        const element = document.getElementById(itemId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(itemId);
        }
      }
    }
  };

  const getDropdownState = (itemId: string) => {
    if (itemId === "services") return isServicesDropdownOpen;
    if (itemId === "destinations") return isDestinationsDropdownOpen;
    return false;
  };

  const isItemActive = (itemId: string) => {
    if (itemId === "destinations") {
      return (
        location.pathname === "/destinations" ||
        location.pathname.startsWith("/destinations/") ||
        activeSection === "destinations"
      );
    }
    if (itemId === "home") {
      return (
        location.pathname === "/" &&
        (activeSection === "home" || activeSection === "")
      );
    }
    return activeSection === itemId;
  };

  const toggleDropdown = (itemId: string) => {
    if (itemId === "services") {
      setIsServicesDropdownOpen(!isServicesDropdownOpen);
      setIsDestinationsDropdownOpen(false);
    } else if (itemId === "destinations") {
      setIsDestinationsDropdownOpen(!isDestinationsDropdownOpen);
      setIsServicesDropdownOpen(false);
    }
  };

  const closeDropdown = (itemId: string) => {
    if (itemId === "services") setIsServicesDropdownOpen(false);
    if (itemId === "destinations") setIsDestinationsDropdownOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    {
      id: "destinations",
      label: "Destinasi",
      icon: MapPinIcon,
      hasDropdown: true,
      dropdownItems: [
        { id: "info-wisata", label: "Info Wisata", icon: Info },
        { id: "tujuan-destinasi", label: "Tujuan Destinasi", icon: MapPinIcon },
      ],
    },
    {
      id: "services",
      label: "Layanan",
      icon: Car,
      hasDropdown: true,
      dropdownItems: [
        { id: "penginapan", label: "Penginapan", icon: Home },
        { id: "driver-rental", label: "Driver & Rental", icon: Car },
        { id: "tour-guide", label: "Tour Guide", icon: UserCheck },
      ],
    },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "stroll", label: "Stroll & Kuliner", icon: Utensils },
    { id: "about", label: "Tentang Kami", icon: Info },
  ];

  return (
    <header
      id={id}
      ref={ref}
      className="fixed top-0 left-0 lg:left-40 right-0 lg:right-40 z-50"
    >
      <div className="mx-auto max-w-8xl px-2 sm:px-4 py-1 sm:py-2">
        <div className="navbar-glass flex items-center justify-between rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-gray-200 dark:border-gray-700/50 min-h-[50px] sm:min-h-[55px]">
          <div
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logoNav}
              alt="JakSabang Logo"
              className="w-12 h-12 sm:w-18 sm:h-18 transition-all duration-300 group-hover:scale-105"
            />
          </div>

          {/* Navigation Menu - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <div className={`relative ${item.id}-dropdown-container`}>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className={`nav-item flex items-center gap-1.5 text-sm ${
                        isItemActive(item.id) ? "active" : ""
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${
                          getDropdownState(item.id) ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Modern Dropdown Menu */}
                    <div
                      className={`dropdown-menu absolute top-full left-0 mt-2 w-56 transition-all duration-300 z-50 ${
                        getDropdownState(item.id)
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <button
                          key={dropdownItem.id}
                          onClick={() => {
                            if (dropdownItem.id === "tujuan-destinasi") {
                              navigate("/destinations");
                            } else if (dropdownItem.id === "info-wisata") {
                              navigate("/informations");
                            } else if (dropdownItem.id === "penginapan") {
                              navigate("/layanan/penginapan");
                            } else {
                              handleNavigation(dropdownItem.id);
                            }
                            closeDropdown(item.id);
                          }}
                          className="dropdown-item flex items-center gap-2 w-full text-left text-sm"
                          style={{
                            transitionDelay: `${index * 50}ms`,
                          }}
                        >
                          <dropdownItem.icon className="w-4 h-4" />
                          <span>{dropdownItem.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`nav-item flex items-center gap-1.5 text-sm ${
                      isItemActive(item.id) ? "active" : ""
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Language Toggle */}
            <div className="relative language-dropdown-container">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-emerald-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg transition-all duration-300"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">
                  {language}
                </span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    isLanguageDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Language Dropdown */}
              <div
                className={`dropdown-menu absolute top-full right-0 mt-2 w-32 transition-all duration-300 z-50 ${
                  isLanguageDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setLanguage("ID");
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                      language === "ID"
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-700"
                        : "text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-600"
                    }`}
                  >
                    <span>🇮🇩</span>
                    <span>Indonesia</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("EN");
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                      language === "EN"
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-700"
                        : "text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-600"
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>English</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden px-1.5 py-1.5 text-emerald-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <>
                <div className="hidden sm:block">
                  <ThemeToggle />
                </div>
                <div className="relative profile-dropdown-container">
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all duration-300"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-gray-400 transition-transform duration-300 ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  <div
                    className={`dropdown-menu absolute top-full right-0 mt-2 w-56 transition-all duration-300 z-50 ${
                      isProfileDropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                              {user.role || "User"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate("/pesanan")}
                        className="flex items-center gap-2 w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span className="font-medium">Pesanan Saya</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="hidden sm:block">
                  <ThemeToggle />
                </div>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-all duration-300 hidden md:flex px-3 py-1.5 text-xs sm:text-sm"
                >
                  Masuk
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  size="sm"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 px-3 py-1.5 text-xs sm:text-sm"
                >
                  Daftar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="navbar-glass rounded-b-3xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg border-t border-gray-200 dark:border-gray-700/50">
            {/* Mobile Auth Buttons & Theme Toggle */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Theme
                </span>
              </div>
              {!user && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-all duration-300 px-3 py-1.5 text-xs"
                  >
                    Masuk
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                      setIsMobileMenuOpen(false);
                    }}
                    size="sm"
                    className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 px-3 py-1.5 text-xs"
                  >
                    Daftar
                  </Button>
                </div>
              )}
            </div>
            <nav className="space-y-1">
              {navItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className={`flex items-center justify-between w-full px-3 py-2.5 text-left hover:text-emerald-700 dark:hover:text-blue-400 rounded-lg transition-all duration-300 ${
                          isItemActive(item.id)
                            ? "text-emerald-600 dark:text-blue-400"
                            : "text-emerald-600/80 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            getDropdownState(item.id) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`ml-4 mt-1 space-y-1 transition-all duration-300 ${
                          getDropdownState(item.id)
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        } overflow-hidden`}
                      >
                        {item.dropdownItems?.map((dropdownItem, subIndex) => (
                          <button
                            key={dropdownItem.id}
                            onClick={() => {
                              if (dropdownItem.id === "tujuan-destinasi") {
                                navigate("/destinations");
                              } else if (dropdownItem.id === "info-wisata") {
                                navigate("/informations");
                              } else if (dropdownItem.id === "penginapan") {
                                navigate("/layanan/penginapan");
                              } else {
                                handleNavigation(dropdownItem.id);
                              }
                              setIsMobileMenuOpen(false);
                              closeDropdown(item.id);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 text-left text-emerald-600/70 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200"
                            style={{
                              transitionDelay: `${subIndex * 30}ms`,
                            }}
                          >
                            <dropdownItem.icon className="w-4 h-4" />
                            <span className="font-medium text-sm">
                              {dropdownItem.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleNavigation(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 text-left hover:text-emerald-700 dark:hover:text-blue-400 rounded-lg transition-all duration-300 ${
                        isItemActive(item.id)
                          ? "text-emerald-600 dark:text-blue-400"
                          : "text-emerald-600/80 dark:text-gray-300"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
});
