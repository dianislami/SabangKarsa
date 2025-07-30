import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface TourGuide {
  _id: string;
  name: string;
  harga: number;
  foto: string;
  wilayah: string;
}

export default function BookingTourguidePage() {
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
    return <div className="text-center mt-10 text-black">Memuat data tour guide...</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-10 text-black">
      <h2 className="text-2xl font-semibold mb-4">Booking Tour Guide</h2>

      <div className="flex items-center mb-4">
        <img src={tourGuide.foto} alt={tourGuide.name} className="w-16 h-16 rounded-full mr-3 object-cover" />
        <div>
          <p className="font-semibold">{tourGuide.name}</p>
          <p className="text-sm">{tourGuide.wilayah}</p>
          <p className="text-sm">Rp {tourGuide.harga.toLocaleString()} / hari</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block mb-1 font-medium">Tanggal Mulai</label>
          <input
            type="date"
            className="border w-full rounded-lg px-3 py-2 text-black"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tanggal Selesai</label>
          <input
            type="date"
            className="border w-full rounded-lg px-3 py-2 text-black"
            value={tanggalSelesai}
            onChange={(e) => setTanggalSelesai(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Lokasi Jemput</label>
          <input
            type="text"
            className="border w-full rounded-lg px-3 py-2 text-black"
            value={lokasiJemput}
            onChange={(e) => setLokasiJemput(e.target.value)}
            placeholder="Contoh: Bandara Sabang"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="font-medium">Total Harga:</p>
        <p className="text-lg">{totalHarga !== null ? `Rp ${totalHarga.toLocaleString()}` : "-"}</p>
      </div>

      <button
        onClick={handleBooking}
        disabled={loading}
        className="mt-5 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
      >
        {loading ? "Memproses..." : "Booking Sekarang"}
      </button>
    </div>
  );
}
