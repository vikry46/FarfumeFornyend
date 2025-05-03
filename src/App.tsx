import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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


interface Market {
  id: number;
  nama: string;
  kode_cabang: string;
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
  const [barangMasuk, setBarangMasuk] = useState<BarangMasuk[]>([]);
  const [supplies, setSupplies] = useState<Supplie[]>([]);
  const [kariawan, setKariawan] = useState<Kariawan[]>([]);
  const [pengiriman, setPengiriman] = useState<Pengiriman[]>([]);
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);

  // Fungsi untuk menangani penambahan market baru
  const handleMarketAdded = (newMarket: Market) => {
    setMarkets((prevMarkets) => [...prevMarkets, newMarket]);
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
    console.log("Current supplies:", supplies);
  }, [supplies]);

  useEffect(() => {
    console.log("Current barangMAsuk:", barangMasuk);
  }, [barangMasuk]);

  useEffect(()=>{
    console.log("Current market", kariawan)
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
    <Routes>
      {/* Halaman Sign In & Sign Up agar selalu bisa diakses */}
      <Route path="/auth/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
      <Route path="/auth/signup" element={<AuthLayout><SignUp /></AuthLayout>} />

      {/* Jika URL adalah "/home-ecomerse", tampilkan HomeEcommerceLayout */}
      {pathname === "/home-ecomerse" ? (
        <Route path="/home-ecomerse" element={<HomeEcommerceLayout><Index /></HomeEcommerceLayout>} />
      ) : (
        <Route path="/*" element={
          <DefaultLayout>
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="eCommerce Dashboard" />
                  <ECommerce />
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Calendar" />
                  <Calendar />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile" />
                  <Profile />
                </>
              }
            />
            <Route
              path="/form-market"
              element={ 
                <>
                  <PageTitle title="Form Elements" />
                  <FormMarket />
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                  <PageTitle title="Tables" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings" />
                  <Settings />
                </>
              }
            />
            <Route
              path="/chart"
              element={
                <>
                  <PageTitle title="Basic Chart" />
                  <Chart />
                </>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts" />
                  <Alerts />
                </>
              }
            />
            <Route
              path="/ui/buttons"
              element={
                <>
                  <PageTitle title="Buttons" />
                  <Buttons />
                </>
              }
            />
            <Route
              path="/form-input-market"
              element={
                <>
                  <PageTitle title="Form Market" />
                  <FormInputMarket onMarketAdded={handleMarketAdded}/>
                </>
              } 
            />
            <Route
              path="/form-edit-market/:id"
              element={
                <>
                  <PageTitle title="Form market edit" />
                  <FormEditMarket/>
                </>
              }
            />
            <Route
              path="/form-supplies"
              element={
                <>
                  <PageTitle title="Form supplies" />
                  <FormSupplies/>
                </>
              }
            />
            <Route
              path="/form-input-supplies"
              element={
                <>
                  <PageTitle title="Form input supplies" />
                  <FormInputSupplies onSuppliesAdded={handleSuppliesAdded}/>
                </>
              }
            />
            <Route
              path="/form-edit-supplies/:id"
              element={
                <>
                  <PageTitle title="Form edit supplies" />
                  <FormEditSupplies/>
                </>
              }
            />
            <Route
              path="/form-kariawan"
              element={
                <>
                  <PageTitle title="Form kariawan" />
                  <FormKariawan/>
                </>
              }
            />
            <Route
              path="/form-input-kariawan"
              element={
                <>
                  <PageTitle title="Form input kariawan" />
                  <FormInputKariawan onKariawanAdded={handleKariawanAdded}/>
                </>
              }
            />
            <Route
              path="/form-edit-kariawan/:id"
              element={
                <>
                  <PageTitle title="Form edit kariawan" />
                  <FormEditKariawan/>
                </>
              }
            />
            <Route
              path="/form-pengiriman"
              element={
                <>
                  <PageTitle title="Form pengiriaman" />
                  <FormPengiriman/>
                </>
              }
            />
            <Route
              path="/form-input-pengiriman"
              element={
                <>
                  <PageTitle title="Form input pengiriaman" />
                  <FormInputPengiriman 
                    onPengirimanAdded={handlePengirimanAdded}
                    markets={markets}
                    supplies={supplies}
                  />
                </>
              }
            />
            <Route
              path="/form-edit-pengiriman/:id"
              element={
                <>
                  <PageTitle title="Form edit pengiriman" />
                  <FormEditPengiriman/>
                </>
              }
            />
             <Route
              path="/form-penjualan"
              element={
                <>
                  <PageTitle title="Form penjualan" />
                  <FormPenjualan/>
                </>
              }
            />
            <Route
              path="/form-input-penjualan"
              element={
                <>
                  <PageTitle title="Form input penjualan" />
                  <FormInputPenjualan
                    onPenjualanAdded={handlePenjualanAdded}
                    markets={markets}
                    supplies={supplies}
                  />
                </>
              }
            />
           <Route
              path="/form-edit-penjualan/:id"
              element={
                <>
                  <PageTitle title="Form edit penjualan" />
                  <FormEditPenjualan/>
                </>
              }
            />
            <Route
              path="/form-stockproduk"
              element={
                <>
                  <PageTitle title="Form stock produk" />
                  <FormStock/>
                </>
              }
            />
            <Route
              path="/form-barang-masuk"
              element={
                <>
                  <PageTitle title="Form barang masuk" />
                  <FormBarangMasuk/>
                </>
              }
            />
            <Route
              path="/form-input-barang-masuk"
              element={
                <>
                  <PageTitle title="Form input barang masuk" />
                  <FormInputBarangMasuk
                    onBarangMasukAdded={handleBarangMasukAdded}
                    supplies={supplies}
                  />
                </>
              }
            />
              <Route
              path="/form-edit-barang-masuk/:id"
              element={
                <>
                  <PageTitle title="Form edit barang masuk" />
                  <FormEditBarangMasuk/>
                </>
              }
            />
          </Routes>  
        </DefaultLayout>
        } />
      )}
    </Routes>
  );
}

export default App;
