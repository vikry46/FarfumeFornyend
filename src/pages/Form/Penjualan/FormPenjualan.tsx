import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import FormPenjualanBody from "./FormPenjualanBody";

interface Penjualan {
  id: number;
  id_market: number;
  id_supplie: number;
  terjual: number;
  estimasi_botol: number;
  ukuran_botol: number;
  harga: number;
  tanggal: string;
  market?: {
    id: number;
    nama: string;
  };
  supplie?: {
    id: number;
    nama: string;
  };
}

const FormPenjualan = () => {
  const [penjualanList, setPenjualanList] = useState<Penjualan[]>([]);
  const [searchMarket, setSearchMarket] = useState('');
  const [searchTanggal, setSearchTanggal] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios('http://localhost:8000/api/penjualan')
      setPenjualanList(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data penjualan:", error);
      setError("Gagal memuat data penjualan");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apa anda yakin ingin menghapus data ini? Pastikan lagi sebelum menghapus!!!.")) return;

    try {
      await axios.delete(`http://localhost:8000/api/penjualan/delete/${id}`);
      setPenjualanList((prev) => prev.filter((item) => item.id !== id));
      alert("Data Berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data.");
    }
  };

  const filteredPenjualan = penjualanList.filter((item) => {
    const matchMarket = item.market?.nama?.toLowerCase().includes(searchMarket.toLowerCase());
    const matchTanggal = item.tanggal.includes(searchTanggal);
    return matchMarket && matchTanggal;
  });
  if (loading) return <div className="text-center py-8">Memuat data...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  return (
    <>
      <Breadcrumb pageName="Form Penjualan" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="text-black dark:text-white text-lg font-medium">Data Penjualan</h3>
            <Link
              to="/form-input-penjualan"
              className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
            >
              Tambah Data
            </Link>
          </div>

          {/* Pencarian */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-black dark:text-white">Cari berdasarkan Nama Market</label>
              <input
                type="text"
                placeholder="Nama Market..."
                className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                value={searchMarket}
                onChange={(e) => setSearchMarket(e.target.value)}
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
          <div className="flex flex-col gap-5.5 p-6.5 overflow-x-auto">
            <table className="table-auto min-w-full border-collapse">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="min-w-[60px] py-4 px-4 font-medium">No</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Market</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Supplie</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Terjual (ml)</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Estimasi Botol</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Ukuran Botol</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Harga</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Tanggal</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPenjualan.length > 0 ? (
                  filteredPenjualan.map((item, index) => (
                    <FormPenjualanBody
                      key={item.id}
                      penjualan={item}
                      index={index}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      {searchMarket || searchTanggal
                        ? "Data tidak ditemukan"
                        : "Tidak ada data penjualan"}
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

export default FormPenjualan;
