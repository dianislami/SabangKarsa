import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function BookingRentalPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams<{ id: string }>();

  const [rental, setRental] = useState<any>(null);
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [totalHarga, setTotalHarga] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data rental
  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await fetch(`${API_URL}/rental/${id}`);
        if (!res.ok) throw new Error('Gagal mengambil data rental');
        const data = await res.json();
        setRental(data);
      } catch (e: any) {
        setError(e.message || 'Terjadi kesalahan saat memuat rental');
      }
    };
    if (id) fetchRental();
  }, [id]);

  // Hitung total harga
  useEffect(() => {
    if (rental && tanggalMulai && tanggalSelesai) {
      const days = Math.ceil(
        (new Date(tanggalSelesai).getTime() - new Date(tanggalMulai).getTime())
        / (1000 * 60 * 60 * 24)
      );
      if (days > 0) {
        setTotalHarga(days * rental.harga);
      } else {
        setTotalHarga(0);
      }
    }
  }, [rental, tanggalMulai, tanggalSelesai]);

  const handleBooking = async () => {
    try {
      setError('');
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Anda belum login');

      const res = await fetch(`${API_URL}/booking/rental`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rental: id,
          tanggalMulai,
          tanggalSelesai,
          totalHarga, // opsional, BE sebaiknya hitung ulang
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal booking rental');

      if (data.payment?.redirect_url) {
        // redirect ke Midtrans
        window.location.href = data.payment.redirect_url;
      } else {
        alert('Booking berhasil, tetapi link pembayaran tidak tersedia');
      }
    } catch (e: any) {
      setError(e.message || 'Terjadi kesalahan saat booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Booking Rental</h1>
      {rental ? (
        <div className="space-y-3">
          <p className="font-semibold">{rental.nama}</p>
          <p>Rp {rental.hargaPerHari?.toLocaleString()} / hari</p>
          <div>
            <label>Tanggal Mulai</label>
            <input
              type="date"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label>Tanggal Selesai</label>
            <input
              type="date"
              value={tanggalSelesai}
              onChange={(e) => setTanggalSelesai(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <p>
            Total harga:{' '}
            <span className="text-green-600">
              Rp {totalHarga.toLocaleString()}
            </span>
          </p>
          <Button onClick={handleBooking} disabled={loading}>
            {loading ? 'Memproses...' : 'Booking & Bayar'}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
