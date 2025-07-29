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

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  no_hp: string;
  alamat: string;
  role: string;
}

export default function DashboardPage() {
  const token = localStorage.getItem('token');
  const [activeForm, setActiveForm] = useState<'rental' | 'tourguide' | 'penginapan' | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (e) {
        console.error('Failed to fetch user:', e);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUser();
    else setLoading(false);
  }, [token]);

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

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!activeForm ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard option={option} onClick={() => setActiveForm(option.id)} />
              </motion.div>
            ))}
          </div>
        ) : (
          user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {activeForm === 'rental' && (
                <RentalForm token={token} user={user} setActiveForm={setActiveForm} />
              )}
              {activeForm === 'tourguide' && (
                <TourGuideForm token={token} user={user} setActiveForm={setActiveForm} />
              )}
              {activeForm === 'penginapan' && (
                <PenginapanForm token={token} user={user} setActiveForm={setActiveForm} />
              )}
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
