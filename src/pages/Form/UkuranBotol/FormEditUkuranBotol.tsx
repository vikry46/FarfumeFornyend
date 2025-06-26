import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../utils/axiosInstance";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

const FormEditUkuranBotol = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ukuranBotol, setUkuranBotol] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUkuran = async () => {
      try {
        const response = await axios.get(`/api/ukuran-botol/show/${id}`);
        const data = response.data?.data;

        if (data) {
          setUkuranBotol(data.ukuran_botol.toString());
        } else {
          alert("Data ukuran botol tidak ditemukan.");
          navigate("/form-ukuran-botol");
        }
      } catch (error) {
        console.error("Gagal mengambil data ukuran botol:", error);
        alert("Terjadi kesalahan saat mengambil data.");
        navigate("/form-ukuran-botol");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUkuran();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.patch(`/api/ukuran-botol/update/${id}`, {
        ukuran_botol: parseFloat(ukuranBotol),
      });

      alert("Data ukuran botol berhasil diperbarui.");
      navigate("/form-ukuran-botol");
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      alert("Gagal menyimpan perubahan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-4">Memuat data ukuran botol...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Form Edit Ukuran Botol" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Edit Ukuran Botol</h3>
            <button
              onClick={() => navigate("/form-ukuran-botol")}
              className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
            >
              Batal
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Ukuran Botol (ml)
                </label>
                <input
                  type="number"
                  placeholder="Masukkan ukuran botol"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={ukuranBotol}
                  onChange={(e) => setUkuranBotol(e.target.value)}
                  required
                  min={1}
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

export default FormEditUkuranBotol;
