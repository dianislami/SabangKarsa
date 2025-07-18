
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import data from "../../data/events.json";

interface Event {
  id: number;
  name: string;
  description: string;
  image: string;
  date: string;
  category: string;
    location: string;
}

const eventsData: Event[] = data;

export function AgendaPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar id="navbar" />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/destinasi/pantaiiboih.jpg"
            alt="Informasi Sabang"
            className="w-full h-full object-cover scale-110"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
               Event <span className="text-emerald-400">   dan Agenda</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
                Temukan berbagai informasi menarik tentang acara dan agenda di Sabang. Dari festival budaya hingga acara olahraga, kami menyediakan semua yang Anda butuhkan untuk merencanakan kunjungan Anda.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Daftar Acara
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <motion.div
                key={event.id}
                className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: event.id * 0.1 }}
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/src/assets/destinasi/pantaiiboih.jpg";
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {event.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <Link to={`/agenda/${event.id}`}>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
