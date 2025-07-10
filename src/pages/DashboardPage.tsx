import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toogle"
import { MapPin, LogOut, User, Home, Car, MessageCircle } from "lucide-react"

export function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-button border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
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
              <ThemeToggle />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/50">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Selamat Datang, {user.name}!
          </h1>
          <p className="text-muted-foreground mb-4">
            Selamat datang di JakSabang. Mulai jelajahi keindahan Sabang dengan layanan terpadu kami.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-button/10 text-button rounded-full">
              Role: {user.role}
            </span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full">
              Email: {user.email}
            </span>
            {user.no_hp && (
              <span className="px-3 py-1 bg-accent/10 text-accent-foreground rounded-full">
                HP: {user.no_hp}
              </span>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg">
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Destinasi Wisata</h3>
            <p className="text-muted-foreground mb-4">Jelajahi tempat-tempat indah di Sabang</p>
            <Button className="w-full bg-button text-button-foreground hover:bg-button/90">
              Jelajahi Sekarang
            </Button>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg">
            <div className="p-3 bg-secondary/10 rounded-full w-fit mb-4">
              <Home className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Penginapan</h3>
            <p className="text-muted-foreground mb-4">Temukan penginapan terbaik untuk Anda</p>
            <Button className="w-full bg-button text-button-foreground hover:bg-button/90">
              Cari Penginapan
            </Button>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg">
            <div className="p-3 bg-accent/10 rounded-full w-fit mb-4">
              <Car className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Transportasi</h3>
            <p className="text-muted-foreground mb-4">Sewa kendaraan atau cari driver</p>
            <Button className="w-full bg-button text-button-foreground hover:bg-button/90">
              Cari Transport
            </Button>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg md:col-span-2 lg:col-span-3">
            <div className="p-3 bg-button/10 rounded-full w-fit mb-4">
              <MessageCircle className="w-6 h-6 text-button" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">ChatBot AI Assistant</h3>
            <p className="text-muted-foreground mb-4">Dapatkan bantuan dan informasi wisata 24/7 dari AI assistant kami</p>
            <div className="flex gap-4">
              <Button className="bg-button text-button-foreground hover:bg-button/90">
                Mulai Chat
              </Button>
              <Button variant="outline" className="border-button text-button hover:bg-button hover:text-button-foreground">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
          <h2 className="text-2xl font-bold text-foreground mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="border-button text-button hover:bg-button hover:text-button-foreground">
              Profil Saya
            </Button>
            <Button variant="outline" className="border-button text-button hover:bg-button hover:text-button-foreground">
              Riwayat Booking
            </Button>
            <Button variant="outline" className="border-button text-button hover:bg-button hover:text-button-foreground">
              Favorit
            </Button>
            <Button variant="outline" className="border-button text-button hover:bg-button hover:text-button-foreground">
              Bantuan
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
