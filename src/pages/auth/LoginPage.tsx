import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toogle"
import { Eye, EyeOff, Mail, Lock, MapPin, Home, Car } from "lucide-react"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted:", formData)
  }

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
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:flex-1 flex-col justify-center px-12 py-16">
          <div 
            className={`transform transition-all duration-1000 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight">
              Selamat Datang di<br />
              <span className="gradient-text-alt">
                JakSabang
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Jelajahi keindahan Sabang dengan layanan terpadu untuk destinasi wisata, penginapan, dan transportasi.
            </p>
            
            {/* Feature Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Destinasi Wisata</h3>
                  <p className="text-sm text-muted-foreground">Temukan tempat wisata terbaik di Sabang</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                <div className="p-2 bg-secondary/10 rounded-full">
                  <Home className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Penginapan</h3>
                  <p className="text-sm text-muted-foreground">Booking hotel dan penginapan terpercaya</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Car className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Driver & Transport</h3>
                  <p className="text-sm text-muted-foreground">Cari driver dan transportasi lokal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-16 lg:px-12">
          <div className="w-full max-w-md">
            <div 
              className={`bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-8 transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-button rounded-full mb-4 shadow-lg">
                  <MapPin className="w-8 h-8 text-button-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Masuk ke JakSabang
                </h2>
                <p className="text-muted-foreground">
                  Masuk untuk melanjutkan perjalanan Anda
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Masukkan email Anda"
                      className="w-full pl-10 pr-3 py-3 bg-input/50 backdrop-blur-sm border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring focus:bg-input transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Masukkan kata sandi"
                      className="w-full pl-10 pr-10 py-3 bg-input/50 backdrop-blur-sm border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring focus:bg-input transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-3 bg-button text-button-foreground hover:bg-button/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg font-semibold"
                >
                  Masuk
                </Button>
              </form>

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Belum punya akun?
                  <button
                    type="button"
                    onClick={() => window.location.href = '/register'}
                    className="ml-1 text-secondary hover:text-secondary/80 transition-colors font-medium"
                  >
                    Daftar di sini
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
