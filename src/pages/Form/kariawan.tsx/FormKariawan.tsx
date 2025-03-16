import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';

interface Kariawan{
    nik: number
    nama: string
    kelamin: string
    jabatan : string
}

const FormKariawan =()=>{
const [kariawan,setKariawan]= useState <Kariawan[]>([]);


    useEffect(()=>{
        axios.get('http://localhost:8000/api/kariawan')
        .then(function(response){
            const kariawan= response.data.data
            setKariawan(kariawan)
            console.log(kariawan)
        })
    })

return(
    <>
        <Breadcrumb pageName="Form Market" />
             <div className='flex flex-col gap-9'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                  <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                    <ol className='header item'>
                      <label className='mb-3 block text-black dark:text-white text-center'>
                        Data Kariawan
                      </label>
                      <Link to="#" className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
                        Tambah Data
                      </Link>
                    </ol>
                  </div>
                  <div className='p-4'>
                    <input
                      type="text "
                      placeholder="Cari berdasarkan nama..."
                      className="w-full rounded border-[1.5px] border-stroke bg-gray-100 py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    //   value={}
                    //   onChange={}
                    />
                  </div>
                  <div className='flex flex-col gap-5.5 p-6.5'>
                    {/* menampilkan data dari api untuk melihat bahwasanya data sudah dikirim*/}
                    {/* <pre className="bg-gray-200 p-3 rounded">{JSON.stringify(supplies, null, 2)}</pre> */}
                    <table className='ui celled table'>
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className='min-w-[1cm] py-4 px-4 font-medium text-blac  k dark:text-white xl:pl-11'>
                            No
                          </th>
                          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            NIk
                          </th>
                          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Nama Kariawan
                          </th>
                          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Jenis Kelamin
                          </th>
                          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Jabatan
                          </th>
                          <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Actions 
                          </th>
                        </tr>
                      </thead>
                        <tbody>

                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
    </>
)
}
export default FormKariawan