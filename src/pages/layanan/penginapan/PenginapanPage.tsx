import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  Search,
  Filter,
  Wifi,
  Car,
  Coffee,
  Waves,
  Users,
  Bed,
} from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";

const penginapanData = [
  {
    id: 1,
    name: "Sabang Fair Hotel",
    description:
      "Hotel mewah di pusat kota Sabang dengan fasilitas lengkap dan pemandangan laut yang menakjubkan. Terletak strategis dekat dengan berbagai destinasi wisata utama.",
    image: "/src/assets/destinasi/pantaiiboih.jpg",
    gallery: [
      "/src/assets/destinasi/pantaiiboih.jpg",
      "/src/assets/destinasi/pantaisumurtiga.jpg",
      "/src/assets/destinasi/pulaurubiah.jpg",
      "/src/assets/destinasi/pantaianoiitam.jpeg",
    ],
    rating: 4.8,
    price: "Rp 750.000",
    pricePerNight: 750000,
    category: "Hotel",
    location: "Pusat Kota Sabang",
    facilities: ["WiFi Gratis", "AC", "Restaurant", "Pool", "Parking", "Room Service"],
    rooms: 45,
    checkIn: "14:00",
    checkOut: "12:00",
    detailDescription:
      "Sabang Fair Hotel adalah hotel bintang 4 yang menawarkan kenyamanan dan kemewahan di jantung kota Sabang. Dengan pemandangan laut yang spektakuler dan akses mudah ke berbagai atraksi wisata, hotel ini menjadi pilihan ideal untuk wisatawan. Fasilitas lengkap termasuk kolam renang, restoran, spa, dan pusat kebugaran. Setiap kamar dilengkapi dengan AC, TV LED, dan balkon pribadi dengan pemandangan laut atau kota.",
  },
  {
    id: 2,
    name: "Weh Island Resort",
    description:
      "Resort eksklusif di tepi pantai dengan konsep ramah lingkungan. Nikmati ketenangan alam dengan fasilitas modern dan aktivitas air yang menarik.",
    image: "/src/assets/destinasi/pulaurubiah.jpg",
    gallery: [
      "/src/assets/destinasi/pulaurubiah.jpg",
      "/src/assets/destinasi/pantaiiboih.jpg",
      "/src/assets/destinasi/wisataguasarang.jpeg",
      "/src/assets/destinasi/pantaisumurtiga.jpg",
    ],
    rating: 4.9,
    price: "Rp 1.200.000",
    pricePerNight: 1200000,
    category: "Resort",
    location: "Pantai Iboih",
    facilities: ["WiFi Gratis", "AC", "Restaurant", "Diving Center", "Spa", "Beach Access"],
    rooms: 28,
    checkIn: "15:00",
    checkOut: "11:00",
    detailDescription:
      "Weh Island Resort adalah resort eksklusif yang terletak di pantai Iboih yang memukau. Resort ini menawarkan pengalaman menginap yang tak terlupakan dengan konsep eco-friendly dan akses langsung ke pantai. Fasilitas diving center memungkinkan tamu untuk menjelajahi keindahan bawah laut Sabang. Setiap villa dilengkapi dengan fasilitas mewah dan pemandangan laut yang menakjubkan.",
  },
  {
    id: 3,
    name: "Sabang Inn",
    description:
      "Penginapan nyaman dengan harga terjangkau di pusat kota. Cocok untuk backpacker dan wisatawan budget dengan fasilitas yang memadai.",
    image: "/src/assets/destinasi/wisataguasarang.jpeg",
    gallery: [
      "/src/assets/destinasi/wisataguasarang.jpeg",
      "/src/assets/destinasi/tugu0km.jpg",
      "/src/assets/destinasi/pantaianoiitam.jpeg",
      "/src/assets/destinasi/pantaiiboih.jpg",
    ],
    rating: 4.3,
    price: "Rp 250.000",
    pricePerNight: 250000,
    category: "Inn",
    location: "Pusat Kota Sabang",
    facilities: ["WiFi Gratis", "AC", "Shared Kitchen", "Common Area", "Parking"],
    rooms: 20,
    checkIn: "14:00",
    checkOut: "12:00",
    detailDescription:
      "Sabang Inn adalah pilihan ideal bagi wisatawan yang mencari penginapan nyaman dengan budget terjangkau. Terletak strategis di pusat kota Sabang, memudahkan akses ke berbagai destinasi wisata dan fasilitas umum. Meski dengan harga ekonomis, penginapan ini tetap menyediakan fasilitas yang memadai untuk kenyamanan tamu.",
  },
  {
    id: 4,
    name: "Ocean View Hotel",
    description:
      "Hotel modern dengan pemandangan laut yang menakjubkan. Dilengkapi fasilitas bisnis dan rekreasi untuk berbagai kebutuhan wisatawan.",
    image: "/src/assets/destinasi/pantaisumurtiga.jpg",
    gallery: [
      "/src/assets/destinasi/pantaisumurtiga.jpg",
      "/src/assets/destinasi/pantaiiboih.jpg",
      "/src/assets/destinasi/pulaurubiah.jpg",
      "/src/assets/destinasi/wisataguasarang.jpeg",
    ],
    rating: 4.6,
    price: "Rp 550.000",
    pricePerNight: 550000,
    category: "Hotel",
    location: "Sabang Bay",
    facilities: ["WiFi Gratis", "AC", "Restaurant", "Meeting Room", "Gym", "Laundry"],
    rooms: 35,
    checkIn: "14:00",
    checkOut: "12:00",
    detailDescription:
      "Ocean View Hotel menawarkan pengalaman menginap yang nyaman dengan pemandangan laut yang memukau. Hotel modern ini dilengkapi dengan fasilitas bisnis dan rekreasi yang lengkap. Lokasi strategis di Sabang Bay memberikan akses mudah ke pelabuhan dan berbagai atraksi wisata bahari. Setiap kamar dirancang dengan interior modern dan balkon pribadi.",
  },
  {
    id: 5,
    name: "Freddie's Homestay",
    description:
      "Homestay tradisional dengan nuansa kekeluargaan. Pengalaman menginap autentik dengan keramahan khas masyarakat Sabang.",
    image: "/src/assets/destinasi/pantaianoiitam.jpeg",
    gallery: [
      "/src/assets/destinasi/pantaianoiitam.jpeg",
      "/src/assets/destinasi/pantaiiboih.jpg",
      "/src/assets/destinasi/tugu0km.jpg",
      "/src/assets/destinasi/pulaurubiah.jpg",
    ],
    rating: 4.4,
    price: "Rp 180.000",
    pricePerNight: 180000,
    category: "Homestay",
    location: "Gapang Beach",
    facilities: ["WiFi Gratis", "Fan", "Shared Bathroom", "Traditional Food", "Tour Guide"],
    rooms: 12,
    checkIn: "13:00",
    checkOut: "11:00",
    detailDescription:
      "Freddie's Homestay menawarkan pengalaman menginap yang autentik dengan suasana kekeluargaan yang hangat. Berlokasi di dekat Pantai Gapang, homestay ini memberikan kesempatan untuk merasakan kehidupan lokal masyarakat Sabang. Pemilik yang ramah siap membantu wisatawan dengan informasi dan tour guide lokal.",
  },
  {
    id: 6,
    name: "Sumur Tiga Beach Hotel",
    description:
      "Hotel boutique di lokasi eksklusif dekat Pantai Sumur Tiga. Kombinasi sempurna antara kemewahan dan keindahan alam.",
    image: "/src/assets/destinasi/tugu0km.jpg",
    gallery: [
      "/src/assets/destinasi/tugu0km.jpg",
      "/src/assets/destinasi/pantaisumurtiga.jpg",
      "/src/assets/destinasi/pantaiiboih.jpg",
      "/src/assets/destinasi/wisataguasarang.jpeg",
    ],
    rating: 4.7,
    price: "Rp 950.000",
    pricePerNight: 950000,
    category: "Boutique Hotel",
    location: "Sumur Tiga Beach",
    facilities: ["WiFi Gratis", "AC", "Private Beach", "Restaurant", "Spa", "Water Sports"],
    rooms: 18,
    checkIn: "15:00",
    checkOut: "12:00",
    detailDescription:
      "Sumur Tiga Beach Hotel adalah hotel boutique eksklusif yang menawarkan kemewahan di lokasi yang menakjubkan. Dengan akses langsung ke Pantai Sumur Tiga yang terkenal, hotel ini memberikan pengalaman menginap yang tak terlupakan. Fasilitas premium dan layanan personal menjadikan hotel ini pilihan utama untuk honeymoon dan liburan romantis.",
  },
];

const categories = ["Semua", "Hotel", "Resort", "Inn", "Homestay", "Boutique Hotel"];

export function PenginapanPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("name");

  const filteredPenginapan = penginapanData
    .filter((penginapan) => {
      const matchesSearch = penginapan.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || penginapan.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerNight - b.pricePerNight;
        case "price-high":
          return b.pricePerNight - a.pricePerNight;
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
            src="/src/assets/destinasi/pantaiiboih.jpg"
            alt="Penginapan Sabang"
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
              Penginapan di Sabang
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Temukan tempat menginap terbaik di Sabang, dari hotel mewah hingga
              homestay tradisional yang ramah budget
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
                placeholder="Cari penginapan..."
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

      {/* Penginapan Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredPenginapan.map((penginapan, index) => (
              <motion.div
                key={penginapan.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={penginapan.image}
                    alt={penginapan.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {penginapan.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">
                      {penginapan.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                      {penginapan.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{penginapan.location}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {penginapan.description}
                  </p>

                  {/* Facilities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {penginapan.facilities.slice(0, 3).map((facility, idx) => (
                      <span
                        key={idx}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
                      >
                        {facility}
                      </span>
                    ))}
                    {penginapan.facilities.length > 3 && (
                      <span className="text-emerald-600 text-xs font-medium">
                        +{penginapan.facilities.length - 3} lainnya
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-emerald-600">
                        {penginapan.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        per malam
                      </span>
                    </div>
                    <Link to={`/layanan/penginapan/${penginapan.id}`}>
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

          {filteredPenginapan.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Penginapan tidak ditemukan
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
