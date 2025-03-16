import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb"
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"

interface Supplie{
    id:number;
    nama:string;
    kode_barang:string;
    total_all:string;
}

interface FormInputSuppliesProps{
    onSuppliesAdded:(supplies:Supplie)=>void;
}


const FormInputSupplies:React.FC<FormInputSuppliesProps>=({onSuppliesAdded})=>{
    const[nama, setNama]= useState("");
    const[kodeBarang, setKodeBarang]= useState("");
    const[totalAll, setTotalAll]= useState("");
    const[loading, setLoading]=useState(false);
    const navigate= useNavigate();

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);

        try{
            const response =await axios.post("http://localhost:8000/api/suplly/store",{
                nama,
                kode_barang : kodeBarang,
                total_all : totalAll,
            });

            if(response.status===201){
            const newSupplies= response.data.data;
            onSuppliesAdded(newSupplies);
            setNama("");
            setKodeBarang("");
            setTotalAll("");
            alert("Data Berhasil Ditambahkan");

            //redirect data ke halaman utama
            navigate("/form-supplies")
            }
        } catch(error){
            if(axios.isAxiosError(error))
            console.error("gagal menambahkan data:",error.response?.data);
            else{
                console.error("Unexpected Error:", error);
            }
            alert("Gagal menambahkan data!");
        }finally{
            setLoading(false);
        }
    };

    return(
        <>
            <Breadcrumb pageName="Form Input Supplies"/>
            <div className="flex flex-col gap-9">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white text-center">
                        Form Supplies 
                    </h3>
                    <br />
                    <Link to="/form-supplies"
                    className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                    Kembali
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Nama Supplies
                            </label>
                            <input 
                            type="text" 
                            placeholder="Masukan Nama Supplies"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={nama}
                            onChange={(e)=>setNama(e.target.value) }
                            required
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Kode Barang
                            </label>
                            <input 
                            type="text" 
                            placeholder="Masukan Kode Barang"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={kodeBarang}
                            onChange={(e)=>setKodeBarang(e.target.value)}
                            required
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Total All
                            </label>
                            <input 
                            type="text" 
                            placeholder="Masukan Total Keseluruhan Barang"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={totalAll}
                            onChange={(e)=>setTotalAll(e.target.value)}
                            required
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                            disabled={loading}
                            >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormInputSupplies