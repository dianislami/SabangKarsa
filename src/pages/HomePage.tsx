import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toogle"
import { MapPin, Home, Car, MessageCircle, Star, Users, Calendar } from "lucide-react"

export function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    setIsLoaded(true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* Animated Circles */}
          <div 
            className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"
            style={{
              top: '10%',
              left: '10%',
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div 
            className="absolute w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
            style={{
              top: '60%',
              right: '10%',
              transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.1}px)`,
              transition: 'transform 0.3s ease-out',
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-bounce"
            style={{
              top: '30%',
              left: '80%',
              transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
              transition: 'transform 0.3s ease-out',
              animationDelay: '2s'
            }}
          />
          
          {/* Floating Icons */}
          <div className="absolute top-20 left-20 text-primary/20 animate-float">
            <MapPin size={24} />
          </div>
          <div className="absolute top-32 right-32 text-secondary/20 animate-float-delayed">
            <Home size={32} />
          </div>
          <div className="absolute bottom-32 left-32 text-accent/20 animate-float">
            <Car size={28} />
          </div>
          <div className="absolute bottom-20 right-20 text-button/20 animate-float-delayed">
            <MessageCircle size={26} />
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-8 h-8 text-button" />
              <span className="text-2xl font-bold gradient-text-alt">JakSabang</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-button text-button hover:bg-button hover:text-button-foreground"
              >
                Masuk
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-button text-button-foreground hover:bg-button/90"
              >
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="container mx-auto text-center">
            <div 
              className={`transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                Jelajahi Keindahan<br />
                <span className="gradient-text-alt">
                  Sabang
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Platform terpadu untuk menjelajahi destinasi wisata, penginapan, transportasi, dan layanan AI di Sabang
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  onClick={() => navigate('/login')}
                  size="lg"
                  className="bg-button text-button-foreground hover:bg-button/90 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Mulai Petualangan
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  size="lg"
                  variant="outline"
                  className="border-button text-button hover:bg-button hover:text-button-foreground shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Daftar Sekarang
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Layanan Terlengkap untuk Perjalanan Anda
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Temukan semua yang Anda butuhkan untuk perjalanan sempurna di Sabang
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Destinasi Wisata */}
              <div className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-4 group-hover:bg-button/10 transition-colors">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-button" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Destinasi Wisata</h3>
                <p className="text-muted-foreground">Temukan tempat-tempat indah dan menarik di Sabang dengan rekomendasi terbaik</p>
              </div>

              {/* Penginapan */}
              <div className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                <div className="p-3 bg-secondary/10 rounded-full w-fit mb-4 group-hover:bg-button/10 transition-colors">
                  <Home className="w-6 h-6 text-secondary group-hover:text-button" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Penginapan</h3>
                <p className="text-muted-foreground">Booking hotel dan penginapan terpercaya dengan harga terbaik</p>
              </div>

              {/* Driver & Transport */}
              <div className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                <div className="p-3 bg-accent/10 rounded-full w-fit mb-4 group-hover:bg-button/10 transition-colors">
                  <Car className="w-6 h-6 text-accent-foreground group-hover:text-button" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Driver & Transport</h3>
                <p className="text-muted-foreground">Cari driver dan transportasi lokal yang aman dan terpercaya</p>
              </div>

              {/* ChatBot AI */}
              <div className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-button/50 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
                <div className="p-3 bg-button/10 rounded-full w-fit mb-4 group-hover:bg-button/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-button" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">ChatBot AI</h3>
                <p className="text-muted-foreground">Asisten AI 24/7 untuk membantu perjalanan dan informasi wisata</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-button/10 transition-colors">
                  <Star className="w-8 h-8 text-primary group-hover:text-button" />
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-2">100+</h3>
                <p className="text-muted-foreground">Destinasi Wisata</p>
              </div>
              <div className="group">
                <div className="p-4 bg-secondary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-button/10 transition-colors">
                  <Users className="w-8 h-8 text-secondary group-hover:text-button" />
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-2">50+</h3>
                <p className="text-muted-foreground">Penginapan Partner</p>
              </div>
              <div className="group">
                <div className="p-4 bg-accent/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-button/10 transition-colors">
                  <Calendar className="w-8 h-8 text-accent-foreground group-hover:text-button" />
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-2">24/7</h3>
                <p className="text-muted-foreground">Layanan Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Siap Memulai Petualangan Anda?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Bergabunglah dengan ribuan wisatawan yang telah merasakan kemudahan menjelajahi Sabang
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/register')}
                  size="lg"
                  className="bg-button text-button-foreground hover:bg-button/90 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Daftar Gratis Sekarang
                </Button>
                <Button 
                  onClick={() => navigate('/login')}
                  size="lg"
                  variant="outline"
                  className="border-button text-button hover:bg-button hover:text-button-foreground shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Sudah Punya Akun? Masuk
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-card/80 backdrop-blur-xl border-t border-border/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <MapPin className="w-6 h-6 text-button" />
              <span className="text-xl font-bold gradient-text-alt">JakSabang</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2025 JakSabang. Platform wisata terpadu untuk menjelajahi Sabang.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
