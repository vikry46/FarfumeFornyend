import { Link } from "react-router-dom";

interface Market {
    id: number;
    nama: string;
    kode_cabang: string;
}

interface FormMarketBodyProps {
    market: Market;
    index: number;
    onDelete: (id: number) => void; // Prop untuk menghapus data
}

const FormMarketBody: React.FC<FormMarketBodyProps> = ({ market, index, onDelete }) => {
    return (
        <tr>
            <td className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                {index + 1}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                {market.nama}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {market.kode_cabang}
            </td>
            <td className="py-4 px-4">
                
                <Link to={`/form-edit-market/${market.id}`}>
                    <button className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                        Edit
                    </button>
                </Link>
                <button
                    className="ml-2 rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-red"
                    onClick={() => onDelete(market.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default FormMarketBody;


                //tanpa menggunukan input pencarian
                  // markets && markets.map((market,index) => (
