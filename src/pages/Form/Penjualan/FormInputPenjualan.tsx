import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import axiosEror from "axios";

interface Penjualan {
  id: number;
  id_market: number;
  id_supplie: number;
  terjual: number;
  tanggal: string;
  estimasi_botol: number;
  harga: number;
  ukuran_botol: number;
  market?: {
    id: number;
    nama: string;
  };
  supplie?: {
    id: number;
    nama: string;
  };
}

interface Market {
  id: number;
  nama: string;
  kode_cabang: string;
}

interface Supplie {
  id: number;
  nama: string;
  kode_barang: string;

}

interface UkuranBotol {
  ukuran_botol: number;
}

interface FormInputPenjualanProps {
  onPenjualanAdded: (penjualan: Penjualan) => void;
  markets: Market[];
  supplies: Supplie[];
}

const FormInputPenjualan: React.FC<FormInputPenjualanProps> = ({ onPenjualanAdded }) => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [supplies, setSupplies] = useState<Supplie[]>([]);

  const [idMarket, setIdMarket] = useState("");
  const [idSupplie, setIdSupplie] = useState("");
  const [terjual, setTerjual] = useState("");
  const [ukuranBotol, setUkuranBotol] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [harga, setHarga] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [ukuranBotolList, setUkuranBotolList] = useState<UkuranBotol[]>([]);

  const estimasiBotol = ukuranBotol && terjual ? Math.floor(Number(terjual) / Number(ukuranBotol)) : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marketRes, supplieRes, ukuranRes] = await Promise.all([
          axios.get("/api/market"),
          axios.get("/api/supllies"),
          axios.get("/api/ukuran-botol"),
        ]);
        setMarkets(marketRes.data.data);
        setSupplies(supplieRes.data.data);
        setUkuranBotolList(ukuranRes.data.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/penjualan/store", {
        id_market: idMarket,
        id_supplie: idSupplie,
        terjual: Number(terjual),
        ukuran_botol: Number(ukuranBotol),
        estimasi_botol: estimasiBotol,
        tanggal: tanggal,
        harga: harga
      });

      if (response.status === 201) {
        const newPenjualan = response.data.data;
        onPenjualanAdded(newPenjualan);
        setIdMarket("");
        setIdSupplie("");
        setTerjual("");
        setUkuranBotol("");
        setHarga("");
        setTanggal("");
        alert("Data Penjualan Berhasil Ditambahkan");
        navigate("/form-penjualan");
      }
    } catch (error: any) {
      console.error("Gagal menambahkan data:", error);
      if (axiosEror.isAxiosError(error) && error.response) {
        const msg = error.response.data.message;
        alert(msg || "Gagal menambahkan data!");
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form Input Penjualan" />
      <div className="flex flex-col gap-9">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white text-center">
            Form Penjualan
          </h3>
          <br />
          <Link
            to="/form-penjualan"
            className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
          >
            Kembali
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Pilih Market</label>
              <select
                value={idMarket}
                onChange={(e) => setIdMarket(e.target.value)}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
                value={idSupplie}
                onChange={(e) => setIdSupplie(e.target.value)}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
              <label className="mb-2.5 block text-black dark:text-white">Jumlah Terjual (ml)</label>
              <input
                type="number"
                value={terjual}
                onChange={(e) => setTerjual(e.target.value)}
                required
                placeholder="Masukkan jumlah penjualan berdasarakan (ML/mili liter)"
                className="w-full rounded border-[1.5px] border-stroke py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Ukuran Botol (ml)</label>
              <select
                value={ukuranBotol}
                onChange={(e) => setUkuranBotol(e.target.value)}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
              >
                <option value="">-- Pilih Ukuran Botol --</option>
                {ukuranBotolList.map((item, index) => (
                  <option key={index} value={item.ukuran_botol}>
                    {item.ukuran_botol} ml
                  </option>
                ))}
              </select>

            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Estimasi Botol</label>
              <input
                type="number"
                value={estimasiBotol}
                disabled
                className="w-full bg-gray-100 dark:bg-[#2d2d2d] rounded border-[1.5px] border-stroke py-3 px-5 text-black dark:border-form-strokedark dark:text-white"
              />
            </div>


            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Harga (ml)</label>
              <input
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
                placeholder="Masukkan total harga"
                className="w-full rounded border-[1.5px] border-stroke py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">Tanggal Penjualan</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
                className="w-full rounded border-[1.5px] border-stroke py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormInputPenjualan;
