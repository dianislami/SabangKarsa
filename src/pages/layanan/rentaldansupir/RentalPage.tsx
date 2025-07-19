import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Car,
  Bike,
  Search,
  Filter,
} from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";

const rentalData = [
  {
    id: 1,
    name: "Honda Scoopy",
    description:
      "Skuter matic yang nyaman dan stylish, cocok untuk menjelajahi jalanan kota Sabang dengan lincah.",
    image: "/assets/images/motor3.webp",
    gallery: [
      "/assets/rental/scoopy.webp",
      "/assets/rental/scoopy_side.webp",
      "/assets/rental/scoopy_front.webp",
    ],
    rating: 4.7,
    price: "Rp 100.000",
    pricePerDay: 100000,
    category: "Motor",
    location: "Pusat Kota Sabang",
    features: ["Automatic", "Fuel Efficient", "Helmet Included", "Storage Compartment"],
    type: "Scooter",
    condition: "Baru",
    detailDescription:
      "Honda Scoopy adalah pilihan ideal untuk wisatawan yang ingin menjelajahi Sabang dengan praktis. Dengan desain stylish dan mesin hemat bahan bakar, skuter ini cocok untuk perjalanan singkat maupun panjang di sekitar kota.",
  },
  {
    id: 2,
    name: "Yamaha NMAX",
    description:
      "Motor matic premium dengan performa tangguh, ideal untuk perjalanan jarak jauh di Sabang.",
    image: "/assets/images/motor2.webp",
    gallery: [
      "/assets/rental/nmax.webp",
      "/assets/rental/nmax_side.webp",
      "/assets/rental/nmax_back.webp",
    ],
    rating: 4.8,
    price: "Rp 150.000",
    pricePerDay: 150000,
    category: "Motor",
    location: "Pantai Iboih",
    features: ["Automatic", "ABS Brakes", "Helmet Included", "Large Storage"],
    type: "Maxi Scooter",
    condition: "Baru",
    detailDescription:
      "Yamaha NMAX menawarkan kenyamanan dan performa premium untuk menjelajahi Sabang. Dilengkapi dengan fitur modern seperti rem ABS dan bagasi luas, motor ini cocok untuk petualangan di berbagai medan.",
  },
  {
    id: 3,
    name: "Toyota Avanza",
    description:
      "Mobil keluarga yang luas dan nyaman, cocok untuk perjalanan bersama di Sabang.",
    image: "/assets/images/mobil1.webp",
    gallery: [
      "/assets/rental/avanza.webp",
      "/assets/rental/avanza_interior.webp",
      "/assets/rental/avanza_side.webp",
    ],
    rating: 4.5,
    price: "Rp 400.000",
    pricePerDay: 400000,
    category: "Mobil",
    location: "Pusat Kota Sabang",
    features: ["AC", "7-Seater", "Audio System", "Manual"],
    type: "MPV",
    condition: "Baik",
    detailDescription:
      "Toyota Avanza adalah mobil keluarga yang ideal untuk perjalanan di Sabang. Dengan kapasitas 7 penumpang dan fitur AC yang nyaman, mobil ini cocok untuk wisata keluarga atau rombongan kecil.",
  },
  {
    id: 4,
    name: "Toyota Innova with Driver",
    description:
      "Mobil premium dengan supir berpengalaman, menawarkan perjalanan nyaman tanpa perlu mengemudi sendiri.",
    image: "/assets/images/mobil2.webp",
    gallery: [
      "/assets/rental/innova.webp",
      "/assets/rental/innova_interior.webp",
      "/assets/rental/innova_side.webp",
    ],
    rating: 4.9,
    price: "Rp 800.000",
    pricePerDay: 800000,
    category: "Mobil dengan Supir",
    location: "Sabang Bay",
    features: ["AC", "7-Seater", "Professional Driver", "Audio System"],
    type: "MPV",
    condition: "Baru",
    detailDescription:
      "Toyota Innova dengan supir profesional memberikan pengalaman perjalanan yang nyaman dan bebas repot. Supir berpengalaman akan memandu Anda ke destinasi wisata terbaik di Sabang dengan aman dan nyaman.",
  },
  {
    id: 5,
    name: "Honda Vario 125",
    description:
      "Motor matic hemat bahan bakar, cocok untuk backpacker yang ingin menjelajahi Sabang dengan budget terjangkau.",
    image: "/assets/images/motor1.webp",
    gallery: [
      "/assets/rental/vario.webp",
      "/assets/rental/vario_side.webp",
      "/assets/rental/vario_front.webp",
    ],
    rating: 4.4,
    price: "Rp 90.000",
    pricePerDay: 90000,
    category: "Motor",
    location: "Gapang Beach",
    features: ["Automatic", "Fuel Efficient", "Helmet Included"],
    type: "Scooter",
    condition: "Baik",
    detailDescription:
      "Honda Vario 125 adalah motor matic yang ekonomis dan handal, ideal untuk backpacker yang ingin menjelajahi Sabang dengan biaya rendah. Mesinnya yang hemat bahan bakar memastikan perjalanan yang efisien.",
  },
  {
    id: 6,
    name: "Daihatsu Xenia with Driver",
    description:
      "Mobil keluarga dengan supir berpengalaman, cocok untuk perjalanan wisata yang santai di Sabang.",
    image: "/assets/images/mobil3.webp",
    gallery: [
      "/assets/rental/xenia.webp",
      "/assets/rental/xenia_interior.webp",
      "/assets/rental/xenia_side.webp",
    ],
    rating: 4.6,
    price: "Rp 700.000",
    pricePerDay: 700000,
    category: "Mobil dengan Supir",
    location: "Sumur Tiga Beach",
    features: ["AC", "7-Seater", "Professional Driver", "Audio System"],
    type: "MPV",
    condition: "Baik",
    detailDescription:
      "Daihatsu Xenia dengan supir berpengalaman menawarkan kenyamanan untuk perjalanan wisata di Sabang. Mobil ini dilengkapi dengan AC dan sistem audio untuk menjamin perjalanan yang menyenangkan.",
  },
];

const categories = ["Semua", "Motor", "Mobil", "Mobil dengan Supir"];

export function RentalPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("name");

  const filteredRental = rentalData
    .filter((rental) => {
      const matchesSearch = rental.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || rental.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerDay - b.pricePerDay;
        case "price-high":
          return b.pricePerDay - a.pricePerDay;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar id="navbar" />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/sectionhero.webp"
            alt="Rental Sabang"
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
              Rental Kendaraan di Sabang
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Temukan kendaraan terbaik untuk petualangan Anda di Sabang, dari motor lincah hingga mobil nyaman dengan supir.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-background border-b border-border">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="flex flex-col lg:flex-row gap-4 items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Cari kendaraan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-emerald-500 text-white shadow-lg scale-105"
                      : "bg-muted text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="name">Nama A-Z</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rental Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredRental.map((rental, index) => (
              <motion.div
                key={rental.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={rental.image}
                    alt={rental.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {rental.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Car className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{rental.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                      {rental.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Bike className="w-4 h-4" />
                    <span className="text-sm">{rental.location}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {rental.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rental.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {rental.features.length > 3 && (
                      <span className="text-emerald-600 text-xs font-medium">
                        +{rental.features.length - 3} lainnya
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-emerald-600">
                        {rental.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        per hari
                      </span>
                    </div>
                    <Link to={`/layanan/rental/${rental.id}`}>
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
                      >
                        Lihat Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredRental.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Kendaraan tidak ditemukan
              </h3>
              <p className="text-muted-foreground">
                Coba ubah kriteria pencarian atau filter kategori
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}