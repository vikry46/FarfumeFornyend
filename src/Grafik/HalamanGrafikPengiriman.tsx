import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from '../utils/axiosInstance';
import { ApexOptions } from 'apexcharts';

// Interface tipe data per grafik

interface TrenPengiriman {
  bulan: string;
  total_kirim: number;
}

interface PengirimanMarket {
  nama: string;
  total_kirim: number;
}

interface StokSupplier {
  nama: string;
  total_masuk: number;
  total_kirim: number;
  sisa: number;
}

interface PengirimanSupplier {
  supplier: string;  
  total_kirim: number;
}

interface FrekuensiPengiriman {
  bulan: string;
  jumlah_pengiriman: number;
}

const HalamanGrafikPengiriman: React.FC = () => {

  // 1. Tren Pengiriman per Bulan
  const [trenSeries, setTrenSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [trenCategories, setTrenCategories] = useState<string[]>([]);
  const [trenLoading, setTrenLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/pengiriman/grafik/tren-bulanan')
      .then((res) => {
        const data: TrenPengiriman[] = res.data;
        setTrenCategories(data.map(d => d.bulan || ''));
        setTrenSeries([{ name: 'Jumlah Kirim', data: data.map(d => d.total_kirim || 0) }]);
      })
      .catch(err => console.error(err))
      .finally(() => setTrenLoading(false));
  }, []);

  const trenOptions: ApexOptions = {
    chart: { type: 'line', toolbar: { show: false }, fontFamily: 'Satoshi, sans-serif' },
    colors: ['#3C50E0'],
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: trenCategories },
  };

  // 2. Pengiriman per Market
  const [marketSeries, setMarketSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [marketCategories, setMarketCategories] = useState<string[]>([]);
  const [marketLoading, setMarketLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/pengiriman/grafik/per-market')
      .then((res) => {
        const data: PengirimanMarket[] = res.data;
        setMarketCategories(data.map(d => d.nama || ''));
        setMarketSeries([{ name: 'Total Kirim', data: data.map(d => d.total_kirim || 0) }]);
      })
      .catch(err => console.error(err))
      .finally(() => setMarketLoading(false));
  }, []);

  const marketOptions: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Satoshi, sans-serif' },
    colors: ['#13C296'],
    dataLabels: { enabled: true },
    xaxis: { categories: marketCategories },
  };

  // 3. Barang Masuk vs Kirim vs Sisa per Supplier
  const [stokSeries, setStokSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [stokCategories, setStokCategories] = useState<string[]>([]);
  const [stokLoading, setStokLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/pengiriman/grafik/stok-supplier')
      .then((res) => {
        const data: StokSupplier[] = res.data;
        setStokCategories(data.map(d => d.nama || ''));
        setStokSeries([
          { name: 'Masuk', data: data.map(d => d.total_masuk || 0) },
          { name: 'Kirim', data: data.map(d => d.total_kirim || 0) },
          { name: 'Sisa', data: data.map(d => d.sisa || 0) },
        ]);
      })
      .catch(err => console.error(err))
      .finally(() => setStokLoading(false));
  }, []);

  const stokOptions: ApexOptions = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, fontFamily: 'Satoshi, sans-serif' },
    colors: ['#3C50E0', '#13C296', '#FFC23C'],
    dataLabels: { enabled: true },
    xaxis: { categories: stokCategories },
  };

  // 4. Pengiriman per Supplier (Pie Chart)
  const [supSeries, setSupSeries] = useState<number[]>([]);
  const [supLabels, setSupLabels] = useState<string[]>([]);
  const [supLoading, setSupLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/pengiriman/grafik/per-supplier')
      .then((res) => {
        const data: PengirimanSupplier[] = res.data;
        setSupLabels(data.map(d => d.supplier || ''));  // pakai supplier sesuai API
        setSupSeries(data.map(d => d.total_kirim || 0));
      })
      .catch(err => console.error(err))
      .finally(() => setSupLoading(false));
  }, []);

  const supOptions: ApexOptions = {
    chart: { type: 'pie', toolbar: { show: false }, fontFamily: 'Satoshi, sans-serif' },
    labels: supLabels,
    legend: { position: 'bottom' },
  };

  // 5. Frekuensi Pengiriman per Bulan
  const [freqSeries, setFreqSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [freqCategories, setFreqCategories] = useState<string[]>([]);
  const [freqLoading, setFreqLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/pengiriman/grafik/frekuensi')
      .then((res) => {
        const data: FrekuensiPengiriman[] = res.data;
        setFreqCategories(data.map(d => d.bulan || ''));
        setFreqSeries([{ name: 'Frekuensi', data: data.map(d => d.jumlah_pengiriman || 0) }]);
      })
      .catch(err => console.error(err))
      .finally(() => setFreqLoading(false));
  }, []);

  const freqOptions: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Satoshi, sans-serif' },
    colors: ['#FF7A68'],
    dataLabels: { enabled: true },
    xaxis: { categories: freqCategories },
  };

  // Layout Grid Semua Grafik

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Tren Pengiriman */}
      <div className="rounded border border-stroke bg-gray-100 p-5 shadow-md">
        <h2 className="text-lg font-bold mb-4">Tren Pengiriman (Line)</h2>
        {trenLoading ? <p>Loading...</p> : (
          <ReactApexChart options={trenOptions} series={trenSeries} type="line" height={350} />
        )}
      </div>

      {/* Pengiriman per Market */}
      <div className="rounded border border-stroke bg-gray-100 p-5 shadow-md">
        <h2 className="text-lg font-bold mb-4">Pengiriman per Market (Bar)</h2>
        {marketLoading ? <p>Loading...</p> : (
          <ReactApexChart options={marketOptions} series={marketSeries} type="bar" height={350} />
        )}
      </div>

      {/* Barang Masuk vs Kirim vs Sisa */}
      <div className="rounded border border-stroke bg-gray-100 p-5 shadow-md">
        <h2 className="text-lg font-bold mb-4">Stok Supplier (Stacked Bar)</h2>
        {stokLoading ? <p>Loading...</p> : (
          <ReactApexChart options={stokOptions} series={stokSeries} type="bar" height={350} />
        )}
      </div>

      {/* Pengiriman per Supplier */}
      <div className="rounded border border-stroke bg-gray-100 p-5 shadow-md">
        <h2 className="text-lg font-bold mb-4">Pengiriman per Supplier (Pie)</h2>
        {supLoading ? <p>Loading...</p> : (
          <ReactApexChart options={supOptions} series={supSeries} type="pie" height={350} />
        )}
      </div>

      {/* Frekuensi Pengiriman */}
      <div className="rounded border border-stroke bg-gray-100 p-5 shadow-md md:col-span-2">
        <h2 className="text-lg font-bold mb-4">Frekuensi Pengiriman per Bulan (Bar)</h2>
        {freqLoading ? <p>Loading...</p> : (
          <ReactApexChart options={freqOptions} series={freqSeries} type="bar" height={350} />
        )}
      </div>
    </div>
  );
};

export default HalamanGrafikPengiriman;
