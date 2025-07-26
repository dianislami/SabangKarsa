import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function VerificationSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="mb-6"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold text-foreground mb-4"
        >
          Permohonan Berhasil Dikirim!
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4 mb-8"
        >
          <p className="text-muted-foreground">
            Terima kasih telah mengajukan verifikasi penjual. Permohonan Anda telah berhasil dikirim dan sedang dalam proses review.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Status: Sedang Diproses</span>
            </div>
            <p className="text-sm text-blue-600">
              Tim kami akan melakukan review dalam 1-3 hari kerja. Anda akan mendapat notifikasi melalui email dan WhatsApp.
            </p>
          </div>

          <div className="text-left bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Langkah Selanjutnya:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Pastikan nomor telepon dan email Anda aktif</li>
              <li>• Tunggu konfirmasi dari tim JakSabang</li>
              <li>• Jika ada dokumen yang perlu diperbaiki, Anda akan dihubungi</li>
              <li>• Setelah disetujui, akun Anda akan diupgrade menjadi penjual</li>
            </ul>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Ke Beranda
          </Button>
        </motion.div>

        {/* Auto redirect notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-xs text-muted-foreground mt-6"
        >
          Anda akan dialihkan ke beranda dalam 10 detik
        </motion.p>
      </motion.div>
    </div>
  );
}
