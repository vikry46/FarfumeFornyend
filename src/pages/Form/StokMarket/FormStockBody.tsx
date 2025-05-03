import { Link } from "react-router-dom";

interface Produk {
  toko: string;
  barang: string;
  stok: number;
}

interface FormStockBodyProps {
  produk: Produk;
  index: number;
}

const FormStockBody: React.FC<FormStockBodyProps> = ({ produk, index }) => {
  return (
    <tr>
      <td className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-center">
        {index + 1}
      </td>
      <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-center">
        {produk.toko}
      </td>
      <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-center">
        {produk.barang}
      </td>
      <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white text-center">
        {produk.stok}
      </td>
    </tr>
  );
};

export default FormStockBody;
