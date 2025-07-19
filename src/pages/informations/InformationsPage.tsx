import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Calendar,
  Eye,
  Clock,
  Tag,
  ArrowRight,
  Ship,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Percent,
} from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import data from "../../data/informations.json";
import { Link } from "react-router-dom";

interface Information {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  views: number;
  publishDate: string;
  tags: string[];
  author?: string;
  authorAvatar?: string;
}

interface InformationData {
  informationData: Information[];
  categories: string[];
}

const { informationData, categories }: InformationData = data;

export function InformationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allFilteredInformation = informationData
    .filter((info) => {
      const matchesSearch =
        info.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || info.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "views":
          return b.views - a.views;
        case "oldest":
          return (
            new Date(a.publishDate).getTime() -
            new Date(b.publishDate).getTime()
          );
        default:
          return (
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
          );
      }
    });

  // Pagination calculations
  const totalPages = Math.ceil(allFilteredInformation.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const filteredInformation = allFilteredInformation.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when search/filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar id="navbar" />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/destinasi/pantaiiboih.jpg"
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
              The <span className="text-emerald-400">Blog</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Informasi, tips, dan panduan lengkap tentang wisata Sabang.
              Temukan wawasan berharga untuk petualangan Anda.
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
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
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
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="latest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="views">Paling Populer</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Blog Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredInformation.map((info, index) => (
              <motion.article
                key={info.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={info.image}
                    alt={info.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {info.category}
                    </span>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">
                      {info.views.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(info.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{info.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors mb-3 line-clamp-2">
                    {info.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {info.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {info.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <Link to={`/informations/${info.id}`}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredInformation.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Artikel tidak ditemukan
              </h3>
              <p className="text-muted-foreground">
                Coba ubah kriteria pencarian atau filter kategori
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-2 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 ${
                        currentPage === page
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>
      {/* Jadwal Kapal Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Ship className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Jadwal Kapal Ferry
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Informasi jadwal keberangkatan kapal ferry dari dan ke Sabang
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Banda Aceh ke Sabang */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Banda Aceh → Sabang
                  </h3>
                  <p className="text-muted-foreground">
                    Pelabuhan Ulee Lheue - Balohan
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { day: "Senin - Kamis", times: ["08.00", "14.00", "17.00"] },
                  { day: "Jumat", times: ["08.00", "11.00", "14.00", "17.00"] },
                  { day: "Sabtu", times: ["08.00", "14.00", "17.00", "20.00"] },
                  {
                    day: "Minggu",
                    times: ["08.00", "11.00", "14.00", "17.00"],
                  },
                ].map((schedule, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-3 border-b border-border/50 last:border-b-0"
                  >
                    <span className="font-semibold text-foreground">
                      {schedule.day}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {schedule.times.map((time, timeIdx) => (
                        <span
                          key={timeIdx}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  💰 Tarif: Dewasa Rp 14.000 | Anak Rp 7.000
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  ⏱️ Durasi perjalanan: ±45 menit
                </p>
              </div>
            </div>

            {/* Sabang ke Banda Aceh */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Sabang → Banda Aceh
                  </h3>
                  <p className="text-muted-foreground">
                    Balohan - Pelabuhan Ulee Lheue
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { day: "Senin - Kamis", times: ["06.30", "12.00", "15.30"] },
                  { day: "Jumat", times: ["06.30", "09.30", "12.00", "15.30"] },
                  { day: "Sabtu", times: ["06.30", "12.00", "15.30", "18.30"] },
                  {
                    day: "Minggu",
                    times: ["06.30", "09.30", "12.00", "15.30"],
                  },
                ].map((schedule, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-3 border-b border-border/50 last:border-b-0"
                  >
                    <span className="font-semibold text-foreground">
                      {schedule.day}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {schedule.times.map((time, timeIdx) => (
                        <span
                          key={timeIdx}
                          className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                  💰 Tarif: Dewasa Rp 14.000 | Anak Rp 7.000
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                  ⏱️ Durasi perjalanan: ±45 menit
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 max-w-3xl mx-auto">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                ⚠️ <strong>Catatan:</strong> Jadwal dapat berubah sewaktu-waktu
                tergantung cuaca dan kondisi laut. Disarankan untuk konfirmasi
                jadwal sebelum keberangkatan.
              </p>
            </div>
          </motion.div>
        </div>
      </section>{" "}
      {/* Promotions Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Percent className="w-8 h-8 text-orange-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Promo & Penawaran Spesial
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Jangan lewatkan penawaran menarik dari mitra wisata kami
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Promo 1 - Hotel Discount */}
            <motion.div
              className="group bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold">DISKON 30%</span>
                  </div>
                  <Star className="w-6 h-6 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Sabang Paradise Resort
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Menginap 3 malam atau lebih dan dapatkan diskon fantastis!
                  Berlaku hingga akhir bulan.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white/70 text-sm line-through">
                      Rp 800.000
                    </span>
                    <span className="text-white font-bold text-lg ml-2">
                      Rp 560.000
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-white text-orange-500 hover:bg-white/90"
                  >
                    Pesan Sekarang
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Promo 2 - Tour Package */}
            <motion.div
              className="group bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold">PAKET HEMAT</span>
                  </div>
                  <Star className="w-6 h-6 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Sabang Island Hopping
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Jelajahi 5 pulau cantik sekitar Sabang dalam 1 hari! Termasuk
                  makan siang dan snorkeling.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white/70 text-sm line-through">
                      Rp 500.000
                    </span>
                    <span className="text-white font-bold text-lg ml-2">
                      Rp 350.000
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-white text-blue-500 hover:bg-white/90"
                  >
                    Info Lengkap
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Promo 3 - Restaurant */}
            <motion.div
              className="group bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold">BUY 2 GET 1</span>
                  </div>
                  <Star className="w-6 h-6 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Seafood Bahari Restaurant
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Nikmati menu seafood segar dengan promo spesial! Beli 2 main
                  course gratis 1 dessert.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-lg">
                      Mulai Rp 75.000
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-white text-emerald-500 hover:bg-white/90"
                  >
                    Lihat Menu
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Banner Iklan Besar */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 px-8 py-12 md:px-16 md:py-20">
              <div className="max-w-4xl mx-auto text-center text-white">
                <motion.h3
                  className="text-3xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Festival Sabang Fair 2025
                </motion.h3>
                <motion.p
                  className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Bergabunglah dalam perayaan budaya terbesar Sabang! Pameran
                  kuliner, pertunjukan seni, dan berbagai aktivitas menarik
                  menanti Anda.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                    <span className="text-white font-bold">
                      📅 15-17 Agustus 2025
                    </span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                    <span className="text-white font-bold">
                      📍 Pantai Iboih
                    </span>
                  </div>
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-white/90 font-bold"
                  >
                    Daftar Sekarang
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
