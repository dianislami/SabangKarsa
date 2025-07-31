import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Phone, User, MapPin } from 'lucide-react';

interface TourGuideData {
  name: string;
  no_hp: string;
  instagram: string;
  kataKata: string;
  wilayah: string;
  harga: string;
  foto: File | null;
}

interface TourGuideFormProps {
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    no_hp: string;
    alamat: string;
    role: string;
  };
  setActiveForm: () => void;
}

export default function TourGuideForm({ token, user, setActiveForm }: TourGuideFormProps) {
  const [tourGuideData, setTourGuideData] = useState<TourGuideData>({
    name: '',
    no_hp: '',
    instagram: '',
    kataKata: '',
    wilayah: '',
    harga: '',
    foto: null
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files && files[0]) {
      setTourGuideData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setTourGuideData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitTourGuide = async () => {
    try {
      const form = new FormData();
      Object.entries(tourGuideData).forEach(([key, val]) => {
        if (val !== null) form.append(key, val as string | Blob);
      });
      form.append('penyedia', user.id); // auto-set penyedia

      const res = await fetch(`${import.meta.env.VITE_API_URL}/tourguides`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      });
      const data = await res.json();
      console.log('Tour guide added:', data);

      setActiveForm();
      setTourGuideData({
        name: '', no_hp: '', instagram: '', kataKata: '', wilayah: '', harga: '', foto: null
      });
      setPreview(null);
    } catch (e) {
      console.error('Error adding tour guide', e);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Tambah Tour Guide</h2>
          <button
            onClick={() => setActiveForm()}
            className="text-white hover:text-emerald-200 text-sm font-medium"
          >
            ← Kembali
          </button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="form-label text-sm">Nama Tour Guide *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 form-icon" />
              <input
                name="name"
                placeholder="John Doe"
                value={tourGuideData.name}
                onChange={handleChange}
                className="form-input-with-icon"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="form-label text-sm">No. HP *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 form-icon" />
              <input
                name="no_hp"
                placeholder="08123456789"
                value={tourGuideData.no_hp}
                onChange={handleChange}
                className="form-input-with-icon"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="form-label text-sm">Instagram</label>
            <input
              name="instagram"
              placeholder="@johndoe"
              value={tourGuideData.instagram}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <label className="form-label text-sm">Wilayah</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 form-icon" />
              <input
                name="wilayah"
                placeholder="Sabang, Aceh"
                value={tourGuideData.wilayah}
                onChange={handleChange}
                className="form-input-with-icon"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="form-label text-sm">Harga per Hari *</label>
            <input
              name="harga"
              placeholder="500000"
              type="number"
              value={tourGuideData.harga}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="form-label text-sm">Kata-kata/Bio *</label>
          <textarea
            name="kataKata"
            placeholder="Ceritakan pengalaman Anda sebagai tour guide..."
            rows={4}
            value={tourGuideData.kataKata}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="space-y-2">
          <label className="form-label text-sm">Foto Profil</label>
          <div className="form-upload-area hover:border-green-400 transition-colors">
            {preview ? (
              <img src={preview} alt="Preview" className="mx-auto mb-2 max-h-48 object-contain rounded" />
            ) : (
              <Upload className="w-8 h-8 form-icon mx-auto mb-2" />
            )}
            <input
              type="file"
              name="foto"
              onChange={handleChange}
              className="hidden"
              id="guide-photo"
              accept="image/*"
            />
            <label htmlFor="guide-photo" className="cursor-pointer text-sm text-admin">
              {preview ? 'Ganti foto' : 'Klik untuk upload foto'}
            </label>
          </div>
        </div>
        <Button
          onClick={submitTourGuide}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-medium"
        >
          Tambah Tour Guide
        </Button>
      </div>
    </>
  );
}
