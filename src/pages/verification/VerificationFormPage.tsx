import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Upload, FileText, User, AlertCircle, CheckCircle, X, Eye
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ThemeToggle } from '../../components/theme-toogle';
import { Footer } from '../../components/layouts/footer';
import type { VerificationRequest, DocumentType } from '../../types/verification';

const API_URL = import.meta.env.VITE_API_URL;

const documentTypes: DocumentType[] = [
  { id: 'ktp', label: 'KTP', description: 'Kartu Tanda Penduduk', required: true, maxSize: 10, acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'] },
  { id: 'npwp', label: 'NPWP', description: 'Nomor Pokok Wajib Pajak', required: true, maxSize: 10, acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'] },
  { id: 'dokumenBisnis', label: 'Dokumen Bisnis', description: 'Dokumen pendukung bisnis (SIUP, TDP, dll)', required: true, maxSize: 10, acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'] }
];

export function VerificationFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<VerificationRequest>>({
    fullName: '', phoneNumber: '', address: '',
    no_rekening: '', nama_rekening: '', documents: []
  });
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const user = typeof userData === 'object' && userData.user ? userData.user : userData;
    setFormData(prev => ({
      ...prev,
      fullName: user.name || '',
      phoneNumber: user.no_hp || user.phoneNumber || '',
      address: user.alamat || user.address || '',
      email: user.email || ''
    }));
  }, []);

  const handleInputChange = (field: keyof VerificationRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleFileUpload = useCallback((documentType: string, file: File) => {
    const docType = documentTypes.find(dt => dt.id === documentType);
    if (!docType) return;

    if (file.size > docType.maxSize * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [documentType]: `Ukuran file maksimal ${docType.maxSize}MB` }));
      return;
    }
    if (!docType.acceptedFormats.includes(file.type)) {
      setErrors(prev => ({ ...prev, [documentType]: 'Format file tidak didukung' }));
      return;
    }

    setUploadedFiles(prev => ({ ...prev, [documentType]: file }));
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => e.target?.result && setPreviewImages(prev => ({ ...prev, [documentType]: e.target!.result as string }));
      reader.readAsDataURL(file);
    }
    if (errors[documentType]) setErrors(prev => ({ ...prev, [documentType]: '' }));
  }, [errors]);

  const removeFile = (documentType: string) => {
    setUploadedFiles(prev => { const copy = { ...prev }; delete copy[documentType]; return copy; });
    setPreviewImages(prev => { const copy = { ...prev }; delete copy[documentType]; return copy; });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName?.trim()) newErrors.fullName = 'Nama lengkap harus diisi';
    if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = 'Nomor telepon harus diisi';
    if (!formData.no_rekening?.trim()) newErrors.no_rekening = 'Nomor rekening harus diisi';
    if (!formData.nama_rekening?.trim()) newErrors.nama_rekening = 'Nama rekening harus diisi';

    documentTypes.forEach(doc => {
      if (doc.required && !uploadedFiles[doc.id]) newErrors[doc.id] = `${doc.label} harus diunggah`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!localStorage.getItem('token')) {
      setErrors({ submit: 'Silakan login terlebih dahulu' });
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch(`${API_URL}/auth/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({
          name: formData.fullName, no_hp: formData.phoneNumber, alamat: formData.address
        })
      });

      const formDataToSend = new FormData();
      formDataToSend.append('ktp', uploadedFiles['ktp']);
      formDataToSend.append('npwp', uploadedFiles['npwp']);
      formDataToSend.append('dokumenBisnis', uploadedFiles['dokumenBisnis']);
      formDataToSend.append('no_rekening', formData.no_rekening || '');
      formDataToSend.append('nama_rekening', formData.nama_rekening || '');

      const res = await fetch(`${API_URL}/verifikasi`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formDataToSend
      });
      if (res.ok) navigate('/');
      else setErrors({ submit: 'Gagal mengirim permohonan verifikasi. Silakan coba lagi.' });
    } catch (e) {
      console.error('Error:', e);
      setErrors({ submit: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card dark:bg-card border-b border-border dark:border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mr-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground dark:text-foreground">
                  Ajukan Verifikasi Penjual
                </h1>
                <p className="text-muted-foreground dark:text-muted-foreground">
                  Lengkapi data dan dokumen untuk menjadi penjual terverifikasi
                </p>
              </div>
            </div>
            <ThemeToggle />
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ajukan Verifikasi Penjual</h1>
            <p className="text-gray-600 dark:text-gray-400">Lengkapi data & dokumen untuk verifikasi</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Personal Information */}
          <div className="bg-verification-overlay dark:bg-verification-overlay rounded-lg border border-verification-overlay-border dark:border-verification-overlay-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Personal Info */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg"><User className="w-5 h-5 text-blue-600 dark:text-blue-400" /></div>
              <div>
                <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
                  Informasi Pribadi
                </h2>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Data pribadi yang akan diverifikasi
                </p>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Informasi Pribadi</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Data pribadi yang akan diverifikasi</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-foreground mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={formData.fullName || ''}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-background dark:bg-background text-foreground dark:text-foreground"
                  placeholder="Masukkan nama lengkap sesuai KTP"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
                <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                <input value={formData.fullName || ''} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Nama lengkap" />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-foreground mb-2">
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber || ''}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-background dark:bg-background text-foreground dark:text-foreground"
                  placeholder="Masukkan nomor telepon"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
                <label className="block text-sm font-medium mb-2">Nomor Telepon *</label>
                <input value={formData.phoneNumber || ''} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Nomor telepon" />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground dark:text-foreground mb-2">
                  Alamat
                </label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-background dark:bg-background text-foreground dark:text-foreground"
                  placeholder="Masukkan alamat lengkap"
                />
                <label className="block text-sm font-medium mb-2">Alamat</label>
                <textarea value={formData.address || ''} onChange={(e) => handleInputChange('address', e.target.value)} rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Alamat lengkap" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nomor Rekening *</label>
                <input value={formData.no_rekening || ''} onChange={(e) => handleInputChange('no_rekening', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Nomor rekening" />
                {errors.no_rekening && <p className="text-red-500 text-sm mt-1">{errors.no_rekening}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nama Rekening *</label>
                <input value={formData.nama_rekening || ''} onChange={(e) => handleInputChange('nama_rekening', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Nama sesuai buku tabungan" />
                {errors.nama_rekening && <p className="text-red-500 text-sm mt-1">{errors.nama_rekening}</p>}
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-verification-overlay dark:bg-verification-overlay rounded-lg border border-verification-overlay-border dark:border-verification-overlay-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
          {/* Dokumen Upload */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg"><FileText className="w-5 h-5 text-green-600 dark:text-green-400" /></div>
              <div>
                <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
                  Dokumen Verifikasi
                </h2>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Unggah dokumen yang diperlukan untuk verifikasi
                </p>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Dokumen Verifikasi</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unggah dokumen pendukung</p>
              </div>
            </div>

            <div className="space-y-6">
              {documentTypes.map((docType) => (
                <div key={docType.id} className="border border-border dark:border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-foreground dark:text-foreground">
                        {docType.label} {docType.required && <span className="text-red-500">*</span>}
                      </h3>
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                        {docType.description}
                      </p>
                    </div>
                  </div>

                  {uploadedFiles[docType.id] ? (
                    <div className="flex items-center justify-between p-3 bg-verification-overlay-success dark:bg-verification-overlay-success border border-verification-overlay-success-border dark:border-verification-overlay-success-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <div>
                          <p className="font-medium text-emerald-800 dark:text-emerald-300">
                            {uploadedFiles[docType.id].name}
                          </p>
                          <p className="text-sm text-emerald-600 dark:text-emerald-400">
                            {(uploadedFiles[docType.id].size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {previewImages[docType.id] && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(previewImages[docType.id], '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(docType.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-border dark:border-border rounded-lg p-6 text-center hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors cursor-pointer"
                      onClick={() => document.getElementById(`file-${docType.id}`)?.click()}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground dark:text-muted-foreground mb-1">
                        Klik untuk unggah {docType.label}
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                        Maksimal {docType.maxSize}MB, format: JPG, PNG, PDF
                      </p>
                      <input
                        id={`file-${docType.id}`}
                        type="file"
                        accept={docType.acceptedFormats.join(',')}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(docType.id, file);
                        }}
                        className="hidden"
                      />
                    </div>
                  )}

                  {errors[docType.id] && (
                    <p className="text-red-500 text-sm mt-2">{errors[docType.id]}</p>
                  )}
                </div>
              ))}
            </div>
            {documentTypes.map(doc => (
              <div key={doc.id}>
                <label className="block font-medium">{doc.label} {doc.required && <span className="text-red-500">*</span>}</label>
                {uploadedFiles[doc.id] ? (
                  <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600 dark:text-green-400" /> <span>{uploadedFiles[doc.id].name}</span>
                    </div>
                    <div className="flex gap-2">
                      {previewImages[doc.id] && <Button size="sm" variant="ghost" onClick={() => window.open(previewImages[doc.id], '_blank')}><Eye className="w-4 h-4" /></Button>}
                      <Button size="sm" variant="ghost" onClick={() => removeFile(doc.id)}><X className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => document.getElementById(`file-${doc.id}`)?.click()} className="border-2 border-dashed rounded p-4 text-center hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer">
                    <Upload className="w-6 h-6 mx-auto text-gray-400" />
                    <p className="text-sm">Klik untuk unggah</p>
                    <input type="file" id={`file-${doc.id}`} accept={doc.acceptedFormats.join(',')} onChange={(e) => e.target.files && handleFileUpload(doc.id, e.target.files[0])} className="hidden" />
                  </div>
                )}
                {errors[doc.id] && <p className="text-red-500 text-sm">{errors[doc.id]}</p>}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? 'Mengirim...' : 'Ajukan Verifikasi'}
            </Button>
          {/* Submit */}
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 text-white">{isSubmitting ? 'Mengirim...' : 'Ajukan Verifikasi'}</Button>
          </div>

          {errors.submit && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded">
              <AlertCircle className="inline w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
              <span className="text-red-600 dark:text-red-400">{errors.submit}</span>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
