import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react";
import { MapPin, Home, Car, MessageCircle } from "lucide-react"

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

export function ServicesSection() {
  const [containerInView, setContainerInView] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const bodyElement = document.body;

    const checkInViewState = () => {
      const bodyScrollTop = bodyElement.scrollTop;
      const bodyScrollBottom = bodyScrollTop + window.innerHeight;
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect && (containerRect.y > bodyScrollTop && containerRect.y < bodyScrollBottom))
        setContainerInView(true);
    };

    checkInViewState();

    if (!containerInView) window.addEventListener("scroll", checkInViewState);

    return () => window.removeEventListener("scroll", checkInViewState);
  }, [containerRef, containerInView]);

  return (
    <section ref={containerRef} id="services" className="py-16 md:py-20 px-4 section-gray mobile-py-8">
      {containerInView && (
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
      )}
    </section>
  )
}
