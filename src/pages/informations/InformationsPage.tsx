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
  Percent,
  CalendarDays,
} from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import data from "../../data/informations.json";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"

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
}

const { informationData }: InformationData = localStorage.getItem("language")?.toLowerCase() === "id" ? data.id : data.en;

export function InformationsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t("dipg-all"));
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const categories = [t("dipg-all"), ...Array.from(new Set(informationData.map(info => info.category)))];

  const allFilteredInformation = informationData
    .filter((info) => {
      const matchesSearch =
        info.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === t("dipg-all") || info.category === selectedCategory;
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
            src="/assets/destinasi/pantaiiboih.webp"
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
              {t("dipg-header-1")} <span className="text-emerald-400">{t("dipg-header-2")}</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t("dipg-line")}
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
                placeholder={t("dipg-ph")}
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
                <option value="latest">{t("dipg-filter-1")}</option>
                <option value="oldest">{t("dipg-filter-2")}</option>
                <option value="views">{t("dipg-filter-3")}</option>
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

                  <a href={`/informations/${info.id}`} className="text-xl font-bold text-foreground hover:text-emerald-600 transition-colors mb-3 line-clamp-2 no-underline cursor-pointer duration-200">
                    {info.title}
                  </a>

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
                      {t("dipg-detail")}
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
                {t("dipg-not-found")}
              </h3>
              <p className="text-muted-foreground">
                {t("dipg-suggest")}
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
                {t("dipg-prev")}
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
                {t("dipg-next")}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>
      {/* Jadwal Kapal Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Ship className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("dipg-ferry")}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("dipg-ferry-p")}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Banda Aceh ke Sabang */}
            <div 
              className="rounded-2xl p-6 shadow-lg border"
              style={{
                backgroundColor: 'var(--ferry-schedule-bg)',
                borderColor: 'var(--ferry-schedule-border)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {t("dipg-dest-1")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("dipg-dest-1-port")}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { day: t("dipg-dest-1-sch-1"), times: ["08.00", "14.00", "17.00"] },
                  { day: t("dipg-dest-1-sch-2"), times: ["08.00", "11.00", "14.00", "17.00"] },
                  { day: t("dipg-dest-1-sch-3"), times: ["08.00", "14.00", "17.00", "20.00"] },
                  {
                    day: t("dipg-dest-1-sch-4"),
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
                          className="px-3 py-1 rounded-full text-sm font-medium shadow-sm border"
                          style={{
                            backgroundColor: 'var(--ferry-time-bg)',
                            color: 'var(--ferry-time-text)',
                            borderColor: 'var(--ferry-time-border)'
                          }}
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div 
                className="mt-6 p-4 rounded-xl border"
                style={{
                  backgroundColor: 'var(--ferry-note-bg)',
                  borderColor: 'var(--ferry-note-border)'
                }}
              >
                <p 
                  className="text-sm font-medium"
                  style={{ color: 'var(--ferry-note-text)' }}
                >
                  {t("dipg-dest-1-note-1")}
                </p>
                <p 
                  className="text-sm mt-1"
                  style={{ color: 'var(--ferry-note-text)' }}
                >
                  {t("dipg-dest-1-note-2")}
                </p>
              </div>
            </div>

            {/* Sabang ke Banda Aceh */}
            <div 
              className="rounded-2xl p-6 shadow-lg border"
              style={{
                backgroundColor: 'var(--ferry-schedule-bg)',
                borderColor: 'var(--ferry-schedule-border)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {t("dipg-dest-2")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("dipg-dest-2-port")}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { day: t("dipg-dest-2-sch-1"), times: ["06.30", "12.00", "15.30"] },
                  { day: t("dipg-dest-2-sch-2"), times: ["06.30", "09.30", "12.00", "15.30"] },
                  { day: t("dipg-dest-2-sch-3"), times: ["06.30", "12.00", "15.30", "18.30"] },
                  {
                    day: t("dipg-dest-2-sch-4"),
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
                          className="px-3 py-1 rounded-full text-sm font-medium shadow-sm border"
                          style={{
                            backgroundColor: 'var(--ferry-time-bg)',
                            color: 'var(--ferry-time-text)',
                            borderColor: 'var(--ferry-time-border)'
                          }}
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div 
                className="mt-6 p-4 rounded-xl border"
                style={{
                  backgroundColor: 'var(--ferry-note-bg)',
                  borderColor: 'var(--ferry-note-border)'
                }}
              >
                <p 
                  className="text-sm font-medium"
                  style={{ color: 'var(--ferry-note-text)' }}
                >
                  {t("dipg-dest-2-note-1")}
                </p>
                <p 
                  className="text-sm mt-1"
                  style={{ color: 'var(--ferry-note-text)' }}
                >
                  {t("dipg-dest-2-note-2")}
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
            <div 
              className="rounded-xl p-4 max-w-3xl mx-auto border"
              style={{
                backgroundColor: 'var(--ferry-note-bg)',
                borderColor: 'var(--ferry-note-border)'
              }}
            >
              <p 
                className="text-sm"
                style={{ color: 'var(--ferry-note-text)' }}
              >
                <strong>{t("dipg-note")}</strong> {t("dipg-note-text")}
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
              <Percent className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("dipg-promo-h")}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("dipg-promo-line")}
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
              className="group bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold">{t("dipg-discount-1")}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("dipg-discount-1-h")}
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  {t("dipg-discount-1-p")}
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
                    className="bg-white text-emerald-600 hover:bg-white/90"
                  >
                    {t("dipg-discount-1-btn")}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Promo 2 - Tour Package */}
            <motion.div
              className="group bg-gradient-to-br from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold">{t("dipg-discount-2")}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("dipg-discount-2-h")}
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  {t("dipg-discount-2-p")}
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
                    className="bg-white text-teal-600 hover:bg-white/90"
                  >
                    {t("dipg-discount-2-btn")}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Promo 3 - Restaurant */}
            <motion.div
              className="group bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold">{t("dipg-discount-3")}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("dipg-discount-3-h")}
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  {t("dipg-discount-3-p")}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-lg">
                      {t("dipg-discount-3-price")}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-white text-green-600 hover:bg-white/90"
                  >
                    {t("dipg-discount-3-btn")}
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
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700"></div>
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
            <div className="relative z-10 px-8 py-12 md:px-16 md:py-20">
              <div className="max-w-4xl mx-auto text-center text-white">
                <motion.h3
                  className="text-3xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {t("dipg-event-h")}
                </motion.h3>
                <motion.p
                  className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {t("dipg-event-desc")}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-white" />
                    <span className="text-white font-bold">
                      {t("dipg-event-date")}
                    </span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white" />
                    <span className="text-white font-bold">
                      {t("dipg-event-place")}
                    </span>
                  </div>
                  <Button
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-white/90 font-bold"
                  >
                    {t("dipg-event-reg")}
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
