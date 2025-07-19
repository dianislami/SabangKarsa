import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxImageSection() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  return (
    <section className="relative h-96 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url('/assets/destinasi/pantaiiboih.jpg')`,
          y: backgroundY,
          scale: 1.4
          
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
  )
}
