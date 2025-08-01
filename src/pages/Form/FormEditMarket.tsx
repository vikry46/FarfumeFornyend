import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const FormEditMarket = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [kodeCabang, setKodeCabang] = useState("");
  const [loading, setLoading] = useState(true); 
  const [submitting, setSubmitting] = useState(false); 

  // Ambil data market untuk di-edit
  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const response = await axios.get(`/api/market/show/${id}`);
        const data = response.data?.data;

        if (data) {
          setNama(data.nama);
          setKodeCabang(data.kode_cabang);
        } else {
          alert("Data market tidak ditemukan.");
          navigate("/form-market");
        }
      } catch (error) {
        console.error("Gagal mengambil data market:", error);
        alert("Terjadi kesalahan saat mengambil data.");
        navigate("/form-market");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMarket();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.patch(`/api/market/update/${id}`, {
        nama,
        kode_cabang: kodeCabang,
      });

      alert("Data market berhasil diperbarui.");
      navigate("/form-market");
    } catch (error) {
      console.error("Gagal memperbarui data market:", error);
      alert("Gagal menyimpan perubahan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-4">Memuat data market...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Form Edit Market" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Edit Market</h3>
            <button
              onClick={() => navigate("/form-market")}
              className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
            >
              Batal
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nama Market
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama market"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Kode Cabang
                </label>
                <input
                  type="text"
                  placeholder="Masukkan kode cabang"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={kodeCabang}
                  onChange={(e) => setKodeCabang(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded bg-primary font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormEditMarket;
