import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  User,
  Map,
  Search,
  Filter,
} from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";

const tourGuideData = [
  {
    id: 1,
    name: "Achmad Atha Zayyan",
    role: "Tour Guide & Pendiri",
    image: "/assets/images/fotoAtha.webp",
    bio: "Achmad, pendiri JakSabang, berdedikasi mempromosikan Sabang ke dunia. Dengan pengalaman lebih dari 10 tahun di industri pariwisata, ia ahli dalam wisata budaya dan sejarah Sabang.",
    expertise: "Wisata Budaya",
    rating: 4.9,
    price: "Rp 500.000",
    pricePerDay: 500000,
    location: "Pusat Kota Sabang",
    languages: ["Bahasa Indonesia", "English"],
    activities: ["City Tour", "Historical Sites", "Cultural Experiences"],
    detailBio:
      "Achmad adalah pemandu wisata berpengalaman yang bersemangat berbagi keindahan dan sejarah Sabang. Sebagai pendiri JakSabang, ia memiliki pengetahuan mendalam tentang budaya lokal, tradisi, dan destinasi tersembunyi di Sabang.",
  },
  {
    id: 2,
    name: "Muhammad Aidil Fitrah",
    role: "Pemandu Wisata Petualang",
    image: "/assets/images/fotoAidil.webp",
    bio: "Aidil mengelola tur petualangan di Sabang, dengan keahlian dalam diving, hiking, dan eksplorasi alam.",
    expertise: "Wisata Alam",
    rating: 4.7,
    price: "Rp 450.000",
    pricePerDay: 450000,
    location: "Pantai Iboih",
    languages: ["Bahasa Indonesia", "English", "Acehnese"],
    activities: ["Diving", "Hiking", "Beach Exploration"],
    detailBio:
      "Aidil adalah pemandu wisata yang berspesialisasi dalam petualangan alam. Dengan keahlian dalam diving dan hiking, ia akan membawa Anda menjelajahi keindahan alam Sabang, dari terumbu karang hingga hutan tropis.",
  },
  {
    id: 3,
    name: "Muhammad Naufal Hanif",
    role: "Pemandu Wisata Teknologi",
    image: "/assets/images/fotoHanif.webp",
    bio: "Hanif menggabungkan teknologi dengan wisata, menawarkan tur interaktif dengan panduan digital di Sabang.",
    expertise: "Wisata Teknologi",
    rating: 4.8,
    price: "Rp 600.000",
    pricePerDay: 600000,
    location: "Sabang Bay",
    languages: ["Bahasa Indonesia", "English"],
    activities: ["Digital Tours", "Photography", "Eco Tours"],
    detailBio:
      "Hanif adalah pemandu wisata inovatif yang mengintegrasikan teknologi dalam pengalaman wisata. Dengan tur interaktif berbasis aplikasi dan fotografi, ia menawarkan pengalaman modern untuk menjelajahi Sabang.",
  },
];

const expertiseCategories = ["Semua", "Wisata Budaya", "Wisata Alam", "Wisata Teknologi"];

export function TourGuidePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("Semua");
  const [sortBy, setSortBy] = useState("name");

  const filteredTourGuides = tourGuideData
    .filter((guide) => {
      const matchesSearch = guide.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesExpertise =
        selectedExpertise === "Semua" || guide.expertise === selectedExpertise;
      return matchesSearch && matchesExpertise;
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
            src="/assets/destinasi/pantaiiboih.webp"
            alt="Tour Guide Sabang"
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
              Pemesanan Tour Guide di Sabang
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Temukan pemandu wisata terbaik di Sabang untuk pengalaman wisata budaya, alam, atau teknologi yang tak terlupakan.
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
                placeholder="Cari pemandu wisata..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Expertise Filter */}
            <div className="flex flex-wrap gap-2">
              {expertiseCategories.map((expertise) => (
                <button
                  key={expertise}
                  onClick={() => setSelectedExpertise(expertise)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedExpertise === expertise
                      ? "bg-emerald-500 text-white shadow-lg scale-105"
                      : "bg-muted text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20"
                  }`}
                >
                  {expertise}
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

      {/* Tour Guide Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredTourGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Expertise Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {guide.expertise}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <User className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{guide.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                      {guide.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Map className="w-4 h-4" />
                    <span className="text-sm">{guide.location}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {guide.bio}
                  </p>

                  {/* Activities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.activities.slice(0, 3).map((activity, idx) => (
                      <span
                        key={idx}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
                      >
                        {activity}
                      </span>
                    ))}
                    {guide.activities.length > 3 && (
                      <span className="text-emerald-600 text-xs font-medium">
                        +{guide.activities.length - 3} lainnya
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-emerald-600">
                        {guide.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        per hari
                      </span>
                    </div>
                    <Link to={`/layanan/tour-guide/${guide.id}`}>
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

          {filteredTourGuides.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🧑‍🦯</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Pemandu wisata tidak ditemukan
              </h3>
              <p className="text-muted-foreground">
                Coba ubah kriteria pencarian atau filter keahlian
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}