import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/dashboardseller/Header';
import ServiceCard from '../../../components/dashboardseller/ServiceCard';
import RentalForm from '../../../components/dashboardseller/RentalForm';
import TourGuideForm from '../../../components/dashboardseller/TourGuideForm';
import PenginapanForm from '../../../components/dashboardseller/PenginapanForm';
import { Car, Users, Home } from 'lucide-react';

interface FormOption {
  id: 'rental' | 'tourguide' | 'penginapan';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function DashboardPage() {
  const token = localStorage.getItem('token');
  const [activeForm, setActiveForm] = useState<'rental' | 'tourguide' | 'penginapan' | null>(null);
  const [editData, setEditData] = useState<any>(null); // data yg diedit

  const [user, setUser] = useState<{
    id: string; name: string; role: string; email: string; no_hp: string; alamat: string;
  } | null>(null);

  const [rentalList, setRentalList] = useState<any[]>([]);
  const [penginapanList, setPenginapanList] = useState<any[]>([]);
  const [tourguideList, setTourguideList] = useState<any[]>([]);

  const formOptions: FormOption[] = [
    {
      id: 'rental',
      title: 'Rental Kendaraan',
      description: 'Tambahkan layanan rental kendaraan',
      icon: Car,
      color: 'from-blue-600 to-blue-700'
    },
    {
      id: 'tourguide',
      title: 'Tour Guide',
      description: 'Tambahkan layanan tour guide',
      icon: Users,
      color: 'from-green-600 to-green-700'
    },
    {
      id: 'penginapan',
      title: 'Penginapan',
      description: 'Tambahkan layanan penginapan',
      icon: Home,
      color: 'from-purple-600 to-purple-700'
    }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed?.user || parsed);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchAll = async () => {
      try {
        const [rentalRes, penginapanRes, tourguideRes] = await Promise.all([
          fetch(`${API_URL}/rental`).then(r => r.json()),
          fetch(`${API_URL}/penginapan`).then(r => r.json()),
          fetch(`${API_URL}/tourguides`).then(r => r.json()),
        ]);
        setRentalList(rentalRes);
        setPenginapanList(penginapanRes);
        setTourguideList(tourguideRes);
      } catch (e) {
        console.error('Failed to fetch data', e);
      }
    };
    fetchAll();
  }, [token]);

  // fungsi untuk edit (set data & buka form)
  const handleEdit = (type: 'rental' | 'penginapan', data: any) => {
    setEditData(data);
    setActiveForm(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {!activeForm && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {formOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard 
                    option={option} 
                    onClick={() => { setActiveForm(option.id); setEditData(null); }} 
                  />
                </motion.div>
              ))}
            </div>

            {/* === Layanan Saya === */}
            {user && (
              <div className="space-y-6">
                {/* Rental */}
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-black">Rental Saya</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rentalList.filter(item => (item.penyedia?._id || item.penyedia) === user.id).map(item => (
                      <div key={item._id} className="bg-white p-4 rounded shadow">
                        <img src={item.gambar || ''} alt="" />
                        <h3 className="font-semibold text-black">{item.name}</h3>
                        <p className="text-sm text-black">{item.deskripsi}</p>
                        <button
                          className="mt-2 text-blue-600 text-sm"
                          onClick={() => handleEdit('rental', item)}
                        >Edit</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Penginapan */}
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-black">Penginapan Saya</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {penginapanList.filter(item => (item.penyedia?._id || item.penyedia) === user.id).map(item => (
                      <div key={item._id} className="bg-white p-4 rounded shadow">
                        <img src={item.gambar || ''} alt="" />
                        <h3 className="font-semibold text-black">{item.nama}</h3>
                        <p className="text-sm text-black">{item.deskripsi}</p>
                        <button
                          className="mt-2 text-blue-600 text-sm"
                          onClick={() => handleEdit('penginapan', item)}
                        >Edit</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tourguide */}
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-black">Tour Guide Saya</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {tourguideList.filter(item => (item.penyedia?._id || item.penyedia) === user.id).map(item => (
                      <div key={item._id} className="bg-white p-4 rounded shadow">
                        <img src={item.foto || ''} alt="" />
                        <h3 className="font-semibold text-black">{item.name}</h3>
                        <p className="text-sm text-black">{item.kataKata}</p>
                        {/* tourguide hanya GET, tidak ada tombol edit */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* === Form Tambah / Edit === */}
        {activeForm && user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {activeForm === 'rental' && (
              <RentalForm token={token} user={user} setActiveForm={setActiveForm} editData={editData} />
            )}
            {activeForm === 'tourguide' && (
              <TourGuideForm token={token} user={user} setActiveForm={setActiveForm} />
            )}
            {activeForm === 'penginapan' && (
              <PenginapanForm token={token} user={user} setActiveForm={setActiveForm} editData={editData} />
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}
