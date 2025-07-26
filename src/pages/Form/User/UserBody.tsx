// UserBody.tsx
import { Link, useLocation } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string | null; 
}

interface UserBodyProps {
  user: User;
  index: number;
  onDelete: (id: number) => void;
  onShowDetail: () => void;
}

const UserBody: React.FC<UserBodyProps> = ({ user, index, onDelete}) => {
  const location = useLocation();
  const isEditActive = location.pathname.startsWith("/form-edit-user");

  return (
    <tr>
      <td className="min-w-[1cm] py-4 px-4 font-medium text-black dark:text-white">{index + 1}</td>
      <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">{user.name}</td>
      <td className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">{user.email}</td>
      <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">{user.role ?? "-"}</td>
      <td className="py-4 px-4 flex gap-2 flex-wrap">


        <Link to={`/form-edit-user/${user.id}`}>
          <button
            className={`rounded border border-stroke py-2 px-3 font-medium hover:shadow-1 dark:border-strokedark 
              ${isEditActive ? "bg-primary text-white" : "text-black dark:text-primary"}`}
          >
            Edit
          </button>
        </Link>

        <button
          onClick={() => onDelete(user.id)}
          className="rounded border border-stroke py-2 px-3 font-medium text-red-600 hover:shadow-1 dark:border-strokedark"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserBody;
