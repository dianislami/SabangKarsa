import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [data, setData] = useState<any>(null);
  const API_URL = import.meta.env.VITE_API_URL; 
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
    no_hp: "",
    alamat: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      setData(result);

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        console.log("Token dan user berhasil disimpan di localStorage");

        // ✅ redirect ke halaman lain
        navigate('/dashboard'); // ganti sesuai rute kamu
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mendaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <input
          type="text"
          name="no_hp"
          placeholder="No HP"
          value={form.no_hp}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="alamat"
          placeholder="Alamat"
          value={form.alamat}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 w-full">
          {loading ? "Loading..." : "Register"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {data && (
        <pre className="bg-gray-100 p-2 mt-4">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}