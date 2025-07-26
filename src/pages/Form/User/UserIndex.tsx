// UserIndex.tsx
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from '../../../utils/axiosInstance';
import UserBody from './UserBody';
import { Link, useLocation } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string | null;
}

export default function UserIndex() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const isUserActive = location.pathname.startsWith("/form-user") || location.pathname.startsWith("/form-input-user");

  useEffect(() => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;

    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(prev => prev.filter(user => user.id !== id));
      alert("User berhasil dihapus.");
    } catch {
      alert("Gagal menghapus user.");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  return (
    <>
      <Breadcrumb pageName="Data User" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Data User</h3>
            <Link
              to="/form-input-user"
              className={`rounded border border-stroke py-2 px-4 font-medium hover:shadow-1 dark:border-strokedark dark:text-primary 
                ${isUserActive ? "text-white" : "text-black"}`}
            >
              Tambah User
            </Link>
          </div>

          <div className="p-4">
            <input
              type="text"
              placeholder="Cari User (nama, email, role)..."
              className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5.5 p-6.5 overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white">No</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Nama</th>
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Email</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Role</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <UserBody
                    key={user.id}
                    user={user}
                    index={index}
                    onDelete={handleDelete}
                    onShowDetail={() => alert(`Tampilkan detail user: ${user.name}`)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
