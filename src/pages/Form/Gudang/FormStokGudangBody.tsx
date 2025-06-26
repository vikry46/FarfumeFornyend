interface Gudang {
  id_supplie: string;
  nama_supplie: string;
  total_masuk: number;
  total_kirim: number;
  stok_gudang: number;
}

interface FormStokGudangBodyProps {
  gudang: Gudang;
  index: number;
}

const FormStokGudangBody: React.FC<FormStokGudangBodyProps> = ({ gudang, index }) => {
  return (
    <tr>
      <td className="py-4 px-4 font-medium text-black dark:text-white text-center">
        {index + 1}
      </td>
      <td className="py-4 px-4 font-medium text-black dark:text-white text-center">
        {gudang.nama_supplie}
      </td>
      <td className="py-4 px-4 font-medium text-black dark:text-white text-center">
        {gudang.total_masuk}
      </td>
      <td className="py-4 px-4 font-medium text-black dark:text-white text-center">
        {gudang.total_kirim}
      </td>
      <td className="py-4 px-4 font-medium text-black dark:text-white text-center">
        {gudang.stok_gudang}
      </td>
    </tr>
  );
};

export default FormStokGudangBody;
