import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import FormStokGudangBody from "./FormStokGudangBody";

interface Gudang {
  id_supplie: string;
  nama_supplie: string;
  total_masuk: number;
  total_kirim: number;
  stok_gudang: number;
}

const FormStokGudang = () => {
  const [gudangList, setGudangList] = useState<Gudang[]>([]);
  const [searchNama, setSearchNama] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stock-gudang");
      setGudangList(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal mengambil data gudang:", err);
      setError("Gagal memuat data gudang");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredGudang = gudangList.filter((item) =>
    item.nama_supplie?.toLowerCase().includes(searchNama.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Memuat data gudang...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <>
      <Breadcrumb pageName="Stok Gudang" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-center items-center">
            <h3 className="text-black dark:text-white font-medium text-center">Data Stok Gudang</h3>
          </div>
          <div className="p-4">
            <label className="block mb-2 text-black dark:text-white">Cari berdasarkan Nama Supplie</label>
            <input
              type="text"
              placeholder="Nama Supplie..."
              className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              value={searchNama}
              onChange={(e) => setSearchNama(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-5.5 p-6.5 overflow-x-auto">
            <table className="table-auto min-w-full border-collapse">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">No</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-center">Nama Supplie</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Total Masuk</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Total Kirim</th>
                  <th className="min-w-[130px] py-4 px-4 font-medium text-center">Stok Gudang</th>
                </tr>
              </thead>
              <tbody>
                {filteredGudang.length > 0 ? (
                  filteredGudang.map((item, index) => (
                    <FormStokGudangBody key={item.id_supplie} gudang={item} index={index} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      {searchNama ? "Data tidak ditemukan" : "Tidak ada data stok gudang"}
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

export default FormStokGudang;
