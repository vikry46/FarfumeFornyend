import { Link } from "react-router-dom";

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

interface FormPengirimanBodyProps {
    pengiriman: Pengiriman;
    index: number;
    onDelete: (id: number) => void;
}

const FormPengirimanBody: React.FC<FormPengirimanBodyProps> = ({ pengiriman, index, onDelete }) => {
    return (
        <tr>
            <td className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                {index + 1}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {pengiriman.market?.nama || 'Tidak ditemukan'}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {pengiriman.supplie?.nama || 'Tidak ditemukan'}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {pengiriman.jumlah_kirim}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {new Date(pengiriman.tanggal).toLocaleDateString()}
            </td>
            <td className="py-4 px-4">
                <Link to={`/form-edit-pengiriman/${pengiriman.id}`}>
                    <button className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                        Edit
                    </button>
                </Link>
                <button
                    className="ml-2 rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-red"
                    onClick={() => onDelete(pengiriman.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default FormPengirimanBody;
