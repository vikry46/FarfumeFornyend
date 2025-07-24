import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';

// Tipe data tren penjualan
interface TrenPenjualanData {
  tanggal: string;
  total_terjual: number;
}

// Tipe data per produk
interface GrafikProdukData {
  produk: string;
  total_terjual: number;
}

// Tipe data revenue
interface GrafikRevenueData {
  tanggal: string;
  revenue: number;
}

// Tipe data per market
interface GrafikMarketData {
  market: string;
  total_terjual: number;
}

const HalamanGrafik: React.FC = () => {
  // ====== Tren Penjualan ======
  const [trenSeries, setTrenSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [trenCategories, setTrenCategories] = useState<string[]>([]);
  const [trenLoading, setTrenLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/penjualan/grafik/tren')
      .then((res) => {
        const data: TrenPenjualanData[] = res.data;
        setTrenCategories(data.map(d => d.tanggal));
        setTrenSeries([{ name: 'Total Terjual', data: data.map(d => d.total_terjual) }]);
      })
      .catch(err => console.error('Error fetch tren penjualan:', err))
      .finally(() => setTrenLoading(false));
  }, []);

  const trenOptions: ApexOptions = {
    chart: { type: 'line', toolbar: { show: false }, fontFamily: 'Satoshi, sans-serif' },
    colors: ['#3C50E0'],
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: trenCategories },
  };

  // ====== Grafik Per Produk ======
  const [produkSeries, setProdukSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [produkCategories, setProdukCategories] = useState<string[]>([]);
  const [produkLoading, setProdukLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/penjualan/grafik/produk')
      .then((res) => {
        const data: GrafikProdukData[] = res.data;
        setProdukCategories(data.map(d => d.produk));
        setProdukSeries([{ name: 'Total Terjual', data: data.map(d => d.total_terjual) }]);
      })
      .catch(err => console.error('Error fetch grafik produk:', err))
      .finally(() => setProdukLoading(false));
  }, []);

  const produkOptions: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Satoshi, sans-serif' },
    colors: ['#3C50E0'],
    dataLabels: { enabled: true },
    xaxis: { categories: produkCategories },
  };

  // ====== Grafik Revenue ======
  const [revenueSeries, setRevenueSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [revenueCategories, setRevenueCategories] = useState<string[]>([]);
  const [revenueLoading, setRevenueLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/penjualan/grafik/revenue')
      .then((res) => {
        const data: GrafikRevenueData[] = res.data;
        setRevenueCategories(data.map(d => d.tanggal));
        setRevenueSeries([{ name: 'Revenue', data: data.map(d => d.revenue) }]);
      })
      .catch(err => console.error('Error fetch grafik revenue:', err))
      .finally(() => setRevenueLoading(false));
  }, []);

  const revenueOptions: ApexOptions = {
    chart: { type: 'area', toolbar: { show: false }, fontFamily: 'Satoshi, sans-serif' },
    colors: ['#13C296'],
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: revenueCategories },
  };

  // ====== Grafik Per Market ======
  const [marketSeries, setMarketSeries] = useState<number[]>([]);
  const [marketLabels, setMarketLabels] = useState<string[]>([]);
  const [marketLoading, setMarketLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/penjualan/grafik/market')
      .then((res) => {
        const data: GrafikMarketData[] = res.data;
        setMarketLabels(data.map(d => d.market));
        setMarketSeries(data.map(d => d.total_terjual));
      })
      .catch(err => console.error('Error fetch grafik market:', err))
      .finally(() => setMarketLoading(false));
  }, []);

  const marketOptions: ApexOptions = {
    chart: { type: 'pie', toolbar: { show: false }, fontFamily: 'Satoshi, sans-serif' },
    labels: marketLabels,
    legend: { position: 'bottom' },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Tren Penjualan */}
      <div className="rounded-sm border border-stroke bg-gray-100 px-5 pt-7.5 pb-5 shadow-default">
        <h2 className="text-lg font-bold mb-4">Tren Penjualan (Line)</h2>
        {trenLoading ? <p>Loading...</p> : (
          <ReactApexChart options={trenOptions} series={trenSeries} type="line" height={350} />
        )}
      </div>

      {/* Penjualan Per Produk */}
      <div className="rounded-sm border border-stroke bg-gray-100 px-5 pt-7.5 pb-5 shadow-default">
        <h2 className="text-lg font-bold mb-4">Penjualan Per Produk (Bar)</h2>
        {produkLoading ? <p>Loading...</p> : (
          <ReactApexChart options={produkOptions} series={produkSeries} type="bar" height={350} />
        )}
      </div>

      {/* Revenue */}
      <div className="rounded-sm border border-stroke bg-gray-100 px-5 pt-7.5 pb-5 shadow-default">
        <h2 className="text-lg font-bold mb-4">Pendapatan Total (Area)</h2>
        {revenueLoading ? <p>Loading...</p> : (
          <ReactApexChart options={revenueOptions} series={revenueSeries} type="area" height={350} />
        )}
      </div>

      {/* Penjualan Per Market */}
      <div className="rounded-sm border border-stroke bg-gray-100 px-5 pt-7.5 pb-5 shadow-default">
        <h2 className="text-lg font-bold mb-4">Penjualan Per Market (Pie)</h2>
        {marketLoading ? <p>Loading...</p> : (
          <ReactApexChart options={marketOptions} series={marketSeries} type="pie" height={350} />
        )}
      </div>
    </div>
  );
};

export default HalamanGrafik;
