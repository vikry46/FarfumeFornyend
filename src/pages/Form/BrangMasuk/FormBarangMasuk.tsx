import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FormBarangMasukBody from './FormBarangMasukBody';

interface BarangMasuk {
    id: number;
    id_supplie: number;
    juml_masuk: number;
    tanggal_masuk: string;
    supplie?: {
        id: number;
        nama: string;
    };
}

const FormBarangMasuk= () => {
  const [barangMasuk, setbarangMasuk] = useState<BarangMasuk[]>([]);
  const [searchNamaSupplie, setSearchNamaSupplie] = useState(''); // digunakaan untuk pencarian berdasarkan nama
  const [searchTanggal, setSearchTanggal] = useState('');// di gunakan untuk pencarian berdasarkan tanggal
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      "Apa anda yakin ingin menghapus data ini? Pastikan lagi sebelum menghapus!!!."
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/barang-masuk/delete/${id}`);
      setbarangMasuk(prev => prev.filter(item => item.id !== id));
      alert("Data Berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/barang-masuk');
        setbarangMasuk(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data pengiriman:", error);
        setError("Gagal memuat data pengiriman");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPengiriman = barangMasuk.filter((item) => {
    const matchSupplie = item.supplie?.nama?.toLowerCase().includes(searchNamaSupplie.toLowerCase());
    const matchTanggal = item.tanggal_masuk.includes(searchTanggal);
    return matchSupplie && matchTanggal;
  });

  if (loading) return <div className="text-center py-8">Memuat data...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <>
      <Breadcrumb pageName="Form Barang Masuk" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <ol className="header item">
              <label className="mb-3 block text-black dark:text-white text-center">
                Data Pengiriman
              </label>
              <Link
                to="/form-input-barang-masuk"
                className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
              >
                Tambah Data
              </Link>
            </ol>
          </div>

          {/* Pencarian */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-black dark:text-white">Cari berdasarkan nama produk</label>
              <input
                type="text"
                placeholder="Nama produk"
                className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                value={searchNamaSupplie}
                onChange={(e) => setSearchNamaSupplie(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-black dark:text-white">Cari berdasarkan Tanggal</label>
              <input
                type="date"
                className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                value={searchTanggal}
                onChange={(e) => setSearchTanggal(e.target.value)}
              />
            </div>
          </div>

          {/* Tabel */}
          <div className="flex flex-col gap-5.5 p-6.5">
            <table className="ui celled table">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    No
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Nama Produk
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Jumlah Barang Masuk
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Tanggal Masuk
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPengiriman.length > 0 ? (
                  filteredPengiriman.map((item, index) => (
                    <FormBarangMasukBody
                      key={item.id}
                      barangMasuk={item}
                      index={index}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      {searchNamaSupplie || searchTanggal
                        ? "Data tidak ditemukan"
                        : "Tidak ada data pengiriman"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormBarangMasuk;
