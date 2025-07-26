import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from '../../../utils/axiosInstance';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';

interface Role {
  id: number;
  name: string;
}

export default function FormEditUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Ambil data user dan roles
  useEffect(() => {
    axios.get(`/api/users/${id}`).then(res => {
      const user = res.data;
      setName(user.name);
      setEmail(user.email);
      setRole(user.role); // "kasir", "admin", dst
    });

    axios.get('/api/roles').then(res => setRoles(res.data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        name,
        email,
        role,
      };

      if (password) payload.password = password; // opsional

      await axios.put(`/api/users/update/${id}`, payload);
      alert('User berhasil diperbarui');
      navigate('/form-user');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Terjadi kesalahan saat menyimpan user.';
      console.log(error.response?.data);
      alert(message);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Edit User" />
      <div className="rounded border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-end mb-4">
          <Link
            to="/form-user"
            className="rounded border border-stroke py-2 px-4 text-sm font-medium text-black hover:shadow dark:border-strokedark dark:text-primary"
          >
            Kembali
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-black dark:text-white">Nama</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full rounded border border-stroke bg-white py-2 px-4 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-black dark:text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full rounded border border-stroke bg-white py-2 px-4 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          <div className="relative">
            <label className="mb-2 block text-black dark:text-white">Password (Opsional)</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded border border-stroke bg-white py-2 px-4 pr-10 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
              placeholder="Kosongkan jika tidak diubah"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.055 10.055 0 012.986-4.373M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>

          <div>
            <label className="mb-2 block text-black dark:text-white">Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              required
              className="w-full rounded border border-stroke bg-white py-2 px-4 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
            >
              <option value="">-- Pilih Role --</option>
              {roles.map(r => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded bg-primary py-2 text-white hover:bg-opacity-90"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </>
  );
}
