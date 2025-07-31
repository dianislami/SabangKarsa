import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Car, Phone, AlignLeft } from 'lucide-react';

interface RentalData {
  name: string;
  type: string;
  harga: string;
  deskripsi: string;
  gambar: File | null;
  no_telepon: string;
}

interface RentalFormProps {
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
  editData?: any;
}

export default function RentalForm({ token, user, setActiveForm, editData }: RentalFormProps) {
  const [rentalData, setRentalData] = useState<RentalData>({
    name: '',
    type: '',
    harga: '',
    deskripsi: '',
    gambar: null,
    no_telepon: user.no_hp || ''
  });
  const [preview, setPreview] = useState<string | null>(null);

  // Isi data saat edit
  useEffect(() => {
    if (editData) {
      setRentalData({
        name: editData.name || '',
        type: editData.type || '',
        harga: String(editData.harga || ''),
        deskripsi: editData.deskripsi || '',
        gambar: null,
        no_telepon: editData.no_telepon || user.no_hp || ''
      });
      setPreview(editData.gambar); // pakai url lama
    }
  }, [editData, user.no_hp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      form.append('name', rentalData.name);
      form.append('type', rentalData.type);
      form.append('harga', rentalData.harga);
      form.append('deskripsi', rentalData.deskripsi);
      if (rentalData.gambar) form.append('gambar', rentalData.gambar);
      form.append('penyedia', user.id);
      form.append('namaPenyedia', user.name);
      form.append('no_telepon', rentalData.no_telepon);

      const apiUrl = import.meta.env.VITE_API_URL;
      let res;
      if (editData) {
        // Update data (PUT)
        res = await fetch(`${apiUrl}/rental/${editData._id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: form
        });
      } else {
        // Tambah data baru (POST)
        res = await fetch(`${apiUrl}/rental`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: form
        });
      }

      const data = await res.json();
      console.log('Saved:', data);

      // Reset dan kembali
      setActiveForm();
      setRentalData({ name: '', type: '', harga: '', deskripsi: '', gambar: null, no_telepon: user.no_hp || '' });
      setPreview(null);
    } catch (e) {
      console.error('Error saving rental', e);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{editData ? 'Edit Rental Kendaraan' : 'Tambah Rental Kendaraan'}</h2>
          <button onClick={() => setActiveForm()} className="text-white hover:text-blue-200 text-sm font-medium">
            ← Kembali
          </button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithIcon icon={Car} label="Nama Kendaraan *" name="name" value={rentalData.name} onChange={handleChange} placeholder="Toyota Avanza" />
          <Select label="Jenis Kendaraan *" name="type" value={rentalData.type} onChange={handleChange} options={['mobil','motor','driver']} />
          <Input label="Harga per Hari *" name="harga" type="number" value={rentalData.harga} onChange={handleChange} placeholder="350000" />
          <InputWithIcon icon={Phone} label="No. Telepon *" name="no_telepon" value={rentalData.no_telepon} onChange={handleChange} placeholder="08123456789" />
        </div>
        <TextareaWithIcon icon={AlignLeft} label="Deskripsi Kendaraan" name="deskripsi" value={rentalData.deskripsi} onChange={handleChange} placeholder="Contoh: Kondisi bagus, AC dingin, dll." rows={3} />
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Foto Kendaraan</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            {preview ? (
              <img src={preview} alt="Preview" className="mx-auto mb-2 max-h-48 object-contain rounded" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            )}
            <input type="file" name="gambar" onChange={handleChange} className="hidden" id="rental-photo" accept="image/*" />
            <label htmlFor="rental-photo" className="cursor-pointer text-sm text-gray-600">
              {preview ? 'Ganti foto' : 'Klik untuk upload foto'}
            </label>
          </div>
        </div>
        <Button onClick={submitRental} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium">
          {editData ? 'Update Rental' : 'Tambah Rental'}
        </Button>
      </div>
    </>
  );
}

// Komponen kecil
function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input {...props} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    </div>
  );
}

function InputWithIcon({ label, icon: Icon, ...props }: { label: string; icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input {...props} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
    </div>
  );
}

function TextareaWithIcon({ label, icon: Icon, ...props }: { label: string; icon: React.ElementType } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <textarea {...props} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
    </div>
  );
}

function Select({ label, options, ...props }: { label: string; options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select {...props} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <option value="">Pilih jenis</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
      </select>
    </div>
  );
}
