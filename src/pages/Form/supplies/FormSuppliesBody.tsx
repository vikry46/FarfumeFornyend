import {Link} from "react-router-dom"

interface Supplie {
    id: number;
    nama: string;
    kode_barang: string;
    total_all: string;
}

interface FormMarketBodyProps{
    supplies : Supplie
    index: number;
    onDelete: (id:number)=>void; // prop untuk mengambil data

}

const FormSuppliesBody: React.FC<FormMarketBodyProps> =({supplies, index, onDelete}) =>{
 return(
        <tr>
            <td className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
               {index + 1}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
               {supplies.nama}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
               {supplies.kode_barang}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {supplies.total_all}
            </td>
            <td className="py-4 px-4">
                
                <Link to={`/form-edit-supplies/${supplies.id}`}>
                    <button className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                        Edit
                    </button>
                </Link>
                    <button
                        className="ml-2 rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-red" 
                        onClick={()=>onDelete(supplies.id)}>
                        Delete
                    </button>
            </td>
        </tr>
 )
}

export default FormSuppliesBody
