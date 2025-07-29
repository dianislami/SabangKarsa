import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Car, MapPin, Phone } from 'lucide-react';

interface RentalData {
  nama: string;
  hargaPerHari: string;
  jumlahUnit: string;
  jenis: string;
  no_telepon: string;
  alamat: string;
  foto: File | null;
}

interface RentalFormProps {
  token: string | null;
  user: {
    _id: string;
    name: string;
    email: string;
    no_hp: string;
    alamat: string;
    role: string;
  };
  setActiveForm: React.Dispatch<React.SetStateAction<'rental' | 'tourguide' | 'penginapan' | null>>;
}

export default function RentalForm({ token, user, setActiveForm }: RentalFormProps) {
  const [rentalData, setRentalData] = useState<RentalData>({
    nama: '',
    hargaPerHari: '',
    jumlahUnit: '',
    jenis: '',
    no_telepon: '',
    alamat: '',
    foto: null
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files && files[0]) {
      setRentalData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setRentalData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitRental = async () => {
    try {
      const form = new FormData();
      Object.entries(rentalData).forEach(([key, val]) => {
        if (val !== null) form.append(key, val as string | Blob);
      });
      form.append('penyedia', user._id); // auto set penyedia

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rentals`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      });
      const data = await res.json();
      console.log('Rental added:', data);

      setActiveForm(null);
      setRentalData({
        nama: '', hargaPerHari: '', jumlahUnit: '', jenis: '', no_telepon: '', alamat: '', foto: null
      });
      setPreview(null);
    } catch (e) {
      console.error('Error adding rental', e);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Tambah Rental Kendaraan</h2>
          <button
            onClick={() => setActiveForm(null)}
            className="text-white hover:text-blue-200 text-sm font-medium"
          >
            ← Kembali
          </button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nama Kendaraan *</label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="nama"
                placeholder="Toyota Avanza"
                value={rentalData.nama}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Jenis Kendaraan *</label>
            <select
              name="jenis"
              value={rentalData.jenis}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Pilih jenis</option>
              <option value="mobil">Mobil</option>
              <option value="motor">Motor</option>
              <option value="bus">Bus</option>
              <option value="sepeda">Sepeda</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Harga per Hari *</label>
            <input
              name="hargaPerHari"
              placeholder="350000"
              type="number"
              value={rentalData.hargaPerHari}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Jumlah Unit *</label>
            <input
              name="jumlahUnit"
              placeholder="5"
              type="number"
              value={rentalData.jumlahUnit}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">No. Telepon</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="no_telepon"
                placeholder="08123456789"
                value={rentalData.no_telepon}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Alamat</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="alamat"
                placeholder="Jl. Diponegoro No.123"
                value={rentalData.alamat}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Foto Kendaraan</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            {preview ? (
              <img src={preview} alt="Preview" className="mx-auto mb-2 max-h-48 object-contain rounded" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            )}
            <input
              type="file"
              name="foto"
              onChange={handleChange}
              className="hidden"
              id="rental-photo"
              accept="image/*"
            />
            <label htmlFor="rental-photo" className="cursor-pointer text-sm text-gray-600">
              {preview ? 'Ganti foto' : 'Klik untuk upload foto'}
            </label>
          </div>
        </div>
        <Button
          onClick={submitRental}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
        >
          Tambah Rental
        </Button>
      </div>
    </>
  );
}
