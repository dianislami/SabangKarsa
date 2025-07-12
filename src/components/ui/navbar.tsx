import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toogle"
import { MapPin, User, LogOut } from "lucide-react"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 navbar-glass shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-full">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              JakSabang
            </span>
          </div>
          
          {/* Navigation Menu - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-navbar-foreground hover:text-primary transition-colors font-medium">
              Beranda
            </a>
            <a href="#destinations" className="text-navbar-foreground hover:text-primary transition-colors font-medium">
              Destinasi
            </a>
            <a href="#services" className="text-navbar-foreground hover:text-primary transition-colors font-medium">
              Layanan
            </a>
            <a href="#contact" className="text-navbar-foreground hover:text-primary transition-colors font-medium">
              Kontak
            </a>
          </nav>
          
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 theme-card px-3 py-2 rounded-full">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-medium text-sm">{user.name}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  size="sm"
                  className="btn-outline hidden sm:flex"
                >
                  Masuk
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  size="sm"
                  className="btn-primary"
                >
                  <span className="hidden sm:inline">Daftar</span>
                  <span className="sm:hidden">Daftar</span>
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
