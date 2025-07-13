import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toogle"
import { MapPin, User, LogOut, ChevronDown, Home, MapPinIcon, Car, UserCheck, Calendar, Utensils, Info, Menu, X, ShoppingBag, Globe } from "lucide-react"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isDestinationsDropdownOpen, setIsDestinationsDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [language, setLanguage] = useState('ID')
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  // Commented out auto-scroll detection to keep navbar on "Home"
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = ['home', 'destinations', 'services', 'agenda', 'stroll', 'about']
  //     const scrollPosition = window.scrollY + 100

  //     for (const section of sections) {
  //       const element = document.getElementById(section)
  //       if (element) {
  //         const offsetTop = element.offsetTop
  //         const offsetHeight = element.offsetHeight
          
  //         if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
  //           setActiveSection(section)
  //           break
  //         }
  //       }
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isServicesDropdownOpen && !(event.target as Element).closest('.services-dropdown-container')) {
        setIsServicesDropdownOpen(false)
      }
      if (isDestinationsDropdownOpen && !(event.target as Element).closest('.destinations-dropdown-container')) {
        setIsDestinationsDropdownOpen(false)
      }
      if (isProfileDropdownOpen && !(event.target as Element).closest('.profile-dropdown-container')) {
        setIsProfileDropdownOpen(false)
      }
      if (isLanguageDropdownOpen && !(event.target as Element).closest('.language-dropdown-container')) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isServicesDropdownOpen, isDestinationsDropdownOpen, isProfileDropdownOpen, isLanguageDropdownOpen])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const getDropdownState = (itemId: string) => {
    if (itemId === 'services') return isServicesDropdownOpen
    if (itemId === 'destinations') return isDestinationsDropdownOpen
    return false
  }

  const toggleDropdown = (itemId: string) => {
    if (itemId === 'services') {
      setIsServicesDropdownOpen(!isServicesDropdownOpen)
      setIsDestinationsDropdownOpen(false) // Close other dropdown
    } else if (itemId === 'destinations') {
      setIsDestinationsDropdownOpen(!isDestinationsDropdownOpen)
      setIsServicesDropdownOpen(false) // Close other dropdown
    }
  }

  const closeDropdown = (itemId: string) => {
    if (itemId === 'services') setIsServicesDropdownOpen(false)
    if (itemId === 'destinations') setIsDestinationsDropdownOpen(false)
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { 
      id: 'destinations', 
      label: 'Destinasi', 
      icon: MapPinIcon,
      hasDropdown: true,
      dropdownItems: [
        { id: 'info-wisata', label: 'Info Wisata', icon: Info },
        { id: 'tujuan-destinasi', label: 'Tujuan Destinasi', icon: MapPinIcon }
      ]
    },
    { 
      id: 'services', 
      label: 'Layanan', 
      icon: Car,
      hasDropdown: true,
      dropdownItems: [
        { id: 'penginapan', label: 'Penginapan', icon: Home },
        { id: 'driver-rental', label: 'Driver & Rental', icon: Car },
        { id: 'tour-guide', label: 'Tour Guide', icon: UserCheck }
      ]
    },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'stroll', label: 'Stroll & Kuliner', icon: Utensils },
    { id: 'about', label: 'Tentang Kami', icon: Info }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-8xl px-4 py-4">
        <div className="navbar-glass flex items-center justify-between rounded-full px-8 py-5 shadow-lg border border-gray-200 dark:border-gray-700/50 min-h-[70px]">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-emerald-600 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-emerald-600 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-100 transition-colors duration-300">
              JakSabang
            </span>
          </div>
          
          {/* Navigation Menu - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <div className={`relative ${item.id}-dropdown-container`}>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className={`nav-item flex items-center gap-2 ${
                        activeSection === item.id ? 'active' : ''
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        getDropdownState(item.id) ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Modern Dropdown Menu */}
                    <div 
                      className={`dropdown-menu absolute top-full left-0 mt-2 w-64 transition-all duration-300 z-50 ${
                        getDropdownState(item.id) ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <button
                          key={dropdownItem.id}
                          onClick={() => {
                            scrollToSection(dropdownItem.id)
                            closeDropdown(item.id)
                          }}
                          className="dropdown-item flex items-center gap-3 w-full text-left"
                          style={{
                            transitionDelay: `${index * 50}ms`
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
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-item flex items-center gap-2 ${
                      activeSection === item.id ? 'active' : ''
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </nav>
          
          <div className="flex items-center gap-4 md:gap-6 xl:gap-8">
            {/* Language Toggle */}
            <div className="relative language-dropdown-container">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-emerald-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-blue-400 rounded-lg transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{language}</span>
                <span className="text-sm font-medium sm:hidden">{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                  isLanguageDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {/* Language Dropdown */}
              <div className={`dropdown-menu absolute top-full right-0 mt-2 w-32 transition-all duration-300 z-50 ${
                isLanguageDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setLanguage('ID')
                      setIsLanguageDropdownOpen(false)
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                      language === 'ID' ? 'bg-emerald-100 dark:bg-gray-700 text-emerald-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>🇮🇩</span>
                    <span>Indonesia</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('EN')
                      setIsLanguageDropdownOpen(false)
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                      language === 'EN' ? 'bg-emerald-100 dark:bg-gray-700 text-emerald-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700'
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
              className="lg:hidden px-2 py-2 text-emerald-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-blue-400 rounded-lg transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {user ? (
              <>
                <ThemeToggle />
                <div className="relative profile-dropdown-container">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className={`w-4 h-4 text-emerald-600 dark:text-gray-400 transition-transform duration-300 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                
                  {/* Profile Dropdown */}
                  <div className={`dropdown-menu absolute top-full right-0 mt-2 w-56 transition-all duration-300 z-50 ${
                    isProfileDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate('/pesanan')}
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
                <ThemeToggle />
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-all duration-300 hidden sm:flex"
                >
                  Masuk
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  size="sm"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="hidden sm:inline">Daftar</span>
                  <span className="sm:hidden">Daftar</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="navbar-glass rounded-b-3xl px-6 py-4 shadow-lg border-t border-gray-200 dark:border-gray-700/50">
            <nav className="space-y-2">
            {navItems.map((item, index) => (
              <div key={item.id} style={{ transitionDelay: `${index * 50}ms` }}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="flex items-center justify-between w-full px-4 py-3 text-left text-emerald-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-blue-400 rounded-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        getDropdownState(item.id) ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <div className={`ml-4 mt-2 space-y-1 transition-all duration-300 ${
                      getDropdownState(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      {item.dropdownItems?.map((dropdownItem, subIndex) => (
                        <button
                          key={dropdownItem.id}
                          onClick={() => {
                            scrollToSection(dropdownItem.id)
                            setIsMobileMenuOpen(false)
                            closeDropdown(item.id)
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left text-emerald-600/70 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200"
                          style={{
                            transitionDelay: `${subIndex * 30}ms`
                          }}
                        >
                          <dropdownItem.icon className="w-4 h-4" />
                          <span className="font-medium">{dropdownItem.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      scrollToSection(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:text-emerald-700 dark:hover:text-blue-400 rounded-lg transition-all duration-300 ${
                      activeSection === item.id ? 'text-emerald-600 dark:text-blue-400' : 'text-emerald-600/80 dark:text-gray-300'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )}
              </div>
            ))}            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
