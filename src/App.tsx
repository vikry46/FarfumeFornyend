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


interface Market {
  id: number;
  nama: string;
  kode_cabang: string;
}

interface Supplie {
  id: number;
  nama: string;
  kode_barang: string;
  total_all: string;
}


function App() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [supplies, setSupplies] = useState<Supplie[]>([]);

  // Fungsi untuk menangani penambahan market baru
  const handleMarketAdded = (newMarket: Market) => {
    setMarkets((prevMarkets) => [...prevMarkets, newMarket]);
  };
  
  const handleSuppliesAdded = (newSupplies: Supplie) => {
    setSupplies((prevSupplies) => [...prevSupplies, newSupplies]);
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
                  <PageTitle title="Form supplies" />
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
          </Routes>
          
        </DefaultLayout>
        } />
      )}
    </Routes>
  );
}

export default App;
