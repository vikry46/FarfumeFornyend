import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from '../utils/axiosInstance';
import { ApexOptions } from 'apexcharts';

interface Dataset {
  label: string;
  data: number[];
}

interface StokResponse {
  labels: string[];
  datasets: Dataset[];
}

const HalamanGrafikStokMarket: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/produk-market/grafik-stok')
      .then((res) => {
        const data: StokResponse = res.data;
        setCategories(data.labels);
        const newSeries = data.datasets.map((ds) => ({
          name: ds.label,
          data: ds.data
        }));
        setSeries(newSeries);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const options: ApexOptions = {
    chart: { 
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Satoshi, sans-serif',
    },
    colors: ['#3C50E0', '#13C296', '#FFC23C', '#FF7A68', '#FFB200'],
    dataLabels: { enabled: true },
    xaxis: { categories },
    legend: { position: 'bottom' },
    tooltip: { shared: true, intersect: false },
    plotOptions: {
      bar: { horizontal: false }
    },
  };

  return (
    <div className="p-6">
      <div className="rounded border border-stroke bg-gray-100 p-5 shadow-md">
        <h2 className="text-lg font-bold mb-4">Grafik Stok Barang per Market</h2>
        {loading ? <p>Loading...</p> : (
          <ReactApexChart options={options} series={series} type="bar" height={400} />
        )}
      </div>
    </div>
  );
};

export default HalamanGrafikStokMarket;
