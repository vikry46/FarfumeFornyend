// FormRoleBody.tsx
import { Link, useLocation } from "react-router-dom";

interface Role {
  id: number;
  name: string;
}

interface FormRoleBodyProps {
  role: Role;
  index: number;
  onDelete: (id: number) => void;
  onShowDetail: () => void;
}

const FormRoleBody: React.FC<FormRoleBodyProps> = ({ role, index, onDelete, onShowDetail }) => {
  const location = useLocation();
  const isEditActive = location.pathname.startsWith("/form-edit-role");

  return (
    <tr>
      <td className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white">
        {index + 1}
      </td>
      <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
        {role.name}
      </td>
      <td className="py-4 px-4 flex gap-2 flex-wrap">
        <button
          onClick={onShowDetail}
          className="rounded border border-stroke py-2 px-3 text-sm text-black dark:text-white dark:border-strokedark hover:bg-gray-100"
        >
          Detail
        </button>

        <Link to={`/form-edit-role/${role.id}`}>
          <button
            className={`rounded border border-stroke py-2 px-3 font-medium hover:shadow-1 dark:border-strokedark 
              ${isEditActive ? "bg-primary text-white" : "text-black dark:text-primary"}`}
          >
            Edit
          </button>
        </Link>

        <button
          onClick={() => onDelete(role.id)}
          className="rounded border border-stroke py-2 px-3 font-medium text-red-600 hover:shadow-1 dark:border-strokedark"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default FormRoleBody;
