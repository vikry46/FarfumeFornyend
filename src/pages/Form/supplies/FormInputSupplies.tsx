import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../utils/axiosInstance";

interface Supplie {
  id: number;
  nama: string;
  kode_barang: string;
}

interface FormInputSuppliesProps {
  onSuppliesAdded: (supplies: Supplie) => void;
}

const FormInputSupplies: React.FC<FormInputSuppliesProps> = ({ onSuppliesAdded }) => {
  const [nama, setNama] = useState("");
  const [kodeBarang, setKodeBarang] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.get("/sanctum/csrf-cookie"); // jaga-jaga kalau perlu CSRF
      const response = await axios.post("/api/suplly/store", {
        nama,
        kode_barang: kodeBarang,
      });

      if (response.status === 201) {
        const newSupplie = response.data.data;
        onSuppliesAdded(newSupplie);
        alert("Data suplai berhasil ditambahkan.");
        navigate("/form-supplies");
      }
    } catch (error) {
      console.error("Gagal menambahkan suplai:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form Input Supplies" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Tambah Data Supplies</h3>
            <Link
              to="/form-supplies"
              className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
            >
              Kembali
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Nama Supplies</label>
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
                <label className="mb-2.5 block text-black dark:text-white">Kode Barang</label>
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

export default FormInputSupplies;
