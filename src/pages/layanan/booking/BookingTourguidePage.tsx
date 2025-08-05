import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, User, CreditCard } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toogle";
import { Footer } from "@/components/layouts/footer";
import type { UserData } from '@/types/userData';

const API_URL = import.meta.env.VITE_API_URL;

interface TourGuide {
  _id: string;
  name: string;
  harga: number;
  foto: string;
  wilayah: string;
}

export default function BookingTourguidePage() {
  const navigate = useNavigate();
  const userData: UserData = JSON.parse(localStorage.getItem("user") || "{}");
  
  if (!userData.id || userData.role !== "buyer") {
    navigate(-1);
  }

  const { id } = useParams<{ id: string }>();
  const [tourGuide, setTourGuide] = useState<TourGuide | null>(null);
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [lokasiJemput, setLokasiJemput] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalHarga, setTotalHarga] = useState<number | null>(null);

  // Ambil data tour guide
  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/tourguides/${id}`)
        .then(res => setTourGuide(res.data))
        .catch(err => console.error("Gagal mengambil data tour guide:", err));
    }
  }, [id]);

  // Hitung total harga setiap kali tanggal berubah
  useEffect(() => {
    if (tanggalMulai && tanggalSelesai && tourGuide) {
      const start = new Date(tanggalMulai);
      const end = new Date(tanggalSelesai);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      if (days > 0) {
        setTotalHarga(days * tourGuide.harga);
      } else {
        setTotalHarga(null);
      }
    } else {
      setTotalHarga(null);
    }
  }, [tanggalMulai, tanggalSelesai, tourGuide]);

  const handleBooking = async () => {
    if (!tanggalMulai || !tanggalSelesai || !lokasiJemput || !totalHarga || !id) {
      alert("Lengkapi semua data booking!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/booking/tour-guide`,
        { tourGuide: id, tanggalMulai, tanggalSelesai, lokasiJemput, totalHarga },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.href = res.data.payment.redirect_url;
    } catch (err: any) {
      alert(err.response?.data?.error || "Gagal booking");
    } finally {
      setLoading(false);
    }
  };

  if (!tourGuide) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Booking Tour Guide</h1>
                <p className="text-muted-foreground">Lengkapi data booking untuk melanjutkan</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat data tour guide...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Booking Tour Guide</h1>
              <p className="text-muted-foreground">Lengkapi data booking untuk melanjutkan</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Tour Guide Info */}
          <div className="bg-card rounded-lg border border-border p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Informasi Tour Guide</h2>
                <p className="text-sm text-muted-foreground">Detail tour guide yang akan dipesan</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src={tourGuide.foto} 
                  alt={tourGuide.name}
                  className="w-full h-48 object-cover rounded-lg border border-border"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">{tourGuide.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{tourGuide.wilayah}</span>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 p-3 rounded-lg">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {tourGuide.harga.toLocaleString()}
                  </span>
                  <span className="text-sm text-emerald-700 dark:text-emerald-300 ml-2">per hari</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-card rounded-lg border border-border p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Detail Booking</h2>
                <p className="text-sm text-muted-foreground">Pilih tanggal dan lokasi jemput</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Tanggal Mulai *</label>
                <input
                  type="date"
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 bg-background text-foreground"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Tanggal Selesai *</label>
                <input
                  type="date"
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 bg-background text-foreground"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-foreground">Lokasi Jemput *</label>
                <input
                  type="text"
                  value={lokasiJemput}
                  onChange={(e) => setLokasiJemput(e.target.value)}
                  placeholder="Contoh: Bandara Sabang"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 bg-background text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          {totalHarga !== null && totalHarga > 0 && (
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                  <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Ringkasan Pembayaran</h2>
                  <p className="text-sm text-muted-foreground">Total biaya booking</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Harga per hari</span>
                  <span className="text-foreground">Rp {tourGuide.harga.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Jumlah hari</span>
                  <span className="text-foreground">
                    {tanggalMulai && tanggalSelesai ? Math.ceil((new Date(tanggalSelesai).getTime() - new Date(tanggalMulai).getTime()) / (1000 * 60 * 60 * 24)) : 0} hari
                  </span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total Harga</span>
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {totalHarga.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleBooking} 
              disabled={loading || !tanggalMulai || !tanggalSelesai || !lokasiJemput || totalHarga === null || totalHarga <= 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
            >
              {loading ? "Memproses..." : "Booking Sekarang"}
            </Button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
