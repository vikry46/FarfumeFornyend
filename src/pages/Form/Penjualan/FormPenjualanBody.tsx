import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Penjualan {
    id: number;
    id_market: number;
    id_supplie: number;
    terjual: number;
    estimasi_botol: number;
    ukuran_botol: number;
    harga: number;
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

interface FormPenjualanBodyProps {
    penjualan: Penjualan;
    index: number;
    onDelete: (id: number) => void;
}

const FormPenjualanBody: React.FC<FormPenjualanBodyProps> = ({ penjualan, index, onDelete }) => {
    const [marketName, setMarketName] = useState<string>("");
    const [supplieName, setSupplieName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (penjualan.market) {
                    setMarketName(penjualan.market.nama);
                } else {
                    const marketResponse = await axios.get(`http://localhost:8000/api/penjualan/${penjualan.id_market}`);
                    setMarketName(marketResponse.data.data?.nama || "Tidak ditemukan");
                }

                if (penjualan.supplie) {
                    setSupplieName(penjualan.supplie.nama);
                } else {
                    const supplieResponse = await axios.get(`http://localhost:8000/api/penjualan/${penjualan.id_supplie}`);
                    setSupplieName(supplieResponse.data.data?.nama || "Tidak ditemukan");
                }

                setLoading(false);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
                setError("Gagal memuat data");
                setLoading(false);
                setMarketName("Tidak ditemukan");
                setSupplieName("Tidak ditemukan");
            }
        };

        fetchData();
    }, [penjualan.id_market, penjualan.id_supplie, penjualan.market, penjualan.supplie]);

    if (loading) {
        return (
            <tr>
                <td colSpan={8} className="text-center py-4">Memuat data...</td>
            </tr>
        );
    }

    if (error) {
        return (
            <tr>
                <td colSpan={8} className="text-center text-red-500 py-4">{error}</td>
            </tr>
        );
    }

    return (
        <tr>
            <td className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">{index + 1}</td>
            <td className="py-4 px-4 text-black dark:text-white text-center">{marketName}</td>
            <td className="py-4 px-4 text-black dark:text-white text-center">{supplieName}</td>
            <td className="py-4 px-4 text-black dark:text-white text-center">{penjualan.terjual}</td>
            <td className="py-4 px-4 text-black dark:text-white text-center">{penjualan.estimasi_botol}</td>
            <td className="py-4 px-4 text-black dark:text-white text-center">{penjualan.ukuran_botol} ml</td>
            <td className="py-4 px-4 text-black dark:text-white text-center">{penjualan.harga}</td>
            <td className="py-4 px-4 text-black dark:text-white text-center">{new Date(penjualan.tanggal).toLocaleDateString()}</td>
            <td className="py-4 px-4">
                <Link to={`/form-edit-penjualan/${penjualan.id}`}>
                    <button className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                        Edit
                    </button>
                </Link>
                <button
                    className="ml-2 rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-red"
                    onClick={() => onDelete(penjualan.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default FormPenjualanBody;
