import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toogle"
import { MapPin, Home, Car, MessageCircle, User, LogOut } from "lucide-react"

export function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      console.error('Error parsing user data:', error)
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-button mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-8 h-8 text-button" />
              <span className="text-2xl font-bold gradient-text-alt">JakSabang</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{user.name}</span>
              </div>
              <ThemeToggle />
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Selamat Datang, {user.name}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Siap untuk menjelajahi keindahan Sabang?
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Destinasi Wisata */}
          <div className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 cursor-pointer">
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-4 group-hover:bg-button/10 transition-colors">
              <MapPin className="w-6 h-6 text-primary group-hover:text-button" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Destinasi Wisata</h3>
            <p className="text-muted-foreground">Jelajahi tempat-tempat indah di Sabang</p>
          </div>

          {/* Penginapan */}
          <div className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 cursor-pointer">
            <div className="p-3 bg-secondary/10 rounded-full w-fit mb-4 group-hover:bg-button/10 transition-colors">
              <Home className="w-6 h-6 text-secondary group-hover:text-button" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Penginapan</h3>
            <p className="text-muted-foreground">Booking hotel dan penginapan</p>
          </div>

          {/* Driver & Transport */}
          <div className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 cursor-pointer">
            <div className="p-3 bg-accent/10 rounded-full w-fit mb-4 group-hover:bg-button/10 transition-colors">
              <Car className="w-6 h-6 text-accent-foreground group-hover:text-button" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Driver & Transport</h3>
            <p className="text-muted-foreground">Cari driver dan transportasi</p>
          </div>

          {/* ChatBot AI */}
          <div className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 cursor-pointer">
            <div className="p-3 bg-button/10 rounded-full w-fit mb-4 group-hover:bg-button/20 transition-colors">
              <MessageCircle className="w-6 h-6 text-button" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">ChatBot AI</h3>
            <p className="text-muted-foreground">Bantuan AI 24/7</p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mt-8 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Informasi Akun</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nama</p>
              <p className="text-foreground font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="text-foreground font-medium capitalize">{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">No. HP</p>
              <p className="text-foreground font-medium">{user.no_hp}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
