import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import axios from "../../../utils/axiosInstance";
import React, { useState, useEffect } from "react";

// Interface
interface Market {
  id: string;
  nama: string;
}

interface Supplie {
  id: string;
  nama: string;
}

interface Penjualan {
  id?: string;
  id_market?: number | string;
  id_supplie?: number | string;
  terjual?: number | string;
  tanggal?: string;
  ukuran_botol?: number | string;
  harga?: number | string;
}

const FormEditPenjualan = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Penjualan>({
    id_market: "",
    id_supplie: "",
    terjual: "",
    tanggal: "",
    ukuran_botol: "",
    harga: ""
  });

  const [loading, setLoading] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [supplies, setSupplies] = useState<Supplie[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [penjualanRes, marketRes, supplieRes] = await Promise.all([
          axios.get(`/api/penjualan/show/${id}`),
          axios.get("/api/market"),
          axios.get("/api/supllies"),
        ]);

        const marketsData = marketRes.data.data || marketRes.data;
        const suppliesData = supplieRes.data.data || supplieRes.data;
        const penjualanData = penjualanRes.data.data || penjualanRes.data;

        if (!penjualanData) {
          throw new Error("Data penjualan tidak ditemukan");
        }

        setMarkets(marketsData);
        setSupplies(suppliesData);

        setFormData({
          id_market: penjualanData.id_market?.toString() || "",
          id_supplie: penjualanData.id_supplie?.toString() || "",
          terjual: penjualanData.terjual?.toString() || "",
          tanggal: formatDateForInput(penjualanData.tanggal) || "",
          ukuran_botol: penjualanData.ukuran_botol?.toString() || "",
          harga: penjualanData.harga?.toString() || "",
        });

      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setError("Gagal memuat data penjualan. Silakan coba lagi.");
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchAllData();
    }
  }, [id]);

  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.patch(`http://localhost:8000/api/penjualan/update/${id}`, {
        id_market: formData.id_market,
        id_supplie: formData.id_supplie,
        terjual: formData.terjual,
        tanggal: formData.tanggal
      });

      alert("Data Penjualan berhasil diperbarui!");
      navigate("/form-penjualan");
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      setError("Gagal memperbarui data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <p className="text-center text-black dark:text-white">Memuat data penjualan...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={() => navigate("/form-penjualan")}
          className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
        >
          Kembali ke Daftar Penjualan
        </button>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Form Edit Penjualan" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Form Edit Penjualan</h3>
            <button
              onClick={() => navigate("/form-penjualan")}
              className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
            >
              Kembali
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              {error && (
                <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100">
                  {error}
                </div>
              )}

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Pilih Market</label>
                <select
                  name="id_market"
                  value={formData.id_market}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">-- Pilih Market --</option>
                  {markets.map((market) => (
                    <option key={market.id} value={market.id}>
                      {market.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Pilih Supplie</label>
                <select
                  name="id_supplie"
                  value={formData.id_supplie}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">-- Pilih Supplie --</option>
                  {supplies.map((supplie) => (
                    <option key={supplie.id} value={supplie.id}>
                      {supplie.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Jumlah Terjual</label>
                <input
                  type="number"
                  name="terjual"
                  placeholder="Masukkan Jumlah Terjual"
                  value={formData.terjual}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Ukuran Botol</label>
                <select
                  name="ukuran_botol"
                  value={formData.ukuran_botol}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">-- Pilih Ukuran Botol --</option>
                  <option value="50">50 ml</option>
                  <option value="100">100 ml</option>
                  <option value="200">200 ml</option>
                </select>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Total Harga</label>
                <input
                  type="number"
                  name="harga"
                  placeholder="Masukkan Jumlah Harga"
                  value={formData.harga}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Tanggal Penjualan</label>
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormEditPenjualan;
