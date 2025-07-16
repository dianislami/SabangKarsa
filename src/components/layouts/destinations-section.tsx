import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Camera, ArrowRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Pantai Iboih",
    description:
      "Pantai dengan air jernih dan terumbu karang yang indah. Destinasi snorkeling terbaik di Sabang.",
    image: "/src/assets/destinasi/pantaiiboih.jpg",
    rating: 4.8,
    price: "Gratis",
    category: "Pantai",
  },
  {
    id: 2,
    name: "Gua Sarang",
    description:
      "Gua dengan stalaktit dan stalagmit yang menakjubkan. Petualangan di dalam bumi.",
    image: "/src/assets/destinasi/wisataguasarang.jpeg",
    rating: 4.7,
    price: "Rp 10.000",
    category: "Gua",
  },
  {
    id: 3,
    name: "Pantai Sumur Tiga",
    description:
      "Pantai dengan formasi bebatuan unik dan air terjun. Keindahan alam yang eksotis.",
    image: "/src/assets/destinasi/pantaisumurtiga.jpg",
    rating: 4.9,
    price: "Gratis",
    category: "Pantai",
  },
  {
    id: 4,
    name: "Danau Aneuk Laot",
    description:
      "Danau air tawar di tengah pulau dengan pemandangan alam yang memukau.",
    image: "/src/assets/destinasi/wisataguasarang.jpeg",
    rating: 4.6,
    price: "Gratis",
    category: "Danau",
  },
  {
    id: 5,
    name: "Benteng Anoi Itam",
    description:
      "Benteng bersejarah dengan pemandangan laut yang indah dan nilai sejarah tinggi.",
    image: "/src/assets/destinasi/pantaianoiitam.jpeg",
    rating: 4.5,
    price: "Rp 5.000",
    category: "Sejarah",
  },
  {
    id: 6,
    name: "Tugu Kilometer 0",
    description:
      "Monumen titik paling barat Indonesia yang ikonik. Landmark bersejarah Sabang.",
    image: "/src/assets/destinasi/tugu0km.jpg",
    rating: 4.8,
    price: "Gratis",
    category: "Monumen",
  },
];

export function DestinationsSection() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
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
            Jelajahi keindahan alam Sabang yang memukau dengan berbagai
            destinasi wisata terbaik
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className="bg-white dark:bg-emerald-800 border-2 border-gray-200 dark:border-emerald-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => navigate(`/destinations/${destination.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div
                  className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center"
                  style={{ display: "none" }}
                >
                  <Camera className="w-16 h-16 text-muted-foreground" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium text-white">
                    {destination.rating}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-white">
                    {destination.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground dark:text-white">
                  {destination.name}
                </h3>
                <p className="text-muted-foreground dark:text-white/80 mb-4 text-sm">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary dark:text-white">
                    {destination.price}
                  </span>
                  <Button
                    size="sm"
                    className="btn-primary"
                    onClick={() =>
                      user
                        ? alert(`Booking ${destination.name} segera hadir!`)
                        : navigate("/login")
                    }
                  >
                    {user ? "Booking" : "Login untuk Booking"}
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
            onClick={() =>
              user ? navigate("/destinations") : navigate("/login")
            }
            variant="outline"
            className="btn-outline px-6 md:px-8 py-3 text-base md:text-lg"
          >
            {user ? "Jelajahi Semua" : "Lihat Semua Destinasi"}
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
