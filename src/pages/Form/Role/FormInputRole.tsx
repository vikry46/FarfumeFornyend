import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import axiosError from "axios";

const FormInputRole = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<{ [key: string]: string[] }>({});
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Permissions terstruktur
  const authorities: { [key: string]: string[] } = {
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
      'view-pengiriman-frekuensi'
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

  useEffect(() => {
    setPermissions(authorities);
  }, []);

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return alert("Nama role tidak boleh kosong.");
    if (!/^[a-zA-Z\s]+$/.test(name)) return alert("Nama role hanya boleh huruf dan spasi.");
    if (selectedPermissions.length === 0) return alert("Pilih minimal satu permission.");

    setLoading(true);
    try {
      const response = await axios.post("/api/roles/store", {
        name: name.trim(),
        permissions: selectedPermissions,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Role berhasil ditambahkan.");
        setName("");
        setSelectedPermissions([]);
        navigate("/form-role");
      }
    } catch (error: any) {
      console.error("Gagal menambahkan role:", error);
      const msg = axiosError.isAxiosError(error) && error.response?.data?.message;
      alert(msg || "Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form Input Role" />
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center px-6 py-4 border-b border-stroke dark:border-strokedark">
          <h3 className="text-lg font-semibold text-black dark:text-white">Form Tambah Role</h3>
          <Link
            to="/form-role"
            className="rounded border border-stroke py-2 px-4 text-sm font-medium text-black hover:shadow dark:border-strokedark dark:text-primary"
          >
            Kembali
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label className="mb-2 block text-black dark:text-white font-medium">Nama Role</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama role"
              className="w-full rounded border border-stroke py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-black dark:text-white font-medium">Hak Akses</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(permissions).map(([category, permissionList]) => (
                <div key={category} className="border border-stroke rounded-lg p-4 dark:border-strokedark">
                  <h4 className="bg-slate-600 text-white text-sm px-3 py-2 rounded mb-3">
                    {categoryNames[category] || category}
                  </h4>
                  <div className="space-y-2">
                    {permissionList.map((permission) => (
                      <label key={permission} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission)}
                          onChange={() => handlePermissionToggle(permission)}
                          className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{permission.replace(/-/g, "_")}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded hover:bg-opacity-90 font-medium"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormInputRole;
