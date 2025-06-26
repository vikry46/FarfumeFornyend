import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../utils/axiosInstance";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

const FormEditSupplies = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [kodeBarang, setKodeBarang] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await axios.get(`/api/suplly/show/${id}`);
        const data = response.data?.data;

        if (data) {
          setNama(data.nama);
          setKodeBarang(data.kode_barang);
        } else {
          alert("Data supplies tidak ditemukan.");
          navigate("/form-supplies");
        }
      } catch (error) {
        console.error("Gagal mengambil data supplies:", error);
        alert("Terjadi kesalahan saat mengambil data.");
        navigate("/form-supplies");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSupplies();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.patch(`/api/suplly/update/${id}`, {
        nama,
        kode_barang: kodeBarang,
      });

      alert("Data supplies berhasil diperbarui.");
      navigate("/form-supplies");
    } catch (error) {
      console.error("Gagal memperbarui data supplies:", error);
      alert("Gagal menyimpan perubahan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-4">Memuat data supplies...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Form Edit Supplies" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Edit Supplies</h3>
            <button
              onClick={() => navigate("/form-supplies")}
              className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
            >
              Batal
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nama Supplies
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama supplies"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Kode Barang
                </label>
                <input
                  type="text"
                  placeholder="Masukkan kode barang"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={kodeBarang}
                  onChange={(e) => setKodeBarang(e.target.value)}
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

export default FormEditSupplies;
