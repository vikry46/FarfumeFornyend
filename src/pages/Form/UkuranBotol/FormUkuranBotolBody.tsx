import { Link } from "react-router-dom";

interface UkuranBotol {
  id: number;
  ukuran_botol: number;
}

interface FormUkuranBotolBodyProps {
  data: UkuranBotol;
  index: number;
  onDelete: (id: number) => void;
}

const FormUkuranBotolBody: React.FC<FormUkuranBotolBodyProps> = ({ data, index, onDelete }) => {
  return (
    <tr>
      <td className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
        {index + 1}
      </td>
      <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
        {data.ukuran_botol}
      </td>
      <td className="py-4 px-4">
        <Link to={`/form-edit-ukuran-botol/${data.id}`}>
          <button className="rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-primary">
            Edit
          </button>
        </Link>
        <button
          className="ml-2 rounded border border-stroke py-2 px-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-red"
          onClick={() => onDelete(data.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default FormUkuranBotolBody;
