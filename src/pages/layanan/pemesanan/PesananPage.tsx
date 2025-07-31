import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

// Interfaces
interface Rental {
  _id: string;
  nama: string;
}

interface Penginapan {
  _id: string;
  nama: string;
}

interface TourGuide {
  _id: string;
  nama: string;
}

interface BookingRental {
  _id: string;
  rental: string | Rental;
  tanggalMulai: string;
  tanggalSelesai: string;
  totalHarga: number;
  status_pembayaran: string;
}

interface BookingPenginapan {
  _id: string;
  penginapan: string | Penginapan;
  check_in_date: string;
  check_out_date: string;
  jumlah_kamar: number;
  total_harga: number;
  status_pembayaran: string;
}

interface BookingTourGuide {
  _id: string;
  tourGuide: string | TourGuide;
  tanggalMulai: string;
  tanggalSelesai: string;
  lokasiJemput: string;
  totalHarga: number;
  status_pembayaran: string;
}

export default function PesananPage() {
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
          fetch(`${API_URL}/booking/rental/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((r) => r.json()),

          fetch(`${API_URL}/booking/penginapan`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((r) => r.json()),

          fetch(`${API_URL}/booking/tour-guide/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((r) => r.json()),
        ]);

        setRentalBookings(Array.isArray(rentalRes) ? rentalRes : []);
        setPenginapanBookings(Array.isArray(penginapanRes) ? penginapanRes : []);
        setTourGuideBookings(Array.isArray(tourguideRes) ? tourguideRes : []);
      } catch (err) {
        console.error('Failed to fetch bookings', err);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // helper function
  const renderItemName = (item: string | { nama: string }) =>
    typeof item === 'string' ? item : item.nama;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pesanan Saya</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('rental')}
              className={`px-4 py-2 rounded ${
                activeTab === 'rental' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Rental
            </button>
            <button
              onClick={() => setActiveTab('penginapan')}
              className={`px-4 py-2 rounded ${
                activeTab === 'penginapan' ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}
            >
              Penginapan
            </button>
            <button
              onClick={() => setActiveTab('tourguide')}
              className={`px-4 py-2 rounded ${
                activeTab === 'tourguide' ? 'bg-emerald-600 text-white' : 'bg-gray-200'
              }`}
            >
              Tour Guide
            </button>
          </div>

          {activeTab === 'rental' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rentalBookings.length === 0 && <p>Tidak ada pesanan rental.</p>}
              {rentalBookings.map((booking) => (
                <div key={booking._id} className="p-4 border rounded shadow">
                  <p>Rental: {renderItemName(booking.rental)}</p>
                  <p>
                    Tanggal: {new Date(booking.tanggalMulai).toLocaleDateString()} -{' '}
                    {new Date(booking.tanggalSelesai).toLocaleDateString()}
                  </p>
                  <p>Total Harga: Rp {booking.totalHarga.toLocaleString()}</p>
                  <p>Status: <span className="font-medium">{booking.status_pembayaran}</span></p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'penginapan' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {penginapanBookings.length === 0 && <p>Tidak ada pesanan penginapan.</p>}
              {penginapanBookings.map((booking) => (
                <div key={booking._id} className="p-4 border rounded shadow">
                  <p>Penginapan: {renderItemName(booking.penginapan)}</p>
                  <p>Check-in: {new Date(booking.check_in_date).toLocaleDateString()}</p>
                  <p>Check-out: {new Date(booking.check_out_date).toLocaleDateString()}</p>
                  <p>Jumlah Kamar: {booking.jumlah_kamar}</p>
                  <p>Total Harga: Rp {booking.total_harga.toLocaleString()}</p>
                  <p>Status: <span className="font-medium">{booking.status_pembayaran}</span></p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tourguide' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tourGuideBookings.length === 0 && <p>Tidak ada pesanan tour guide.</p>}
              {tourGuideBookings.map((booking) => (
                <div key={booking._id} className="p-4 border rounded shadow">
                  <p>Tour Guide: {renderItemName(booking.tourGuide)}</p>
                  <p>
                    Tanggal: {new Date(booking.tanggalMulai).toLocaleDateString()} -{' '}
                    {new Date(booking.tanggalSelesai).toLocaleDateString()}
                  </p>
                  <p>Lokasi Jemput: {booking.lokasiJemput}</p>
                  <p>Total Harga: Rp {booking.totalHarga.toLocaleString()}</p>
                  <p>Status: <span className="font-medium">{booking.status_pembayaran}</span></p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
