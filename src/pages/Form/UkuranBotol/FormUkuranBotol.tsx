import { useEffect, useState } from 'react';
import axios from '../../../utils/axiosInstance';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import FormUkuranBotolBody from './FormUkuranBotolBody';

interface UkuranBotol {
  id: number;
  ukuran_botol: number; 
}

const FormUkuranBotol = () => {
  const [ukuranBotol, setUkuranBotol] = useState<UkuranBotol[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const isInputActive = location.pathname === "/form-input-ukuran-botol";

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus ukuran botol ini?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/api/ukuran-botol/delete/${id}`);
      setUkuranBotol(prev => prev.filter(item => item.id !== id));
      alert("Data berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  useEffect(() => {
    axios.get('/api/ukuran-botol')
      .then(response => {
        setUkuranBotol(response.data.data);
      });
  }, []);

  const filteredUkuranBotol = ukuranBotol.filter(item =>
    item.ukuran_botol.toString().includes(searchTerm)
  );

  return (
    <>
      <Breadcrumb pageName="Form Ukuran Botol" />
      <div className='flex flex-col gap-9'>
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
            <ol className='header item'>
              <label className='mb-3 block text-black dark:text-white text-center'>
                Data Ukuran Botol
              </label>
              <Link to="/form-input-ukuran-botol"
                className={`rounded border border-stroke py-2 px-4 font-medium hover:shadow-1 dark:border-strokedark dark:text-primary 
                ${isInputActive ? "bg-primary text-white" : "text-black"}`}
              >
                Tambah data
              </Link>
            </ol>
          </div>
          <div className='p-4'>
            <input
              type="text"
              placeholder="Cari berdasarkan volume ukuran..."
              className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-5.5 p-6.5'>
            <table className='ui celled table'>
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className='min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white'>No</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Volume Botol (ml)</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUkuranBotol.map((item, index) => (
                  <FormUkuranBotolBody key={item.id} data={item} index={index} onDelete={handleDelete} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUkuranBotol;
