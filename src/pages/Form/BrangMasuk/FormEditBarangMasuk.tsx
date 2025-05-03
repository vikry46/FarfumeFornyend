import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import React, { useState, useEffect } from "react";


interface Supplie {
  id: string;
  nama: string;
}

interface BarangMasuk {
  id?: string;
  id_supplie?: number | string;
  juml_masuk?: number | string;
  tanggal_masuk?: string;
}

const FormEditBarangMasuk = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BarangMasuk>({
    id_supplie: "",
    juml_masuk: "",
    tanggal_masuk: ""
  });

  const [loading, setLoading] = useState(false);
  const [supplies, setSupplies] = useState<Supplie[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [barangMasukRes, supplieRes] = await Promise.all([
          axios.get(`http://localhost:8000/api/barang-masuk/show/${id}`),
          axios.get("http://localhost:8000/api/supllies"),
        ]);

        console.log('BarangMasuk Response:', barangMasukRes.data);
        console.log('Supplies Response:', supplieRes.data);

        const suppliesData = supplieRes.data.data || supplieRes.data;
        const barangMasukData = barangMasukRes.data.data || barangMasukRes.data;

        if (!barangMasukData) {
          throw new Error("Data pengiriman tidak ditemukan");
        }

        setSupplies(suppliesData);

        setFormData({
          id_supplie: barangMasukData.id_supplie?.toString() || "",
          juml_masuk: barangMasukData.juml_masuk?.toString() || "",
          tanggal_masuk: formatDateForInput(barangMasukData.tanggal_masuk) || ""
        });

      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setError("Gagal memuat data pengiriman. Silakan coba lagi.");
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
      await axios.patch(`http://localhost:8000/api/barang-masuk/update/${id}`, {
        id_supplie: formData.id_supplie,
        juml_masuk: formData.juml_masuk,
        tanggal_masuk: formData.tanggal_masuk
      });

      alert("Data Pengiriman berhasil diperbarui!");
      navigate("/form-barang-masuk");
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      setError("Gagal memperbarui data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <p className="text-center text-black dark:text-white">Memuat data pengiriman...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={() => navigate("/form-barang-masuk")}
          className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
        >
          Kembali ke Daftar Pengiriman
        </button>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Form Edit Pengiriman" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Form Edit Pengiriman</h3>
            <button
              onClick={() => navigate("/form-barang-masuk")}
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
                <label className="mb-2.5 block text-black dark:text-white">Pilih Supplie</label>
                <select
                  name="id_supplie"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.id_supplie}
                  onChange={handleChange}
                  required
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
                <label className="mb-2.5 block text-black dark:text-white">Jumlah Masuk</label>
                <input
                  type="number"
                  name="juml_masuk"
                  placeholder="Masukkan Jumlah Kirim"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.juml_masuk}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Tanggal Masuk</label>
                <input
                  type="date"
                  name="tanggal_masuk"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.tanggal_masuk}
                  onChange={handleChange}
                  required
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

export default FormEditBarangMasuk;
