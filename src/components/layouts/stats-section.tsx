import { motion } from "framer-motion"
import { Users, MapPin, Home, Award } from "lucide-react"

const stats = [
  { icon: Users, number: "10K+", label: "Wisatawan" },
  { icon: MapPin, number: "50+", label: "Destinasi" },
  { icon: Home, number: "100+", label: "Penginapan" },
  { icon: Award, number: "4.9", label: "Rating" }
]

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 px-4 bg-emerald-600 dark:bg-emerald-800 mobile-py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, index) => (
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
  )
}
