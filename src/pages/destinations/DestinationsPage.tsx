import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layouts/navbar";
import { HeroSectionStatic } from "@/components/layouts/hero-section-static";
import { Footer } from "@/components/layouts/footer";
import { Star, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import data from "../../data/destinations.json";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  category: string;
}

const allDestinations: Destination[] = data;
const ITEMS_PER_PAGE = 9;

export function DestinationsPage() {
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.ceil(allDestinations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDestinations = allDestinations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar id="navbar" />
      <HeroSectionStatic />

      {/* Destinations Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="mb-8 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Semua Destinasi ({allDestinations.length})
            </h2>
            <div className="text-muted-foreground">
              Halaman {currentPage} dari {totalPages}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="bg-white dark:bg-emerald-800 border-2 border-gray-200 dark:border-emerald-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => navigate(`/destinations/${destination.id}`)}
              >
                <div className="relative h-56 overflow-hidden">
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
                    className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <Camera className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
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
                  <h3 className="text-xl font-bold mb-3 text-foreground dark:text-white">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground dark:text-white/80 mb-6 text-sm leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Kisaran Harga Masuk
                    </span>
                    <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                      {destination.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/destinations/${destination.id}`);
                      }}
                    >
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <motion.div
            className="flex justify-center items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={
                      page === currentPage
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : ""
                    }
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Page Info */}
          <motion.div
            className="text-center mt-6 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Menampilkan {startIndex + 1}-
            {Math.min(startIndex + ITEMS_PER_PAGE, allDestinations.length)} dari{" "}
            {allDestinations.length} destinasi
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
