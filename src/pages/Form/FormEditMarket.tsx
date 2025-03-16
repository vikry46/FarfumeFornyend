import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const FormEditMarket = () => {
  const { id } = useParams<{ id: string }>(); // Ambil ID dari URL
  const navigate = useNavigate();

  // State untuk input
  const [nama, setNama] = useState("");
  const [kodeCabang, setKodeCabang] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data berdasarkan ID dari URL
  useEffect(() => {
    if (!id) return; 
  
    const fetchMarket = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/market/show/${id}`);
        if (response.data && response.data.data) {
          setNama(response.data.data.nama);
          setKodeCabang(response.data.data.kode_cabang);
        } else {
          console.error("Data tidak ditemukan:", response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data market:", error);
      }
    };
  
    fetchMarket();
  }, [id]);

  // Handle submit untuk update data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(`http://localhost:8000/api/market/update/${id}`, {
        nama,
        kode_cabang: kodeCabang,
      });

      alert("Data berhasil diperbarui!");
      navigate("/form-market"); // Redirect ke daftar market
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      alert("Gagal memperbarui data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form Edit Market" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Form Edit Market</h3>
            <button
              onClick={() => navigate("/form-market")}
              className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
            >
              Kembali
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Nama Market/Cabang</label>
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
                <label className="mb-2.5 block text-black dark:text-white">Kode Market/Cabang</label>
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

export default FormEditMarket;
