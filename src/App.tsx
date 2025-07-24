import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
// import axios from 'axios';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import FormMarket from './pages/Form/FormMarket';
import FormInputMarket from './pages/Form/FormInputMarket';
import FormEditMarket from './pages/Form/FormEditMarket';
import FormSupplies from './pages/Form/supplies/FormSupplies';
import FormInputSupplies from './pages/Form/supplies/FormInputSupplies';
import FormEditSupplies from './pages/Form/supplies/FormEditSupplies';
import Index from './pages/Home/Index';
import HomeEcommerceLayout from './HomeEcommerceLayout'
import AuthLayout from './AuthLayout';
import FormKariawan from './pages/Form/kariawan.tsx/FormKariawan';
import FormInputKariawan from './pages/Form/kariawan.tsx/FormInputKariawan';
import FormEditKariawan from './pages/Form/kariawan.tsx/FormEditKariawan';
import FormPengiriman from './pages/Form/Pengiriman/FormPengiriman';
import FormInputPengiriman from './pages/Form/Pengiriman/FormInputPengiriman';
import FormEditPengiriman from './pages/Form/Pengiriman/FormEditPengiriman';
import FormPenjualan from './pages/Form/Penjualan/FormPenjualan';
import FormInputPenjualan from './pages/Form/Penjualan/FormInputPenjualan';
import FormEditPenjualan from './pages/Form/Penjualan/FormEditPenjulan';
import FormStock from './pages/Form/StokMarket/FormStock';
import FormBarangMasuk from './pages/Form/BrangMasuk/FormBarangMasuk';
import FormInputBarangMasuk from './pages/Form/BrangMasuk/FormInputBarangMasuk';
import FormEditBarangMasuk from './pages/Form/BrangMasuk/FormEditBarangMasuk';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import FormUkuranBotol from './pages/Form/UkuranBotol/FormUkuranBotol';
import FormInputUkuranBotol from './pages/Form/UkuranBotol/FormInputUkuranBotol';
import FormEditUkuranBotol from './pages/Form/UkuranBotol/FormEditUkuranBotol';
import FormStokGudang from './pages/Form/Gudang/FormStokGudang';
import Gudang from './Grafik/Gudang';
import GrafikPenjualanProduk from './Grafik/GrafikPenjualanProduk';
import HalamanGrafikPengiriman from './Grafik/HalamanGrafikPengiriman';
import HalamanGrafikStokMarket from './Grafik/HalamanGrafikStokMarket'
import RoleManagementPage from './pages/Role/RoleManagementPage';
import RoleForm from './pages/Form/Role/RoleForm';
import FormInputRole from './pages/Form/Role/FormInputRole';
import FormEditRole from './pages/Form/Role/FormEditRole';

interface Market {
  id: number;
  nama: string;
  kode_cabang: string;
}
interface UkuranBotol {
  id: number;
  ukuran_botol: string;
}

interface Supplie {
  id: number;
  nama: string;
  kode_barang: string;
}

interface Kariawan{
  id:number
  nik:string
  nama:string
  kelamin:string
  jabatan:string
}

interface Pengiriman {
  id: number;
  id_market: number;
  id_supplie: number;
  jumlah_kirim: number;
  tanggal: string;
  market?: {
      id: number;
      nama: string;
  };
  supplie?: {
      id: number;
      nama: string;
  };
}

interface Penjualan {
  id: number;
  id_market: number;
  id_supplie: number;
  terjual: number;
  tanggal: string;
  market?: {
      id: number;
      nama: string;
  };
  supplie?: {
      id: number;
      nama: string;
  };
}

interface BarangMasuk{
  id:number;
  id_supplie:number;
  juml_masuk:number;
  tanggal_masuk:string;
}

function App() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [ukuranBotol, setukuranBotol] = useState<UkuranBotol[]>([]);
  const [barangMasuk, setBarangMasuk] = useState<BarangMasuk[]>([]);
  const [supplies, setSupplies] = useState<Supplie[]>([]);
  const [kariawan, setKariawan] = useState<Kariawan[]>([]);
  const [pengiriman, setPengiriman] = useState<Pengiriman[]>([]);
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);

  // Fungsi untuk menangani penambahan market baru
  const handleMarketAdded = (newMarket: Market) => {
    setMarkets((prevMarkets) => [...prevMarkets, newMarket]);
  };

  const handleUkuranBotolAdded = (newukuranBotol: UkuranBotol) => {
    setukuranBotol((prevUkuranbotol) => [...prevUkuranbotol, newukuranBotol]);
  };
  
  const handleBarangMasukAdded = (newBarangMasuk: BarangMasuk) => {
    setBarangMasuk((prevBarangMasuk) => [...prevBarangMasuk, newBarangMasuk]);
  };
  
  const handleSuppliesAdded = (newSupplies: Supplie) => {
    setSupplies((prevSupplies) => [...prevSupplies, newSupplies]);
  }

  const handleKariawanAdded = (newKariawan : Kariawan)=>{
    setKariawan((prevKariawan) => [...prevKariawan, newKariawan]);
  }
  
  const handlePengirimanAdded = (newPengiriman : Pengiriman)=>{
    setPengiriman((prevPengiriman) => [...prevPengiriman, newPengiriman]);
  }
  
  const handlePenjualanAdded = (newPenjualan : Penjualan)=>{
    setPenjualan((prevPenjualan) => [...prevPenjualan, newPenjualan]);
  }

  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Current markets:", markets);
  }, [markets]);

  useEffect(() => {
    console.log("Current Ukuran botol:", ukuranBotol);
  }, [ukuranBotol]);

  useEffect(() => {
    console.log("Current supplies:", supplies);
  }, [supplies]);

  useEffect(() => {
    console.log("Current barangMasuk:", barangMasuk);
  }, [barangMasuk]);

  useEffect(()=>{
    console.log("Current kariawan", kariawan)
  },[kariawan])

  useEffect(()=>{
    console.log("Current pengiriman", pengiriman)
  },[pengiriman])

  useEffect(()=>{
    console.log("Current penjualan", penjualan)
  },[penjualan])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
<AuthProvider>
    <Routes>
      {/* Rute Autentikasi - Tidak Dilindungi */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      {/* Home Ecommerce - Tidak Dilindungi */}
      <Route path="/home-ecomerse" element={<HomeEcommerceLayout><Index /></HomeEcommerceLayout>} />

      {/* Rute yang Dilindungi */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DefaultLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard - Halaman Utama setelah login */}
        <Route index element={<><PageTitle title="Dashboard" /><ECommerce /></>} />
        
        {/* Menu Utama */}
        <Route path="kalender" element={<><PageTitle title="Kalender" /><Calendar /></>} />
        <Route path="profil" element={<><PageTitle title="Profil" /><Profile /></>} />
        <Route path="tabel" element={<><PageTitle title="Tabel" /><Tables /></>} />
        <Route path="pengaturan" element={<><PageTitle title="Pengaturan" /><Settings /></>} />
        <Route path="grafik" element={<><PageTitle title="Grafik" /><Chart /></>} />
        <Route path="ui/peringatan" element={<><PageTitle title="Peringatan" /><Alerts /></>} />
        <Route path="ui/tombol" element={<><PageTitle title="Tombol" /><Buttons /></>} />

        {/* Market Routes */}
        <Route path="form-market" element={<><PageTitle title="Form Market" /><FormMarket /></>} />
        <Route path="form-input-market" element={<><PageTitle title="Input Market" /><FormInputMarket onMarketAdded={handleMarketAdded} /></>} />
        <Route path="form-edit-market/:id" element={<><PageTitle title="Edit Market" /><FormEditMarket /></>} />

        {/* Supplies Routes */}
        <Route path="form-supplies" element={<><PageTitle title="Supplies" /><FormSupplies /></>} />
        <Route path="form-input-supplies" element={<><PageTitle title="Input Supplies" /><FormInputSupplies onSuppliesAdded={handleSuppliesAdded} /></>} />
        <Route path="form-edit-supplies/:id" element={<><PageTitle title="Edit Supplies" /><FormEditSupplies /></>} />

        {/* Karyawan Routes */}
        <Route path="form-kariawan" element={<><PageTitle title="Karyawan" /><FormKariawan /></>} />
        <Route path="form-input-kariawan" element={<><PageTitle title="Input Karyawan" /><FormInputKariawan onKariawanAdded={handleKariawanAdded} /></>} />
        <Route path="form-edit-kariawan/:id" element={<><PageTitle title="Edit Karyawan" /><FormEditKariawan /></>} />

        {/* Pengiriman Routes */}
        <Route path="form-pengiriman" element={<><PageTitle title="Pengiriman" /><FormPengiriman /></>} />
        <Route path="form-input-pengiriman" element={<><PageTitle title="Input Pengiriman" /><FormInputPengiriman markets={markets} supplies={supplies} onPengirimanAdded={handlePengirimanAdded} /></>} />
        <Route path="form-edit-pengiriman/:id" element={<><PageTitle title="Edit Pengiriman" /><FormEditPengiriman /></>} />

        {/* Penjualan Routes */}
        <Route path="form-penjualan" element={<><PageTitle title="Penjualan" /><FormPenjualan /></>} />
        <Route path="form-input-penjualan" element={<><PageTitle title="Input Penjualan" /><FormInputPenjualan markets={markets} supplies={supplies} onPenjualanAdded={handlePenjualanAdded} /></>} />
        <Route path="form-edit-penjualan/:id" element={<><PageTitle title="Edit Penjualan" /><FormEditPenjualan /></>} />

        {/* Barang Masuk Routes */}
        <Route path="form-barang-masuk" element={<><PageTitle title="Barang Masuk" /><FormBarangMasuk /></>} />
        <Route path="form-input-barang-masuk" element={<><PageTitle title="Input Barang Masuk" /><FormInputBarangMasuk supplies={supplies} onBarangMasukAdded={handleBarangMasukAdded} /></>} />
        <Route path="form-edit-barang-masuk/:id" element={<><PageTitle title="Edit Barang Masuk" /><FormEditBarangMasuk /></>} />

        {/* Ukuran Botol Routes */}
        <Route path="form-ukuran-botol" element={<><PageTitle title="Ukuran Botol" /><FormUkuranBotol /></>} />
        <Route path="form-input-ukuran-botol" element={<><PageTitle title="Input Barang Masuk" /><FormInputUkuranBotol  onUkuranBotolAdded={handleUkuranBotolAdded} /></>} />
        <Route path="form-edit-ukuran-botol/:id" element={<><PageTitle title="Edit Barang Masuk" /><FormEditUkuranBotol /></>} />

        {/* Stok Produk Routes */}
        <Route path="form-stockproduk" element={<><PageTitle title="Stok Produk" /><FormStock /></>} />

        {/* Stok Gudang */}
        <Route path="form-stock-gudang" element={<><PageTitle title="Stok Gudang" /><FormStokGudang /></>} />

         {/* grafik gudang */}
        <Route path="form-grafik-gudang" element={<><PageTitle title="grafik Gudang" /><Gudang /></>} />
        <Route path="form-grafik-penjualan" element={<><PageTitle title="grafik penjualan" /><GrafikPenjualanProduk /></>} />
        <Route path="form-grafik-pengiriman" element={<><PageTitle title="grafik pengiriman" /><HalamanGrafikPengiriman/></>} />
        <Route path="form-grafik-market" element={<><PageTitle title="Stok Market" /><HalamanGrafikStokMarket /></>} />

        {/* Role */}
        <Route path="/Roles" element={<RoleManagementPage />} />
        <Route path="form-role" element={<><PageTitle title="Role akses" /><RoleForm/></>} />
        <Route path="form-input-role" element={<><PageTitle title="Role input akses" /><FormInputRole/></>} />
        <Route path="form-edit-role/:id" element={<><PageTitle title="Role edit akses" /><FormEditRole/></>} />

         {/* Permission */}
         
      </Route>
    </Routes>
  </AuthProvider>
  );
}

export default App;

