import React from 'react';
import './index.css';

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow h-screen p-6 sticky top-0 hidden md:block">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">🧭 Dashboard</h1>
        <nav className="space-y-4">
          <a href="#" className="block text-blue-600 font-semibold">Home</a>
          <a href="#" className="block hover:text-blue-600">Statistik</a>
          <a href="#" className="block hover:text-blue-600">Pengguna</a>
          <a href="#" className="block hover:text-blue-600">Pengaturan</a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white p-4 shadow flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold">Selamat Datang</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Aidil</span>
            <img
              src="https://ui-avatars.com/api/?name=Aidil&background=random"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow">Statistik 1</div>
            <div className="bg-white p-4 rounded-xl shadow">Statistik 2</div>
            <div className="bg-white p-4 rounded-xl shadow">Statistik 3</div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Aktivitas Terbaru</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Login oleh user123</li>
              <li>Mengunggah dokumen oleh admin</li>
              <li>Logout user456</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
