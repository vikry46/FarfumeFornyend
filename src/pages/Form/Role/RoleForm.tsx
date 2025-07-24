// FormRole.tsx
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from '../../../utils/axiosInstance';
import FormRoleBody from './FormRoleBody';
import { Link, useLocation } from "react-router-dom";

interface Role {
  id: number;
  name: string;
}

interface RoleDetail {
  id: number;
  name: string;
  permissions: string[];
}

const permissionCategories: { [key: string]: string[] } = {
  supplies: ['index-supplies', 'create-supplies', 'show-supplies', 'update-supplies', 'delete-supplies'],
  markets: ['index-markets', 'create-markets', 'show-markets', 'update-markets', 'delete-markets'],
  kariawan: ['index-kariawan', 'create-kariawan', 'show-kariawan', 'update-kariawan', 'delete-kariawan'],
  pengiriman: ['index-pengiriman', 'create-pengiriman', 'show-pengiriman', 'update-pengiriman', 'delete-pengiriman'],
  penjualan: ['index-penjualan', 'create-penjualan', 'show-penjualan', 'update-penjualan', 'delete-penjualan'],
  barangmasuk: ['index-barangmasuk', 'create-barangmasuk', 'show-barangmasuk', 'update-barangmasuk', 'delete-barangmasuk'],
  'ukuran-botol': ['index-ukuran-botol', 'create-ukuran-botol', 'show-ukuran-botol', 'update-ukuran-botol', 'delete-ukuran-botol'],
  marketproduk: ['index-marketproduk', 'create-marketproduk'],
  stokmarket: ['index-stokmarket'],
  gudang: ['index-gudang'],
  grafik: [
    'view-penjualan-tren',
    'view-penjualan-produk',
    'view-penjualan-market',
    'view-penjualan-revenue',
    'view-penjualan-ukuran',
    'view-pengiriman-tren',
    'view-pengiriman-market',
    'view-pengiriman-stok-supplier',
    'view-pengiriman-supplier',
    'view-pengiriman-frekuensi',
  ],
};

const categoryNames: { [key: string]: string } = {
  supplies: 'Manage Supplies',
  markets: 'Manage Market/Toko',
  kariawan: 'Manage Kariawan',
  pengiriman: 'Manage Pengiriman',
  penjualan: 'Manage Penjualan',
  barangmasuk: 'Manage Barang Masuk',
  'ukuran-botol': 'Manage Ukuran Botol',
  marketproduk: 'Manage Market Produk',
  stokmarket: 'Manage Stok Market',
  gudang: 'Manage Gudang',
  grafik: 'Manage Grafik',
};

export default function FormRole() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const location = useLocation();

  const isRoleActive = location.pathname.startsWith("/form-role") || location.pathname.startsWith("/form-input-role");

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apa anda yakin ingin menghapus role ini?")) return;

    try {
      await axios.delete(`/api/roles/delete/${id}`);
      setRoles(prev => prev.filter(role => role.id !== id));
      alert("Role berhasil dihapus.");
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus role.");
    }
  };

  const fetchRoleDetail = async (roleId: number) => {
    setLoadingDetail(true);
    try {
      const res = await axios.get(`/api/roles/${roleId}`);
      setSelectedRole({
        id: res.data.id,
        name: res.data.name,
        permissions: res.data.permissions || []
      });
    } catch (err) {
      alert("Gagal memuat data role. Silakan coba lagi.");
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeModal = () => {
    setSelectedRole(null);
  };

  useEffect(() => {
    axios.get('/api/roles')
      .then((res) => {
        setRoles(res.data?.data ?? res.data ?? []);
      })
      .catch((err) => {
        console.error(err);
        setRoles([]);
      });
  }, []);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group permissions by category for modal display
  const groupedPermissions = selectedRole ? Object.entries(permissionCategories).reduce(
    (acc: { [key: string]: string[] }, [category, perms]) => {
      const matched = selectedRole.permissions.filter(p => perms.includes(p));
      if (matched.length > 0) acc[category] = matched;
      return acc;
    }, {}
  ) : {};

  return (
    <>
      <Breadcrumb pageName="Form Role" />
      <div className='flex flex-col gap-9'>
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center'>
            <h3 className='font-medium text-black dark:text-white'>Data Role</h3>
            <Link
              to="/form-input-role"
              className={`rounded border border-stroke py-2 px-4 font-medium hover:shadow-1 dark:border-strokedark dark:text-primary 
                ${isRoleActive ? "text-white" : "text-black"}`}
            >
              Tambah Role
            </Link>
          </div>

          <div className='p-4'>
            <input
              type="text"
              placeholder="Cari Role..."
              className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-5.5 p-6.5 overflow-x-auto'>
            <table className='min-w-full table-auto'>
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className='min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white'>No</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Nama Role</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role, index) => (
                  <FormRoleBody
                    key={role.id}
                    role={role}
                    index={index}
                    onDelete={handleDelete}
                    onShowDetail={() => fetchRoleDetail(role.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedRole && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-boxdark rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative"
            onClick={e => e.stopPropagation()} // supaya klik di dalam modal tidak close modal
          >
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">
              Hak Akses: {selectedRole.name}
            </h3>

            {loadingDetail ? (
              <p className="text-gray-600 dark:text-gray-300">Memuat data...</p>
            ) : (
              <div className="space-y-4 text-sm">
                {Object.entries(groupedPermissions).map(([category, perms]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-primary">{categoryNames[category]}</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4">
                      {perms.map((perm, idx) => (
                        <li key={idx}>{perm.replace(/-/g, "_")}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 rounded bg-gray-500 text-white px-3 py-1 text-sm hover:bg-gray-600"
              aria-label="Tutup modal"
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
