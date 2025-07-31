import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Phone, User, MapPin, Mail } from 'lucide-react';

interface PenginapanData {
  nama: string;
  lokasi: string;
  deskripsi: string;
  tipePeningapan: string;
  hargaPerMalam: string;
  jumlahKamarTersedia: string;
  namaPenyedia: string;
  gambar: File | null;
  alamat: string;
  no_telepon: string;
  email: string;
  fasilitas: string;
  kebijakan: string;
  check_in_time: string;
  check_out_time: string;
  lokasi_maps: string;
}

interface PenginapanFormProps {
  token: string | null;
  user: { id: string; name: string; email: string; no_hp: string; alamat: string; role: string; };
  setActiveForm: () => void;
  editData?: any;
}

export default function PenginapanForm({ token, user, setActiveForm, editData }: PenginapanFormProps) {
  const [penginapanData, setPenginapanData] = useState<PenginapanData>({
    nama: '',
    lokasi: '',
    deskripsi: '',
    tipePeningapan: '',
    hargaPerMalam: '',
    jumlahKamarTersedia: '',
    namaPenyedia: user.name || '',
    gambar: null,
    alamat: '',
    no_telepon: '',
    email: '',
    fasilitas: '',
    kebijakan: '',
    check_in_time: '',
    check_out_time: '',
    lokasi_maps: ''
  });
  const [preview, setPreview] = useState<string | null>(null);

  // Auto-fill data saat edit
  useEffect(() => {
    if (editData) {
      setPenginapanData({
        nama: editData.nama || '',
        lokasi: editData.lokasi || '',
        deskripsi: editData.deskripsi || '',
        tipePeningapan: editData.tipePeningapan || '',
        hargaPerMalam: String(editData.hargaPerMalam || ''),
        jumlahKamarTersedia: String(editData.jumlahKamarTersedia || ''),
        namaPenyedia: editData.namaPenyedia || user.name || '',
        gambar: null, // file tidak ada
        alamat: editData.alamat || '',
        no_telepon: editData.no_telepon || '',
        email: editData.email || '',
        fasilitas: Array.isArray(editData.fasilitas) ? editData.fasilitas.join(', ') : editData.fasilitas || '',
        kebijakan: editData.kebijakan || '',
        check_in_time: editData.check_in_time || '',
        check_out_time: editData.check_out_time || '',
        lokasi_maps: editData.lokasi_maps || ''
      });
      setPreview(editData.gambar); // pakai url lama
    }
  }, [editData, user.name]);

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files && files[0]) {
      setPenginapanData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setPenginapanData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const submitPenginapan = async () => {
    try {
      const form = new FormData();
      Object.entries(penginapanData).forEach(([key, val]) => {
        if (val !== null) form.append(key, val as string | Blob);
      });
      form.append('penyedia', user.id);

      const apiUrl = import.meta.env.VITE_API_URL;
      let res;
      if (editData) {
        res = await fetch(`${apiUrl}/penginapan/${editData._id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: form
        });
      } else {
        res = await fetch(`${apiUrl}/penginapan`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: form
        });
      }
      const data = await res.json();
      console.log('Saved:', data);

      // Reset & kembali
      setActiveForm();
      setPenginapanData({
        nama: '', lokasi: '', deskripsi: '', tipePeningapan: '', hargaPerMalam: '',
        jumlahKamarTersedia: '', namaPenyedia: user.name || '', gambar: null,
        alamat: '', no_telepon: '', email: '', fasilitas: '', kebijakan: '',
        check_in_time: '', check_out_time: '', lokasi_maps: ''
      });
      setPreview(null);
    } catch (e) {
      console.error('Error saving penginapan', e);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{editData ? 'Edit Penginapan' : 'Tambah Penginapan'}</h2>
          <button onClick={() => setActiveForm()} className="text-white hover:text-purple-200 text-sm font-medium">← Kembali</button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Nama Penginapan *" name="nama" value={penginapanData.nama} onChange={handleChange} placeholder="Hotel Sabang View" />
          <InputWithIcon icon={MapPin} label="Lokasi *" name="lokasi" value={penginapanData.lokasi} onChange={handleChange} placeholder="Sabang, Aceh" />
          <Select label="Tipe Penginapan *" name="tipePeningapan" value={penginapanData.tipePeningapan} onChange={handleChange}
            options={['Hotel','Villa','Guest House','Resort','Homestay','Boutique Hotel','Inn','Motel']} />
          <Input label="Harga per Malam *" name="hargaPerMalam" value={penginapanData.hargaPerMalam} onChange={handleChange} placeholder="300000" type="number" />
          <Input label="Jumlah Kamar *" name="jumlahKamarTersedia" value={penginapanData.jumlahKamarTersedia} onChange={handleChange} placeholder="10" type="number" />
          <InputWithIcon icon={User} label="Nama Penyedia" name="namaPenyedia" value={penginapanData.namaPenyedia} onChange={handleChange} placeholder="Nama" />
          <InputWithIcon icon={Phone} label="No. Telepon" name="no_telepon" value={penginapanData.no_telepon} onChange={handleChange} placeholder="08123456789" />
          <InputWithIcon icon={Mail} label="Email" name="email" value={penginapanData.email} onChange={handleChange} placeholder="email@example.com" />
          <Input label="Alamat" name="alamat" value={penginapanData.alamat} onChange={handleChange} placeholder="Jl. Diponegoro No.123" />
          <Input label="Check-in Time" name="check_in_time" value={penginapanData.check_in_time} onChange={handleChange} placeholder="14:00" />
          <Input label="Check-out Time" name="check_out_time" value={penginapanData.check_out_time} onChange={handleChange} placeholder="12:00" />
        </div>
        <Textarea label="Deskripsi" name="deskripsi" value={penginapanData.deskripsi} onChange={handleChange} placeholder="Deskripsikan penginapan Anda..." rows={4} />
        <Input label="Fasilitas" name="fasilitas" value={penginapanData.fasilitas} onChange={handleChange} placeholder="WiFi, AC, TV..." />
        <Textarea label="Kebijakan" name="kebijakan" value={penginapanData.kebijakan} onChange={handleChange} placeholder="Aturan tamu, dll..." rows={3} />
        <Input label="Link Google Maps" name="lokasi_maps" value={penginapanData.lokasi_maps} onChange={handleChange} placeholder="https://maps.google.com/..." />
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Foto Penginapan</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            {preview ? (
              <img src={preview} alt="Preview" className="mx-auto mb-2 max-h-48 object-contain rounded" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            )}
            <input type="file" name="gambar" onChange={handleChange} className="hidden" id="penginapan-image" accept="image/*" />
            <label htmlFor="penginapan-image" className="cursor-pointer text-sm text-gray-600">
              {preview ? 'Ganti foto' : 'Klik untuk upload foto'}
            </label>
          </div>
        </div>
        <Button onClick={submitPenginapan} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-medium">
          {editData ? 'Update Penginapan' : 'Tambah Penginapan'}
        </Button>
      </div>
    </>
  );
}



function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input {...props} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
    </div>
  );
}

function InputWithIcon({ label, icon: Icon, ...props }: { label: string; icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input {...props} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
      </div>
    </div>
  );
}

function Textarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea {...props} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
    </div>
  );
}

function Select({ label, options, ...props }: { label: string; options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select {...props} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
        <option value="">Pilih tipe penginapan</option>
        {options.map((opt) => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
      </select>
    </div>
  );
}
