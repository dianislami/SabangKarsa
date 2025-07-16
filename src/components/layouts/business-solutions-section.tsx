import { motion } from "framer-motion"
import { Home, Car, Award } from "lucide-react"

export function BusinessSolutionsSection() {
  return (
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
  )
}
