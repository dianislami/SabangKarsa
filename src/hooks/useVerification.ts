import { useState, useEffect } from 'react';
import type { VerificationRequest, User } from '../types/verification';

export function useVerification() {
  const [verificationStatus, setVerificationStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');
  const [currentRequest, setCurrentRequest] = useState<VerificationRequest | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({
          ...parsedUser,
          role: parsedUser.role || 'buyer', // Default to buyer if no role
          verificationStatus: parsedUser.verificationStatus || 'none'
        });
        setVerificationStatus(parsedUser.verificationStatus || 'none');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const submitVerificationRequest = async (requestData: Partial<VerificationRequest>): Promise<boolean> => {
    try {
      // Simulate API call
      const request: VerificationRequest = {
        _id: `req_${Date.now()}`,
        user: user?.id || 'user_id',
        npwp: requestData.npwp || '',
        ktp: requestData.ktp || '',
        dokumenBisnis: requestData.dokumenBisnis || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Keep backward compatibility fields if provided
        id: requestData.id || `req_${Date.now()}`,
        userId: requestData.userId || user?.id || 'user_id',
        fullName: requestData.fullName || '',
        nik: requestData.nik || '',
        phoneNumber: requestData.phoneNumber || '',
        address: requestData.address || '',
        businessType: requestData.businessType || '',
        businessDescription: requestData.businessDescription || '',
        documents: requestData.documents || [],
        submittedAt: new Date(),
      };

      // In a real app, this would be an API call
      // For now, we'll just simulate the submission
      setCurrentRequest(request);
      setVerificationStatus('pending');

      // Update user data in localStorage
      if (user) {
        const updatedUser: User = {
          ...user,
          verificationStatus: 'pending' as const,
          verificationRequestId: request._id || request.id
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      return true;
    } catch (error) {
      console.error('Error submitting verification request:', error);
      return false;
    }
  };

  const canApplyForVerification = (): boolean => {
    return user?.role === 'buyer' && verificationStatus === 'none';
  };

  const getVerificationStatusMessage = (): string => {
    switch (verificationStatus) {
      case 'pending':
        return 'Permohonan verifikasi Anda sedang diproses';
      case 'approved':
        return 'Selamat! Verifikasi Anda telah disetujui';
      case 'rejected':
        return 'Permohonan verifikasi ditolak. Silakan ajukan ulang';
      default:
        return 'Anda belum mengajukan verifikasi penjual';
    }
  };

  return {
    user,
    verificationStatus,
    currentRequest,
    submitVerificationRequest,
    canApplyForVerification,
    getVerificationStatusMessage,
  };
}
