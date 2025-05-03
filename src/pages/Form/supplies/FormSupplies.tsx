import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormSuppliesBody from './FormSuppliesBody';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


interface Supplie{
  id: number;
  nama: string;
  kode_barang: string;
  total_masuk: number;
  jumlah_all:number;
  tanggal: string;
}


const FormSupplies =() =>{
  const [supplies, setSupplies] = useState<Supplie[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');

    // Menentukan apakah halaman "Form Input Supplies" sedang aktif
    const location = useLocation();
    const isSupplieActive = location.pathname.startsWith("/form-supplies") || location.pathname.startsWith("/form-input-supplies");

  const handleDelete = async (id:number)=>{
    const isConfirmed= window.confirm("Apa anda yakin ingin menghapus data ini !!!    / Pastikan lagi sebelum menghapus ")
    if(!isConfirmed){
      return;
    }
    try{
      await axios.delete(`http://127.0.0.1:8000/api/suplly/delete/${id}`)
      setSupplies((prevSupplies)=> prevSupplies.filter((supplies)=>supplies.id !==id));
      alert("Data Berhasil di hapus.");
    } catch (error){
      console.log("Gagal menghapus data:",error);
      alert("Gagal menghapus data")
    }
  }


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/supllies')
      .then((response) => {
        const supplie = response.data.data;
        setSupplies(supplie);
        console.log(supplie); 
      });
  }, []); 

  const filteredSupplie = supplies.filter(supplies=>
    supplies.nama.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Breadcrumb pageName="Form Supplies" />
      <div className='flex flex-col gap-9'>
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
            <h3 className='font-medium text-black dark:text-white text-center'>
              Data Supplies
            </h3>
            <Link to="/form-input-supplies"
              className={`rounded border border-stroke py-2 px-4 font-medium hover:shadow-1 dark:border-strokedark dark:text-primary 
                ${isSupplieActive ? "text-white" : "text-black"}`}
            >
            Tambah data
            </Link>
          </div>
          <div className='p-4'>
            <input
              type="text "
              placeholder="Cari berdasarkan nama..."
              className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-5.5 p-6.5'>
            <table className='ui celled table'>
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className='min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11'>No</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Nama Stock</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Kode Stock</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Total Stock Semua Market</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                    filteredSupplie.map((supplies, index) => (
                    <FormSuppliesBody key={supplies.id} supplies={supplies} index={index} onDelete={handleDelete}/>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormSupplies;
