import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import FormStockBody from "./FormStockBody";

interface Produk {
  toko: string;
  barang: string;
  stok: number;
}

const FormStock = () => {
  const [stockList, setStockList] = useState<Produk[]>([]);
  const [searchToko, setSearchToko] = useState('');
  const [searchBarang, setSearchBarang] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);      

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stok-market");
      setStockList(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal mengambil data produk:", err);
      setError("Gagal memuat data stok market");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredStock = stockList.filter((item) => {
    const matchMarket = item.toko?.toLowerCase().includes(searchToko.toLowerCase());
    const matchSupplie = item.barang?.toLowerCase().includes(searchBarang.toLowerCase());
    return matchMarket && matchSupplie;
  });

  if (loading) return <div className="text-center py-8">Memuat data...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <>
      <Breadcrumb pageName="Form Stock Market" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-center items-center">
                <h3 className="text-black dark:text-white font-medium text-center">Data Produk Market</h3>
              </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-black dark:text-white">Cari berdasarkan Nama Market</label>
                      <input
                        type="text"
                        placeholder="Nama Market..."
                        className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        value={searchToko}
                        onChange={(e) => setSearchToko(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-black dark:text-white">Cari berdasarkan nama supplay</label>
                      <input
                        type="text"
                        placeholder="Nama supplay"
                        className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        value={searchBarang}
                        onChange={(e) => setSearchBarang(e.target.value)}
                      />
                    </div>
                </div>
              <div className="flex flex-col gap-5.5 p-6.5 overflow-x-auto">
                <table className="table-auto min-w-full border-collapse">
                  <thead className="bg-gray-600 text-white">
                    <tr>
                      <th className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">No</th>
                      <th className="min-w-[130px] py-4 px-4 font-medium text-center">Market</th>
                      <th className="min-w-[130px] py-4 px-4 font-medium text-center">Supplay</th>
                      <th className="min-w-[130px] py-4 px-4 font-medium text-center">Jumlah Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStock.length > 0 ? (
                      filteredStock.map((item, index) => (
                        <FormStockBody
                          key={`${item.toko}-${item.barang}`}
                          produk={item}
                          index={index}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-center py-4">
                          {searchToko || searchBarang
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

export default FormStock;
