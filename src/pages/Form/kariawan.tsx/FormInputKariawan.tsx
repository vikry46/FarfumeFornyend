import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb"
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"

interface Supplie{
    id:number;
    nik:string;
    nama:string;
    kelamin:string;
    jabatan:string;
}

interface FormInputKariawanProps{
    onKariawanAdded:(supplies:Supplie)=>void;
}


const FormInputKariawan:React.FC<FormInputKariawanProps>=({onKariawanAdded})=>{
    const[nama, setNama]= useState("");
    const[nik, setNik]= useState("");
    const[kelamin, setKelamin]= useState("");
    const[jabatan, setJabatan]= useState("");
    const[loading, setLoading]=useState(false);
    const navigate= useNavigate();

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);

        try{
            const response =await axios.post("http://localhost:8000/api/kariawan/store",{
                nama,
                nik,
                jabatan,
                kelamin,
            });

            if(response.status===201){
            const newKariawans= response.data.data;
            onKariawanAdded(newKariawans);
            setNama("");
            setNik("");
            setJabatan("");
            setKelamin("");
            alert("Data Berhasil Ditambahkan");

            //redirect data ke halaman utama
            navigate("/form-kariawan")
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
            <Breadcrumb pageName="Form Input Kariawan"/>
            <div className="flex flex-col gap-9">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white text-center">
                        Form Kariawan 
                    </h3>
                    <br />
                    <Link to="/form-kariawan"
                    className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                    Kembali
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Nik Kariawan
                            </label>
                            <input 
                            type="text" 
                            placeholder="Masukan nik kariawan"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={nik}
                            onChange={(e)=>setNik(e.target.value) }
                            required
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Nama Kariawan
                            </label>
                            <input 
                            type="text" 
                            placeholder="Masukan nama kariawan"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={nama}
                            onChange={(e)=>setNama(e.target.value)}
                            required
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Jenis Kelamin
                            </label>
                            <select
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={kelamin}
                                onChange={(e) => setKelamin(e.target.value)}
                                required
                            >
                                <option value="" disabled>Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Jabatan Kariawan
                            </label>
                            <input 
                            type="text" 
                            placeholder="Masukan jabatan kariawan"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={jabatan}
                            onChange={(e)=>setJabatan(e.target.value)}
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

export default FormInputKariawan