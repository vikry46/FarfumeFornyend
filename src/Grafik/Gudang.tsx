import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from '../utils/axiosInstance';
import { ApexOptions } from 'apexcharts';

// Tipe data response dari Laravel
interface SupplieData {
  id_supplie: number;
  nama_supplie: string;
  total_masuk: number;
  total_kirim: number;
  stok_gudang: number;
}

const Gudang: React.FC = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios.get('/api/stock-gudang')
      .then((res) => {
        const apiData: SupplieData[] = res.data.data;

        const labels = apiData.map((item) => item.nama_supplie);
        const stokGudang = apiData.map((item) => item.stok_gudang);

        setCategories(labels);
        setSeries([
          {
            name: 'Stok Gudang',
            data: stokGudang,
          },
        ]);
      })
      .catch((err) => console.error(err));
  }, []);

  // Buat options dinamis per render
  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 2,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-gray-100 px-5 pt-7.5 pb-5 shadow-default">
      <h2 className="text-lg font-bold mb-4">Grafik Stok Gudang per Supplie</h2>

      {series.length > 0 && categories.length > 0 ? (
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      ) : (
        <p>Loading grafik stok gudang...</p>
      )}
    </div>
  );
};

export default Gudang;
