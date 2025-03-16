import { Link } from "react-router-dom";



const FormMarketBody = () => {
    return (
        <tr>
            <td className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
               
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                
            </td>
            <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                
            </td>
            <td className="py-4 px-4">
                
                <Link to="">
                    <button className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                        Edit
                    </button>
                </Link>
                <button
                    className="ml-2 rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-red"
                    // onClick={}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default FormMarketBody;
