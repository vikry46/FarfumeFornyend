import { Link } from "react-router-dom";

interface Kariawan{
    id:number
    nik: number
    nama: string
    kelamin: string
    jabatan : string
}
interface FormKariawanBodyProps{
    kariawan: Kariawan
    index:number
    onDelete: (id:number)=>void;
}


const FormKariawanBody : React.FC<FormKariawanBodyProps> = ({kariawan,index,onDelete}) => {
    return (
        <tr>
            <td className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
               {index + 1}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                {kariawan.nik}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {kariawan.nama}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {kariawan.kelamin}
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {kariawan.jabatan}
            </td>
            <td className="py-4 px-4">
                
                <Link to={`/form-edit-kariawan/${kariawan.id}`}>
                    <button className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                        Edit
                    </button>
                </Link>
                <button
                    className="ml-2 rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-red"
                    onClick={()=>onDelete(kariawan.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default FormKariawanBody;
