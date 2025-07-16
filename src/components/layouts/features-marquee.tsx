import { motion } from "framer-motion"
import { MapPin, Home, Car, MessageCircle, Users, Award } from "lucide-react"

export function FeaturesMarquee() {
  return (
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
  )
}
