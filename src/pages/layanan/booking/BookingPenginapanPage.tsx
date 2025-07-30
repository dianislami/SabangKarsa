import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function BookingPenginapanPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams<{ id: string }>();

  const [penginapan, setPenginapan] = useState<any>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [jumlahKamar, setJumlahKamar] = useState(1);
  const [totalHarga, setTotalHarga] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch data penginapan
  useEffect(() => {
    const fetchPenginapan = async () => {
      try {
        const res = await fetch(`${API_URL}/penginapan/${id}`);
        if (!res.ok) throw new Error('Gagal mengambil data penginapan');
        const data = await res.json();
        setPenginapan(data);
      } catch (e: any) {
        setError(e.message || 'Terjadi kesalahan saat memuat penginapan');
      }
    };
    if (id) fetchPenginapan();
  }, [id]);

  // Hitung total harga
  useEffect(() => {
    if (penginapan && checkIn && checkOut && jumlahKamar > 0) {
      const nights = Math.ceil(
        (+new Date(checkOut) - +new Date(checkIn)) / (1000 * 60 * 60 * 24)
      );
      setTotalHarga(nights * penginapan.hargaPerMalam * jumlahKamar);
    }
  }, [penginapan, checkIn, checkOut, jumlahKamar]);

  const handleBooking = async () => {
    try {
      setError('');
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Anda belum login');

      const res = await fetch(`${API_URL}/booking/penginapan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          penginapan: id,
          check_in_date: checkIn,
          check_out_date: checkOut,
          jumlah_kamar: jumlahKamar,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal booking');
      }

      if (data.payment?.redirect_url) {
        // Redirect ke Midtrans
        window.location.href = data.payment.redirect_url;
      } else {
        alert('Booking berhasil, tetapi tidak ada link pembayaran');
        console.log('Booking data:', data.booking);
      }
    } catch (e: any) {
      setError(e.message || 'Terjadi kesalahan saat booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Booking Penginapan</h1>

      {penginapan ? (
        <div className="space-y-3">
          <p className="font-semibold">{penginapan.nama}</p>
          <p>Rp {penginapan.hargaPerMalam?.toLocaleString()} / malam</p>

          <div>
            <label>Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label>Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label>Jumlah kamar</label>
            <input
              type="number"
              min={1}
              max={penginapan.jumlahKamarTersedia}
              value={jumlahKamar}
              onChange={(e) => setJumlahKamar(+e.target.value)}
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
