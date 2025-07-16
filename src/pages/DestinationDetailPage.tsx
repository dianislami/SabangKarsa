import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, MapPin, Clock, Users, Camera } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const destinationsData = [
  {
    id: 1,
    name: "Pantai Iboih",
    description:
      "Pantai dengan air jernih dan terumbu karang yang indah. Destinasi snorkeling terbaik di Sabang dengan keindahan bawah laut yang menakjubkan. Pantai Iboih terletak di ujung barat Pulau Weh dan menjadi salah satu destinasi wisata paling populer di Sabang. Air lautnya yang jernih dengan visibilitas hingga 20 meter membuatnya sempurna untuk aktivitas snorkeling dan diving.",
    image: "/src/assets/destinasi/pantaiiboih.jpg",
    rating: 4.8,
    price: "Gratis",
    category: "Pantai",
    location: "Pulau Weh, Sabang",
    openTime: "24 Jam",
    visitors: "500+ pengunjung/hari",
    facilities: ["Snorkeling", "Diving", "Restoran", "Toilet", "Parkir"],
    detailDescription:
      "Pantai Iboih adalah surga tersembunyi di ujung barat Indonesia. Dengan air laut yang kristal jernih dan terumbu karang yang masih terjaga, pantai ini menawarkan pengalaman snorkeling dan diving yang tak terlupakan. Kehidupan bawah laut yang beragam, mulai dari ikan-ikan tropis berwarna-warni hingga terumbu karang yang eksotis, menjadikan Pantai Iboih sebagai salah satu spot diving terbaik di Indonesia. Pantai ini juga dilengkapi dengan fasilitas yang memadai untuk wisatawan, termasuk penyewaan alat snorkeling, restoran seafood, dan area parkir yang luas.",
  },
  {
    id: 2,
    name: "Gua Sarang",
    description:
      "Gua dengan stalaktit dan stalagmit yang menakjubkan. Petualangan di dalam bumi dengan formasi batuan alami yang terbentuk selama ribuan tahun.",
    image: "/src/assets/destinasi/wisataguasarang.jpeg",
    rating: 4.7,
    price: "Rp 10.000",
    category: "Gua",
    location: "Sabang, Aceh",
    openTime: "08:00 - 17:00",
    visitors: "200+ pengunjung/hari",
    facilities: ["Pemandu", "Lampu", "Jalur Aman", "Toilet"],
    detailDescription:
      "Gua Sarang adalah keajaiban alam yang tersembunyi di Sabang. Dengan formasi stalaktit dan stalagmit yang terbentuk selama ribuan tahun, gua ini menawarkan pengalaman petualangan yang unik. Di dalam gua, Anda akan melihat berbagai formasi batuan yang menakjubkan dan mendengar cerita sejarah dari pemandu lokal. Gua ini memiliki suhu yang sejuk dan cocok dikunjungi saat cuaca panas.",
  },
  {
    id: 3,
    name: "Pantai Sumur Tiga",
    description:
      "Pantai dengan formasi bebatuan unik dan air terjun. Keindahan alam yang eksotis dengan kombinasi pantai dan air terjun yang jarang ditemukan.",
    image: "/src/assets/destinasi/pantaisumurtiga.jpg",
    rating: 4.9,
    price: "Gratis",
    category: "Pantai",
    location: "Pulau Weh, Sabang",
    openTime: "24 Jam",
    visitors: "300+ pengunjung/hari",
    facilities: ["Air Terjun", "Bebatuan Unik", "Fotografi", "Hiking"],
    detailDescription:
      "Pantai Sumur Tiga adalah destinasi unik yang menggabungkan keindahan pantai dengan air terjun alami. Formasi bebatuan vulkanik yang unik menciptakan pemandangan yang sangat instagramable. Air terjun yang mengalir langsung ke laut menciptakan fenomena alam yang jarang ditemukan di tempat lain. Pantai ini sangat populer untuk fotografi dan menjadi spot sunset yang menakjubkan.",
  },
];

export function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);

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

  useEffect(() => {
    if (id) {
      const foundDestination = destinationsData.find(
        (dest) => dest.id === parseInt(id)
      );
      setDestination(foundDestination);
    }
  }, [id]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Destinasi tidak ditemukan
          </h2>
          <Button onClick={() => navigate("/destinations")}>
            Kembali ke Destinasi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar id="navbar" />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.nextElementSibling?.classList.remove("hidden");
          }}
        />
        <div
          className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 items-center justify-center"
          style={{ display: "none" }}
        >
          <Camera className="w-24 h-24 text-muted-foreground" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Back Button */}
        <motion.div
          className="absolute top-24 left-4 md:left-8 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/destinations")}
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </motion.div>

        {/* Title Overlay */}
        <motion.div
          className="absolute bottom-8 left-4 md:left-8 right-4 md:right-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {destination.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">
                  {destination.rating}
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {destination.name}
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{destination.openTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{destination.visitors}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Tentang {destination.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
                  {destination.detailDescription}
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">
                  Fasilitas Tersedia
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {destination.facilities.map(
                    (facility: string, index: number) => (
                      <div
                        key={index}
                        className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-2 rounded-lg text-sm font-medium text-center"
                      >
                        {facility}
                      </div>
                    )
                  )}
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Tips Berkunjung
                  </h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Datang lebih awal untuk menghindari keramaian dan
                        mendapatkan spot foto terbaik
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Bawa kamera waterproof jika ingin mengambil foto
                        underwater
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Gunakan sunscreen untuk melindungi kulit dari sinar
                        matahari
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Jaga kebersihan dan kelestarian alam selama berkunjung
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-lg border border-border sticky top-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Informasi Kunjungan
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Harga Tiket:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-lg">
                      {destination.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">
                        {destination.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Jam Buka:</span>
                    <span className="font-medium">{destination.openTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lokasi:</span>
                    <span className="font-medium text-right">
                      {destination.location}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() =>
                    user
                      ? alert(`Booking ${destination.name} segera hadir!`)
                      : navigate("/login")
                  }
                >
                  {user ? "Booking Sekarang" : "Login untuk Booking"}
                </Button>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Dengan melakukan booking, Anda menyetujui syarat dan
                    ketentuan yang berlaku
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
