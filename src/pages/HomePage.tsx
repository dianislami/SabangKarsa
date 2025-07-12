import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toogle"
import { 
  MapPin, 
  Home, 
  Car, 
  MessageCircle, 
  Star, 
  ArrowRight, 
  Users, 
  Camera,
  Award,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Waves,
  ChevronDown,
  Twitter,
  User,
  LogOut
} from "lucide-react"

export function HomePage() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  
  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Data destinasi dengan foto yang sesuai
  const destinations = [
    {
      id: 1,
      name: "Pantai Iboih",
      description: "Pantai dengan air jernih dan terumbu karang yang indah. Destinasi snorkeling terbaik di Sabang.",
      image: "/src/assets/destinasi/pantaiiboih.jpg",
      rating: 4.8,
      price: "Gratis",
      category: "Pantai"
    },
    {
      id: 2,
      name: "Gua Sarang",
      description: "Gua dengan stalaktit dan stalagmit yang menakjubkan. Petualangan di dalam bumi.",
      image: "/src/assets/destinasi/guasarang.jpg",
      rating: 4.7,
      price: "Rp 10.000",
      category: "Gua"
    },
    {
      id: 3,
      name: "Pantai Sumur Tiga",
      description: "Pantai dengan formasi bebatuan unik dan air terjun. Keindahan alam yang eksotis.",
      image: "/src/assets/destinasi/pantaisumurtiga.jpg",
      rating: 4.9,
      price: "Gratis",
      category: "Pantai"
    },
    {
      id: 4,
      name: "Danau Aneuk Laot",
      description: "Danau air tawar di tengah pulau dengan pemandangan alam yang memukau.",
      image: "/src/assets/destinasi/danauaneuklaot.jpg",
      rating: 4.6,
      price: "Gratis",
      category: "Danau"
    },
    {
      id: 5,
      name: "Benteng Anoi Itam",
      description: "Benteng bersejarah dengan pemandangan laut yang indah dan nilai sejarah tinggi.",
      image: "/src/assets/destinasi/bentenganoiitam.jpg",
      rating: 4.5,
      price: "Rp 5.000",
      category: "Sejarah"
    },
    {
      id: 6,
      name: "Tugu Kilometer 0",
      description: "Monumen titik paling barat Indonesia yang ikonik. Landmark bersejarah Sabang.",
      image: "/src/assets/destinasi/tugukm0.jpg",
      rating: 4.8,
      price: "Gratis",
      category: "Monumen"
    }
  ]

  // Services data
  const services = [
    {
      icon: MapPin,
      title: "Destinasi Wisata",
      description: "Temukan tempat-tempat indah di Sabang",
      color: "bg-blue-500"
    },
    {
      icon: Home,
      title: "Penginapan",
      description: "Hotel dan homestay terbaik dengan harga terjangkau",
      color: "bg-green-500"
    },
    {
      icon: Car,
      title: "Transport & Driver",
      description: "Layanan transportasi dan driver berpengalaman",
      color: "bg-yellow-500"
    },
    {
      icon: MessageCircle,
      title: "ChatBot AI",
      description: "Bantuan 24/7 untuk merencanakan perjalanan Anda",
      color: "bg-purple-500"
    }
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Ahmad Rizki",
      role: "Wisatawan Jakarta",
      comment: "Sabang sangat indah! Pantai Iboih benar-benar memukau dengan air yang jernih.",
      rating: 5,
      image: "/images/testimonials/user1.jpg"
    },
    {
      name: "Sarah Putri",
      role: "Travel Blogger",
      comment: "Pelayanan driver sangat ramah dan profesional. Recommended banget!",
      rating: 5,
      image: "/images/testimonials/user2.jpg"
    },
    {
      name: "Budi Santoso",
      role: "Fotografer",
      comment: "Spot-spot foto di Sabang luar biasa. Dari sunrise sampai sunset semuanya cantik.",
      rating: 5,
      image: "/images/testimonials/user3.jpg"
    }
  ]

  // Mouse tracking for parallax effect
  useEffect(() => {
    // Check if user is logged in
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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Fixed Header */}
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

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/src/assets/video/videobg.mp4" type="video/mp4" />
          </video>
          {/* Theme-adaptive overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary/50 dark:from-background/80 dark:to-background/60"></div>
        </div>

        {/* Floating Elements - Hidden on mobile */}
        <div className="absolute inset-0 hidden lg:block">
          <motion.div 
            className="absolute top-20 left-20 text-white/20 dark:text-primary/30"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <MapPin size={40} />
          </motion.div>
          
          <motion.div 
            className="absolute top-32 right-32 text-white/20 dark:text-primary/30"
            animate={{
              y: [0, -30, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <Camera size={48} />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-32 left-32 text-white/20 dark:text-primary/30"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 15, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          >
            <Waves size={44} />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white dark:text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {user ? (
                <>
                  <span className="text-2xl md:text-3xl lg:text-4xl block mb-2">
                    Selamat Datang, {user.name.split(' ')[0]}!
                  </span>
                  <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-white to-white/80 dark:from-primary dark:to-primary/70 bg-clip-text text-transparent">
                    JELAJAHI SABANG
                  </span>
                </>
              ) : (
                <>
                  JELAJAHI KEINDAHAN
                  <br />
                  <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-white to-white/80 dark:from-primary dark:to-primary/70 bg-clip-text text-transparent">
                    SABANG
                  </span>
                </>
              )}
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-white/90 dark:text-foreground/80 mb-8 max-w-2xl mx-auto font-light mobile-px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Platform wisata terpadu untuk menjelajahi destinasi wisata, penginapan, dan transportasi terbaik di ujung barat Indonesia
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mobile-stack"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {user ? (
                <>
                  <Button 
                    onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-full mobile-full"
                  >
                    Mulai Menjelajah
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-2 border-white text-white hover:bg-white hover:text-primary dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-background px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full mobile-full"
                  >
                    Lihat Layanan
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => navigate('/register')}
                    className="btn-primary px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-full mobile-full"
                  >
                    Mulai Perjalanan
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-2 border-white text-white hover:bg-white hover:text-primary dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-background px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full mobile-full"
                  >
                    Lihat Destinasi
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Features Marquee Section */}
      <section className="py-16 bg-emerald-600 dark:bg-emerald-800 overflow-hidden">
        <div className="mb-8">
          <motion.h2 
            className="text-center text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            KENAPA MENGGUNAKAN JAKSABANG?
          </motion.h2>
        </div>
        
        {/* Marquee Animation */}
        <div className="relative">
          <motion.div 
            className="flex gap-8 text-white"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Repeat features for continuous scroll */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-8 whitespace-nowrap">
                <div className="flex items-center gap-4 text-lg font-semibold">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <span>50+ DESTINASI WISATA TERBAIK</span>
                </div>
                
                <div className="flex items-center gap-4 text-lg font-semibold">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Home className="w-8 h-8" />
                  </div>
                  <span>PENGINAPAN TERPERCAYA & NYAMAN</span>
                </div>
                
                <div className="flex items-center gap-4 text-lg font-semibold">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Car className="w-8 h-8" />
                  </div>
                  <span>DRIVER BERPENGALAMAN</span>
                </div>
                
                <div className="flex items-center gap-4 text-lg font-semibold">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <span>CHATBOT AI 24/7</span>
                </div>
                
                <div className="flex items-center gap-4 text-lg font-semibold">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                  <span>10K+ WISATAWAN PUAS</span>
                </div>
                
                <div className="flex items-center gap-4 text-lg font-semibold">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                  <span>RATING 4.9 BINTANG</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-20 px-4 section-gray mobile-py-8">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground mobile-center">
              Layanan Unggulan Kami
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mobile-px-4">
              Dapatkan pengalaman wisata terbaik dengan layanan lengkap dan terpercaya
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="theme-card rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mobile-text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Image Section */}
      <section className="relative h-96 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('/src/assets/destinasi/pantaiiboih.jpg')`,
            y: backgroundY,
            scale: 1.2
          }}
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Keindahan Sabang Menanti Anda
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mobile-px-4">
              Dari pantai eksotis hingga gua yang memukau, setiap sudut Sabang menyimpan keajaiban alam yang luar biasa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 section-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Layanan Unggulan Kami
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nikmati kemudahan berlibur dengan berbagai layanan terpadu yang kami sediakan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="theme-card rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Destinations Section */}
      <section id="destinations" className="py-20 px-4 section-gray">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Destinasi Unggulan Sabang
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Jelajahi keindahan alam Sabang yang memukau dengan berbagai destinasi wisata terbaik
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="bg-white dark:bg-emerald-800 border-2 border-gray-200 dark:border-emerald-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center" style={{ display: 'none' }}>
                    <Camera className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-card/95 rounded-full px-3 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-foreground">{destination.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {destination.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-emerald-100">{destination.name}</h3>
                  <p className="text-gray-600 dark:text-emerald-200 mb-4 text-sm">{destination.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">{destination.price}</span>
                    <Button 
                      size="sm" 
                      className="btn-primary"
                      onClick={() => user ? alert(`Booking ${destination.name} segera hadir!`) : navigate('/login')}
                    >
                      {user ? 'Booking' : 'Login untuk Booking'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={() => user ? alert('Fitur destinasi lengkap segera hadir!') : navigate('/login')}
              variant="outline"
              className="btn-outline px-6 md:px-8 py-3 text-base md:text-lg"
            >
              {user ? 'Jelajahi Semua' : 'Lihat Semua Destinasi'}
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4 bg-emerald-600 dark:bg-emerald-800 mobile-py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { icon: Users, number: "10K+", label: "Wisatawan" },
              { icon: MapPin, number: "50+", label: "Destinasi" },
              { icon: Home, number: "100+", label: "Penginapan" },
              { icon: Award, number: "4.9", label: "Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full mb-4">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-4 section-gray mobile-py-8">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Kata Mereka
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mobile-px-4">
              Pengalaman nyata dari para wisatawan yang telah menjelajahi keindahan Sabang
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-emerald-800 border-2 border-gray-200 dark:border-emerald-700 rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-emerald-100 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-emerald-200">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-emerald-100">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Solutions Section */}
      <section className="py-20 px-4 section-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              SOLUSI BISNIS PARIWISATA KAMI
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Kami menyediakan berbagai solusi untuk mendukung perkembangan industri pariwisata di Sabang
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="theme-card rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">PLATFORM PENGINAPAN</h3>
              <p className="text-muted-foreground">
                Daftarkan penginapan Anda dan jangkau lebih banyak wisatawan dengan platform kami yang mudah digunakan.
              </p>
            </motion.div>
            
            <motion.div
              className="theme-card rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">JARINGAN DRIVER</h3>
              <p className="text-muted-foreground">
                Bergabunglah dengan jaringan driver profesional kami dan dapatkan penghasilan tambahan.
              </p>
            </motion.div>
            
            <motion.div
              className="theme-card rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">SERTIFIKASI WISATA</h3>
              <p className="text-muted-foreground">
                Dapatkan sertifikasi untuk bisnis pariwisata Anda dan tingkatkan kredibilitas di mata wisatawan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Moved before footer */}
      <section className="py-20 px-4 section-emerald">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Siap Menjelajahi Sabang?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan wisatawan yang telah merasakan keindahan Sabang. 
              Mulai perjalanan Anda sekarang juga!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mobile-stack">
              {user ? (
                <>
                  <Button 
                    onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-white text-primary hover:bg-white/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-full shadow-lg mobile-full"
                  >
                    Mulai Petualangan
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    onClick={() => alert('Fitur partner segera hadir!')}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary dark:hover:bg-primary dark:hover:text-white px-8 py-4 text-lg font-semibold rounded-full mobile-full"
                  >
                    Jadi Partner
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => navigate('/register')}
                    className="bg-white text-primary hover:bg-white/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-full shadow-lg mobile-full"
                  >
                    Daftar Sekarang
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/login')}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary dark:hover:bg-primary dark:hover:text-white px-8 py-4 text-lg font-semibold rounded-full mobile-full"
                  >
                    Sudah Punya Akun? Masuk
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground dark:bg-background text-background dark:text-foreground py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-10 h-10 text-primary" />
                <span className="text-3xl font-bold">JakSabang</span>
              </div>
              <p className="text-muted-foreground dark:text-muted-foreground mb-6 leading-relaxed">
                Platform wisata terpadu untuk menjelajahi keindahan Sabang dengan mudah dan nyaman. 
                Temukan destinasi terbaik, penginapan berkualitas, dan layanan transportasi terpercaya.
              </p>
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Instagram className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Facebook className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Twitter className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground dark:text-foreground">Destinasi</h3>
              <ul className="space-y-3 text-muted-foreground dark:text-muted-foreground">
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">Pantai Iboih</a></li>
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">Pulau Rubiah</a></li>
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">Tugu Kilometer Nol</a></li>
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">Pantai Sumur Tiga</a></li>
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">Gua Sarang</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground dark:text-foreground">Layanan</h3>
              <ul className="space-y-3 text-muted-foreground dark:text-muted-foreground">
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">Booking Destinasi</a></li>
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">Reservasi Hotel</a></li>
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">Sewa Kendaraan</a></li>
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">Tour Guide</a></li>
                <li><a href="#" className="hover:text-foreground dark:hover:text-foreground transition-colors">ChatBot AI</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground dark:text-foreground">Kontak</h3>
              <ul className="space-y-3 text-muted-foreground dark:text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span>+62 812 3456 7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>hello@jaksabang.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Sabang, Aceh, Indonesia</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-foreground dark:text-foreground">Download App</h4>
                <div className="flex flex-col gap-2">
                  <motion.div 
                    className="bg-primary px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-primary/80 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-lg">📱</div>
                    <div className="text-primary-foreground">
                      <div className="text-xs">Download on</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-primary px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-primary/80 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-lg">📱</div>
                    <div className="text-primary-foreground">
                      <div className="text-xs">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center mt-8">
            <p className="text-muted-foreground dark:text-muted-foreground">
              ©2025 JakSabang. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
