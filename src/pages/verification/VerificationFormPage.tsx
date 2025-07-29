import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  FileText,
  User,
  AlertCircle,
  CheckCircle,
  X,
  Eye
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import type { VerificationRequest, DocumentType } from '../../types/verification';

const API_URL = import.meta.env.VITE_API_URL;

const documentTypes: DocumentType[] = [
  {
    id: 'ktp',
    label: 'KTP',
    description: 'Kartu Tanda Penduduk',
    required: true,
    maxSize: 10,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
  },
  {
    id: 'npwp',
    label: 'NPWP',
    description: 'Nomor Pokok Wajib Pajak',
    required: true,
    maxSize: 10,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
  },
  {
    id: 'dokumenBisnis',
    label: 'Dokumen Bisnis',
    description: 'Dokumen pendukung bisnis (SIUP, TDP, dll)',
    required: true,
    maxSize: 10,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
  }
];

export function VerificationFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<VerificationRequest>>({
    fullName: '',
    phoneNumber: '',
    address: '',
    documents: []
  });
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Use user data from localStorage to prefill form
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

  const handleInputChange = (
    field: keyof VerificationRequest,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = useCallback((
    documentType: string,
    file: File
  ) => {
    const docType = documentTypes.find(dt => dt.id === documentType);
    if (!docType) return;

    if (file.size > docType.maxSize * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [documentType]: `Ukuran file maksimal ${docType.maxSize}MB`
      }));
      return;
    }

    if (!docType.acceptedFormats.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [documentType]: 'Format file tidak didukung'
      }));
      return;
    }

    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: file
    }));

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImages(prev => ({
            ...prev,
            [documentType]: e.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }

    if (errors[documentType]) {
      setErrors(prev => ({
        ...prev,
        [documentType]: ''
      }));
    }
  }, [errors]);

  const removeFile = (documentType: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[documentType];
      return newFiles;
    });

    setPreviewImages(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[documentType];
      return newPreviews;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi';
    }

    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Nomor telepon harus diisi';
    }

    documentTypes.forEach(docType => {
      if (docType.required && !uploadedFiles[docType.id]) {
        newErrors[docType.id] = `${docType.label} harus diunggah`;
      }
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
      // Update user profile
      const updateResponse = await fetch(`${API_URL}/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: formData.fullName,
          no_hp: formData.phoneNumber,
          alamat: formData.address
          
        })
      });

      if (!updateResponse.ok) {
        let errorMessage = 'Gagal memperbarui data pengguna';
        if (updateResponse.status === 500) errorMessage = 'Terjadi kesalahan server saat memperbarui data';
        throw new Error(errorMessage);
      }

      // Submit verification documents
      const formDataToSend = new FormData();
      formDataToSend.append('ktp', uploadedFiles['ktp']);
      formDataToSend.append('npwp', uploadedFiles['npwp']);
      formDataToSend.append('dokumenBisnis', uploadedFiles['dokumenBisnis']);

      const verificationResponse = await fetch(`${API_URL}/verifikasi`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      if (verificationResponse.ok) {
        navigate('/');
      } else {
        setErrors({ submit: 'Gagal mengirim permohonan verifikasi. Silakan coba lagi.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ajukan Verifikasi Penjual
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Lengkapi data dan dokumen untuk menjadi penjual terverifikasi
              </p>
            </div>
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
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Informasi Pribadi
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Data pribadi yang akan diverifikasi
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={formData.fullName || ''}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="Masukkan nama lengkap"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber || ''}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="Masukkan nomor telepon"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Alamat
                </label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Dokumen Verifikasi
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Unggah dokumen yang diperlukan untuk verifikasi
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {documentTypes.map((docType) => (
                <div key={docType.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {docType.label} {docType.required && <span className="text-red-500">*</span>}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {docType.description}
                      </p>
                    </div>
                  </div>

                  {uploadedFiles[docType.id] ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="font-medium text-green-800 dark:text-green-300">
                            {uploadedFiles[docType.id].name}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
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
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() => document.getElementById(`file-${docType.id}`)?.click()}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        Klik untuk unggah {docType.label}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
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
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? 'Mengirim...' : 'Ajukan Verifikasi'}
            </Button>
            {errors.auth && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
              >
                Coba Lagi
              </Button>
            )}
          </div>

          {errors.submit && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="font-medium text-red-800 dark:text-red-300">Error</span>
              </div>
              <p className="text-red-600 dark:text-red-400 mt-1">{errors.submit}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}