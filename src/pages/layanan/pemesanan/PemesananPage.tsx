import { useEffect, useState, type JSX } from 'react';

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

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => window.history.back()} className="mb-4 px-4 py-2 bg-gray-200 rounded">Back</button>
      <h1 className="text-2xl font-bold">Pemesanan Masuk</h1>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="flex gap-4">
            {['rental', 'penginapan', 'tourguide'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 rounded ${activeTab === tab ? 
                  (tab === 'rental' ? 'bg-blue-600' : tab === 'penginapan' ? 'bg-purple-600' : 'bg-emerald-600') + ' text-white'
                  : 'bg-gray-200'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'rental' && (
            <BookingList bookings={rentalBookings} type="rental" renderUserInfo={renderUserInfo} />
          )}
          {activeTab === 'penginapan' && (
            <BookingList bookings={penginapanBookings} type="penginapan" renderUserInfo={renderUserInfo} />
          )}
          {activeTab === 'tourguide' && (
            <BookingList bookings={tourGuideBookings} type="tourguide" renderUserInfo={renderUserInfo} />
          )}
        </>
      )}
    </div>
  );
}

type BookingListProps = {
  bookings: any[];
  type: 'rental' | 'penginapan' | 'tourguide';
  renderUserInfo: (user: User | string) => JSX.Element;
};

function BookingList({ bookings, type, renderUserInfo }: BookingListProps) {
  if (bookings.length === 0) return <p>No {type} bookings found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {bookings.map((booking) => (
        <div key={booking._id} className="p-4 border rounded shadow">
          {renderUserInfo(booking.user)}
          {type === 'rental' && (
            <>
              <p>Tanggal: {new Date(booking.tanggalMulai).toLocaleDateString()} - {new Date(booking.tanggalSelesai).toLocaleDateString()}</p>
              <p>Total Harga: Rp {booking.totalHarga.toLocaleString()}</p>
            </>
          )}
          {type === 'penginapan' && (
            <>
              <p>Check-in: {new Date(booking.check_in_date).toLocaleDateString()}</p>
              <p>Check-out: {new Date(booking.check_out_date).toLocaleDateString()}</p>
              <p>Jumlah Kamar: {booking.jumlah_kamar}</p>
              <p>Total Harga: Rp {booking.total_harga.toLocaleString()}</p>
            </>
          )}
          {type === 'tourguide' && (
            <>
              <p>Tanggal: {new Date(booking.tanggalMulai).toLocaleDateString()} - {new Date(booking.tanggalSelesai).toLocaleDateString()}</p>
              <p>Lokasi Jemput: {booking.lokasiJemput}</p>
              <p>Total Harga: Rp {booking.totalHarga.toLocaleString()}</p>
            </>
          )}
          <p>Status Pembayaran: <span className="font-medium">{booking.status_pembayaran}</span></p>
        </div>
      ))}
    </div>
  );
}
