import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import axios from '../../../utils/axiosInstance';
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';

interface UkuranBotol {
  id: number;
  ukuran_botol: string;
}

interface FormUkuranBotolProps {
  onUkuranBotolAdded?: (data: UkuranBotol) => void; // opsional
}

const FormInputUkuranBotol: React.FC<FormUkuranBotolProps> = ({ onUkuranBotolAdded }) => {
  const [ukuranBotol, setUkuranBotol] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!ukuranBotol || isNaN(Number(ukuranBotol))) {
    alert("Ukuran botol harus berupa angka yang valid!");
    setLoading(false);
    return;
  }

    try {
      await axios.get('/sanctum/csrf-cookie');

      const response = await axios.post("/api/ukuran-botol/store", {
        ukuran_botol: Number(ukuranBotol),
      });

      if (response.status === 201) {
        const newData = response.data.data;
        onUkuranBotolAdded?.(newData); // panggil jika tersedia
        setUkuranBotol('');
        alert("Data berhasil ditambahkan!");
        navigate("/form-ukuran-botol");
      }
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
      if (error instanceof AxiosError) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
        console.error("Response headers:", error.response?.headers);
        if (error.response?.status === 422) {
        const messages = error.response.data.errors;
        const errorMessage = Object.values(messages).flat().join('\n');
        alert("Validasi gagal:\n" + errorMessage);
        } else {
        alert("Gagal menambahkan data!");
        }
      }
      alert("Gagal menambahkan data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form Input Ukuran Botol" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white text-center">Form Ukuran Botol</h3>
            <br />
            <Link
              to="/form-ukuran-botol"
              className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary"
            >
              Kembali
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Volume Botol (ml)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 100"
                  min={1}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={ukuranBotol}
                  onChange={(e) => setUkuranBotol(Number(e.target.value))}
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

export default FormInputUkuranBotol;
