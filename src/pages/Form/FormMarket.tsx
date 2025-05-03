import { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import FormMarketBody from './FormMarketBody';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";


// Mendefinisikan tipe data Market yang sesuai dengan struktur data dari API
interface Market {
  id: number;
  nama: string;
  kode_cabang: string;
}


const FormMarket = () => {
  const [markets, setMarket] = useState<Market[]>([]); // Menyatakan bahwa markets adalah array dari objek Market
  // untuk mencari data berdasarkan nama
  const [searchTerm, setSearchTerm] = useState('');


  const location = useLocation();
  const isInputActive = location.pathname === "/form-input-market";

  const handleDelete = async (id: number) => {
    const isConfirmed= window.confirm("Apa anda yakin akan menghapus data ini !!!   / Pastikan lagi sebelum menghapus. ");
    if(!isConfirmed){
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/market/delete/${id}`); // Kirim request ke API
      setMarket((prevMarkets) => prevMarkets.filter((market) => market.id !== id)); // Hapus dari state
      alert("Data berhasil di hapus.");
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data.");
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/market')
      .then(function(response) {
        // untuk cek data di response
        // console.log(response)
        const market = response.data.data; // Mengambil data dari API
        setMarket(market);
        console.log(market);
      });
      
  }, []);

  // filter data sebelum di tampilkan
  const filteredMarkets = markets.filter(market => 
    market.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <>
      <Breadcrumb pageName="Form Market" />
      <div className='flex flex-col gap-9'>
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
            <ol className='header item'>
              <label className='mb-3 block text-black dark:text-white text-center'>
                Data Market
              </label>
              {/* penggunaan link yg gk pakai set aktiv */}
              {/* <Link to="/form-input-market" className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                Tambah Data
              </Link> */}

              {/* penggunakan link pakai set aktiv */}
              <Link to="/form-input-market"
                className={`rounded border border-stroke py-2 px-4 font-medium hover:shadow-1 dark:border-strokedark dark:text-primary 
                ${isInputActive ? "bg-primary text-white" : "text-black"}`}
                >
                Tambah data
             </Link>
            </ol>
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
            {/* menampilkan data dari api untuk melihat bahwasanya data sudah dikirim*/}
            {/* <pre className="bg-gray-200 p-3 rounded">{JSON.stringify(supplies, null, 2)}</pre> */}
            <table className='ui celled table'>
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className='min-w-[1cm] py-4 px-4 font-medium text-blac  k dark:text-white xl:pl-11'>
                    No
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Nama Market
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Kode Market
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions 
                  </th>
                </tr>
              </thead>
                <tbody>
                {
                  //tanpa menggunukan input pencarian
                  // markets && markets.map((market,index) => (
                  // <FormMarketBody key={market.id}  market={market} index={index}/>
                  
                  // jika ada menu pencaharian
                    filteredMarkets.map((market, index) => (
                    <FormMarketBody key={market.id} market={market} index={index} onDelete={handleDelete} /> // Mengirimkan market ke FormMarketBody
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

export default FormMarket;
