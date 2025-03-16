import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Market {
  id: number;
  nama: string;
  kode_cabang: string;
}

interface FormMarketProps {
  onMarketAdded: (market: Market) => void;
}

const FormInputMarket: React.FC<FormMarketProps> = ({ onMarketAdded }) => {
  const [nama, setNama] = useState("");
  const [kodeCabang, setKodeCabang] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // penggunaan useNavigate untuk redirect

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/market/store", {
        nama,
        kode_cabang: kodeCabang,
      });

      if (response.status === 201) {
        const newMarket = response.data.data;
        onMarketAdded(newMarket); // menambahkan data baru ke daftar market
        setNama(""); // Reset form
        setKodeCabang("");
        alert("Data berhasil ditambahkan!");

        // Redirect ke halaman utama 
        navigate("/form-market");
      }
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
      alert("Gagal menambahkan data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form Input Market" />

      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white text-center">Form Market</h3>
            <br />
            <Link
              to="/form-market"
              className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
            >
              Kembali
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nama Market/Cabang
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Nama Market"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Kode Market/Cabang
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Kode Cabang"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={kodeCabang}
                  onChange={(e) => setKodeCabang(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
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

export default FormInputMarket;
