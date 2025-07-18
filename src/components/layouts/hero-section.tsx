import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion} from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, ArrowRight } from "lucide-react"

export function HeroSection() {
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

  return (
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
                  className="border-2 border-white text-white hover:bg-white/20 hover:backdrop-blur-sm px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full mobile-full"
                >
                  Lihat Layanan
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-white text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-700 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-full mobile-full"
                >
                  Mulai Perjalanan
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white hover:bg-white/20 hover:backdrop-blur-sm px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full mobile-full"
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
  )
}
