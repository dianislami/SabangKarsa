import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
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
                  className="bg-white text-primary hover:bg-white/90 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-700 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-full shadow-lg mobile-full"
                >
                  Mulai Petualangan
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  onClick={() => alert('Fitur partner segera hadir!')}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/20 hover:backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-full mobile-full"
                >
                  Jadi Partner
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-white text-primary hover:bg-white/90 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-700 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-full shadow-lg mobile-full"
                >
                  Daftar Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/20 hover:backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-full mobile-full"
                >
                  Sudah Punya Akun? Masuk
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
