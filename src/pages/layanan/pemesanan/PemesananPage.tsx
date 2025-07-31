import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Car, Home, User, Calendar, MapPin, CreditCard, Package, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toogle';
import { Footer } from '@/components/layouts/footer';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

interface User {
  _id: string;
  name: string;
  email: string;
}

interface BookingRental {
  _id: string;
  user: User | string;
  tanggalMulai: string;
  tanggalSelesai: string;
  totalHarga: number;
  status_pembayaran: string;
}

interface BookingPenginapan {
  _id: string;
  user: User | string;
  check_in_date: string;
  check_out_date: string;
  jumlah_kamar: number;
  total_harga: number;
  status_pembayaran: string;
}

interface BookingTourGuide {
  _id: string;
  user: User | string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lokasiJemput: string;
  totalHarga: number;
  status_pembayaran: string;
}

export default function PemesananPage() {
  const navigate = useNavigate();
  const [rentalBookings, setRentalBookings] = useState<BookingRental[]>([]);
  const [penginapanBookings, setPenginapanBookings] = useState<BookingPenginapan[]>([]);
  const [tourGuideBookings, setTourGuideBookings] = useState<BookingTourGuide[]>([]);
  const [activeTab, setActiveTab] = useState<'rental' | 'penginapan' | 'tourguide'>('rental');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [rentalRes, penginapanRes, tourguideRes] = await Promise.all([
          fetch(`${API_URL}/booking/rental/seller`, { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((data) => (Array.isArray(data) ? data : [])),

          fetch(`${API_URL}/booking/penginapan/seller`, { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((data) => (Array.isArray(data) ? data : [])),

          fetch(`${API_URL}/booking/tour-guide/seller`, { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((data) => (Array.isArray(data) ? data : [])),
        ]);

        console.log('[Rental]', rentalRes);
        console.log('[Penginapan]', penginapanRes);
        console.log('[Tour guide]', tourguideRes);

        setRentalBookings(rentalRes);
        setPenginapanBookings(penginapanRes);
        setTourGuideBookings(tourguideRes);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const renderUserInfo = (user: User | string) => {
    if (typeof user === 'string') {
      return <p className="font-semibold">User ID: {user}</p>;
    }
    return <p className="font-semibold">User: {user.name} ({user.email})</p>;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
      case 'settlement':
      case 'capture':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'expire':
      case 'cancel':
      case 'deny':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
      case 'settlement':
      case 'capture':
        return 'Berhasil';
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'expire':
        return 'Kedaluwarsa';
      case 'cancel':
        return 'Dibatalkan';
      case 'deny':
        return 'Ditolak';
      default:
        return status || 'Tidak Diketahui';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Pemesanan Masuk</h1>
              <p className="text-muted-foreground">Kelola pesanan dari pelanggan</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Memuat pemesanan...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : (
            <>
              {/* Tab Navigation */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                    <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Kategori Pemesanan</h2>
                    <p className="text-sm text-muted-foreground">Pilih kategori untuk melihat pemesanan masuk</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('rental')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === 'rental'
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-muted text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20'
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    Rental Kendaraan
                  </button>
                  <button
                    onClick={() => setActiveTab('penginapan')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === 'penginapan'
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-muted text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Penginapan
                  </button>
                  <button
                    onClick={() => setActiveTab('tourguide')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === 'tourguide'
                        ? 'bg-emerald-700 text-white shadow-lg'
                        : 'bg-muted text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Tour Guide
                  </button>
                </div>
              </div>

              {/* Rental Bookings */}
              {activeTab === 'rental' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Car className="w-5 h-5 text-emerald-500" />
                    Pemesanan Rental Kendaraan
                  </h3>
                  {rentalBookings.length === 0 ? (
                    <div className="text-center py-12 bg-card rounded-lg border border-border">
                      <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Belum ada pemesanan rental kendaraan</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {rentalBookings.map((booking) => (
                        <motion.div
                          key={booking._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                                <Car className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">Rental Kendaraan</h4>
                                <p className="text-sm text-muted-foreground">Pemesanan masuk</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status_pembayaran)}`}>
                              {getStatusText(booking.status_pembayaran)}
                            </span>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Pelanggan:</span>
                              <span className="text-foreground">
                                {typeof booking.user === 'string' ? booking.user : `${booking.user.name} (${booking.user.email})`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Periode:</span>
                              <span className="text-foreground">
                                {new Date(booking.tanggalMulai).toLocaleDateString()} - {new Date(booking.tanggalSelesai).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Total:</span>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                Rp {booking.totalHarga.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Penginapan Bookings */}
              {activeTab === 'penginapan' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Home className="w-5 h-5 text-emerald-600" />
                    Pemesanan Penginapan
                  </h3>
                  {penginapanBookings.length === 0 ? (
                    <div className="text-center py-12 bg-card rounded-lg border border-border">
                      <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Belum ada pemesanan penginapan</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {penginapanBookings.map((booking) => (
                        <motion.div
                          key={booking._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                                <Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">Penginapan</h4>
                                <p className="text-sm text-muted-foreground">Pemesanan masuk</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status_pembayaran)}`}>
                              {getStatusText(booking.status_pembayaran)}
                            </span>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Pelanggan:</span>
                              <span className="text-foreground">
                                {typeof booking.user === 'string' ? booking.user : `${booking.user.name} (${booking.user.email})`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Check-in:</span>
                              <span className="text-foreground">{new Date(booking.check_in_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Check-out:</span>
                              <span className="text-foreground">{new Date(booking.check_out_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Home className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Kamar:</span>
                              <span className="text-foreground">{booking.jumlah_kamar} kamar</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Total:</span>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                Rp {booking.total_harga.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tour Guide Bookings */}
              {activeTab === 'tourguide' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-700" />
                    Pemesanan Tour Guide
                  </h3>
                  {tourGuideBookings.length === 0 ? (
                    <div className="text-center py-12 bg-card rounded-lg border border-border">
                      <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Belum ada pemesanan tour guide</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {tourGuideBookings.map((booking) => (
                        <motion.div
                          key={booking._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                                <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">Tour Guide</h4>
                                <p className="text-sm text-muted-foreground">Pemesanan masuk</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status_pembayaran)}`}>
                              {getStatusText(booking.status_pembayaran)}
                            </span>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Pelanggan:</span>
                              <span className="text-foreground">
                                {typeof booking.user === 'string' ? booking.user : `${booking.user.name} (${booking.user.email})`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Periode:</span>
                              <span className="text-foreground">
                                {new Date(booking.tanggalMulai).toLocaleDateString()} - {new Date(booking.tanggalSelesai).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Lokasi Jemput:</span>
                              <span className="text-foreground">{booking.lokasiJemput}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Total:</span>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                Rp {booking.totalHarga.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
