import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import React, { useState, useEffect } from "react";

const FormEditSupplies=()=>{
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    //state untuk input
    const[nama, setNama]= useState("");
    const[kodeBarang, setKodeBarang]= useState("");
    const[totalAll, setTotalAll]= useState("");
     
    const[loading, setLoading]= useState(false);
    
    useEffect(()=>{
        if (!id) return;

        const fetchSupplie = async () =>{
            try{
                const response = await axios.get (`http://localhost:8000/api/suplly/show/${id}`);
                if (response.data && response.data.data){
                    setNama(response.data.data.nama)
                    setKodeBarang(response.data.data.kode_barang)
                    setTotalAll(response.data.data.total_all)
                }else{
                    console.log("Data tidak ditemukan:",response.data)
                }
            } catch (error){
                console.log("Gagal mengambil data supplie",error)
            }
        }
        fetchSupplie()
    },[id])

    //hundle submit untuk update data
    const handleSubmit =async(e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(true);

        try{
            await axios.patch(`http://localhost:8000/api/suplly/update/${id}`,{
                nama,
                kode_barang :kodeBarang,
                total_all : totalAll
            });
            alert("Data berhasil di perbaharui!");
            navigate("/form-supplies")
        } catch (error){
            console.error("Gagal memperbarui data:",error)
            alert("Gagal memperbarui data!")
        } finally{
            setLoading(false)
        }
    }


    return(
    <>
    <Breadcrumb pageName="Form Edit Supplies"/>
    <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                <h3 className="font-medium text-black dark:text-white"> Form Edit</h3>
                <button
                onClick={() => navigate("/form-supplies")}
                className="rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                    Kembali
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">Nama Supplie</label>
                        <input
                        type="text"
                        placeholder="Masukkan Nama Supplie"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">Kode Barang</label>
                        <input
                        type="text"
                        placeholder="Masukkan Kode Barang"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={kodeBarang}
                        onChange={(e) => setKodeBarang(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">Total Supplie</label>
                        <input
                        type="text"
                        placeholder="Masukkan Total Supplie"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={totalAll}
                        onChange={(e) => setTotalAll(e.target.value)}
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
    </div>
    </>
    )
}

export default FormEditSupplies