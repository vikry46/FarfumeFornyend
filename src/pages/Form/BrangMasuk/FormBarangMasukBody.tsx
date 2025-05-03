import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface BarangMasuk {
    id: number;
    id_supplie: number;
    juml_masuk: number;
    tanggal_masuk: string;
    supplie?: {
        id: number;
        nama: string;
    };
}

interface FormBarangMasukBodyProps {
    barangMasuk: BarangMasuk;
    index: number;
    onDelete: (id: number) => void;
}

const FormBarangMasukBody: React.FC<FormBarangMasukBodyProps> = ({ barangMasuk, index, onDelete }) => {
    const [supplieName, setSupplieName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (barangMasuk.supplie) {
                    setSupplieName(barangMasuk.supplie.nama);
                } else {
                    const supplieResponse = await axios.get(`http://localhost:8000/api/supplie/${barangMasuk.id_supplie}`);
                    setSupplieName(supplieResponse.data.data?.nama || "Tidak ditemukan");
                }

                setLoading(false);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
                setError("Gagal memuat data");
                setLoading(false);
                setSupplieName("Tidak ditemukan");
            }
        };

        fetchData();
    }, [ barangMasuk.id_supplie, barangMasuk.supplie]);

    if (loading) {
        return (
            <tr>
                <td colSpan={6} className="text-center py-4">Memuat data...</td>
            </tr>
        );
    }

    if (error) {
        return (
            <tr>
                <td colSpan={6} className="text-center text-red-500 py-4">{error}</td>
            </tr>
        );
    }

    return (
        <tr>
            <td className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                {index + 1}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {supplieName}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                 {barangMasuk.juml_masuk}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {new Date(barangMasuk.tanggal_masuk).toLocaleDateString()}
            </td>
            <td className="py-4 px-4">
                <Link to={`/form-edit-barang-masuk/${barangMasuk.id}`}>
                    <button className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                        Edit
                    </button>
                </Link>
                <button
                    className="ml-2 rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-red"
                    onClick={() => onDelete(barangMasuk.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default FormBarangMasukBody;