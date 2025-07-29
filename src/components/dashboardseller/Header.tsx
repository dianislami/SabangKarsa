import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white shadow-sm border-b">
      <button onClick={() => navigate(-1)} className='text-gray-600 hover:text-gray-900'>back</button>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Seller</h1>
          <p className="text-gray-600 mt-2">Kelola layanan wisata Anda dengan mudah</p>
        </motion.div>
      </div>
    </div>
  );
}