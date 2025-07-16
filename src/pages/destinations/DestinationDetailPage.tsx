import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Star,
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Camera,
  X,
  Expand,
} from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";

const destinationsData = [
  {
    id: 1,
    name: "Pantai Iboih",
    description:
      "Pantai dengan air jernih dan terumbu karang yang indah. Destinasi snorkeling terbaik di Sabang dengan keindahan bawah laut yang menakjubkan. Pantai Iboih terletak di ujung barat Pulau Weh dan menjadi salah satu destinasi wisata paling populer di Sabang. Air lautnya yang jernih dengan visibilitas hingga 20 meter membuatnya sempurna untuk aktivitas snorkeling dan diving.",
    image: "/src/assets/destinasi/pantaiiboih.jpg",
    gallery: [
      "/src/assets/destinasi/pantaiiboih.jpg",
      "/src/assets/destinasi/pantaisumurtiga.jpg",
      "/src/assets/destinasi/pulaurubiah.jpg",
      "/src/assets/destinasi/pantaianoiitam.jpeg",
    ],
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
    gallery: [
      "/src/assets/destinasi/wisataguasarang.jpeg",
      "/src/assets/destinasi/tugu0km.jpg",
      "/src/assets/destinasi/pantaianoiitam.jpeg",
      "/src/assets/destinasi/pulaurubiah.jpg",
    ],
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
    gallery: [
      "/src/assets/destinasi/pantaisumurtiga.jpg",
      "/src/assets/destinasi/pantaiiboih.jpg",
      "/src/assets/destinasi/wisataguasarang.jpeg",
      "/src/assets/destinasi/tugu0km.jpg",
    ],
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover scale-110 transition-transform duration-700 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <div
            className="hidden w-full h-full bg-gradient-to-br from-emerald-500/20 to-blue-600/20 items-center justify-center"
            style={{ display: "none" }}
          >
            <Camera className="w-24 h-24 text-white/60" />
          </div>
        </div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border-2 border-white/40 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 right-32 w-24 h-24 border-2 border-emerald-300/30 rounded-full"
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 right-16 w-16 h-16 border-2 border-blue-300/40 rounded-full"
            animate={{ rotate: 360, y: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-20 h-20 border border-yellow-300/30 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Enhanced Title Overlay */}
        <motion.div
          className="absolute bottom-8 left-4 md:left-8 right-4 md:right-8 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl"></div>

            <div className="relative p-8 text-white">
              {/* Category and Rating */}
              <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {destination.category}
                  </span>
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-yellow-100">
                      {destination.rating}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {destination.name}
              </motion.h1>

              {/* Info Pills */}
              <motion.div
                className="flex flex-wrap items-center gap-4 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <MapPin className="w-4 h-4 text-emerald-300" />
                  <span className="text-white/90 font-medium">
                    {destination.location}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Clock className="w-4 h-4 text-blue-300" />
                  <span className="text-white/90 font-medium">
                    {destination.openTime}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - Gallery and Description */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Photo Gallery */}
              <div className="bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border mb-8">
                {/* Main Preview Image */}
                <div className="relative mb-6">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                    <img
                      src={destination.gallery[currentImageIndex]}
                      alt={`${destination.name} - Image ${
                        currentImageIndex + 1
                      }`}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => setIsFullscreen(true)}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.classList.remove("hidden");
                          fallback.classList.add("flex");
                        }
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 items-center justify-center">
                      <Camera className="w-24 h-24 text-muted-foreground" />
                    </div>
                    {/* Fullscreen Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFullscreen(true);
                      }}
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                    >
                      <Expand className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-3">
                  {destination.gallery.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-200 ${
                        currentImageIndex === index
                          ? "ring-2 ring-emerald-500 scale-105"
                          : "hover:scale-105 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${destination.name} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const fallback =
                            target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.classList.remove("hidden");
                            fallback.classList.add("flex");
                          }
                        }}
                      />
                      <div className="hidden w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 items-center justify-center">
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description and Details */}
              <div className="bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {destination.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
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
              </div>
            </motion.div>

            {/* Sticky Sidebar - Informasi Kunjungan */}
            <div className="sticky top-24">
              <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-lg border border-border">
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
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Maps:</span>
                    <a
                      href="https://maps.app.goo.gl/wxNo5n3gqEdk7MA57"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium underline transition-colors"
                    >
                      Klik disini
                    </a>
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
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <img
              src={destination.gallery[currentImageIndex]}
              alt={`${destination.name} - Fullscreen`}
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Navigation arrows for fullscreen */}
            {destination.gallery.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? destination.gallery.length - 1 : prev - 1
                    );
                  }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === destination.gallery.length - 1 ? 0 : prev + 1
                    );
                  }}
                >
                  <ArrowLeft className="w-6 h-6 rotate-180" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
