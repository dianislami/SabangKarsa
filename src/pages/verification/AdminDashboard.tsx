import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Eye, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

type Verifikasi = {
  _id: string;
  npwp: string;
  ktp: string;
  dokumenBisnis: string;
  status: 'pending' | 'approved' | 'rejected';
  catatan?: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  no_hp?: string;
  alamat?: string;
  verifikasi?: Verifikasi;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedVerifikasi, setSelectedVerifikasi] = useState<Verifikasi | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (!res.ok) {
        if (res.status === 403) throw new Error('Hanya admin yang boleh mengakses');
        else throw new Error('Gagal memuat data pengguna');
      }
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserRole = async (userId: string, newRole: string) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (!res.ok) {
        if (res.status === 400) throw new Error('Role tidak valid');
        if (res.status === 404) throw new Error('User tidak ditemukan');
        throw new Error('Gagal mengupdate role');
      }
      setSuccess('Role berhasil diupdate');
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    }
  };

  const updateVerifikasiStatus = async (verifikasiId: string, newStatus: 'approved' | 'rejected') => {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_URL}/admin/verifikasi/${verifikasiId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Gagal memperbarui status verifikasi');
      setSuccess('Status verifikasi berhasil diperbarui');
      setSelectedVerifikasi(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

      {loading && <p>Loading...</p>}
      {error && (
        <div className="flex items-center gap-2 text-red-600 mb-3">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 text-green-600 mb-3">
          <CheckCircle className="w-5 h-5" /> {success}
        </div>
      )}

      {!loading && users.length === 0 && <p>Tidak ada user ditemukan.</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">No HP</th>
              <th className="p-2 border">Alamat</th>
              <th className="p-2 border">Verifikasi</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{user.no_hp || '-'}</td>
                <td className="p-2 border">{user.alamat || '-'}</td>
                <td className="p-2 border">
                  {user.verifikasi
                    ? user.verifikasi.status === 'pending'
                      ? '⏳ Pending'
                      : user.verifikasi.status === 'approved'
                        ? '✅ Approved'
                        : '❌ Rejected'
                    : 'Belum mengajukan'}
                  {user.verifikasi && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedVerifikasi(user.verifikasi!)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                </td>
                <td className="p-2 border flex flex-wrap gap-1">
                  <Button size="sm" onClick={() => updateUserRole(user._id, 'buyer')}>Set Buyer</Button>
                  <Button size="sm" onClick={() => updateUserRole(user._id, 'seller')}>Set Seller</Button>
                  <Button size="sm" onClick={() => updateUserRole(user._id, 'admin')}>Set Admin</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedVerifikasi && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedVerifikasi(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4">Detail Dokumen Verifikasi</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Status:</span> {selectedVerifikasi.status}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">KTP:</span>
                <a href={`${API_URL}/${selectedVerifikasi.ktp}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lihat</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">NPWP:</span>
                <a href={`${API_URL}/${selectedVerifikasi.npwp}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lihat</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Dokumen Bisnis:</span>
                <a href={`${API_URL}/${selectedVerifikasi.dokumenBisnis}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lihat</a>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={() => updateVerifikasiStatus(selectedVerifikasi._id, 'approved')}>
                Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => updateVerifikasiStatus(selectedVerifikasi._id, 'rejected')}>
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
