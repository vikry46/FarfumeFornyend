import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";

// Tipe untuk 1 permission
interface Permission {
  id: number;
  name: string;
}

// Tipe props r
interface Props {
  roleId: number;
}

export default function RolePermissionForm({ roleId }: Props) {
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/roles/${roleId}/permissions`);
        const { role, all_permissions } = res.data.data;

        setRoleName(role?.name ?? "-");
        setRolePermissions(
          Array.isArray(role?.permissions)
            ? role.permissions.map((p: Permission) => p.name)
            : []
        );
        setAllPermissions(all_permissions || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (roleId) {
      fetchData();
    }
  }, [roleId]);

  const togglePermission = (permName: string) => {
    setRolePermissions(prev =>
      prev.includes(permName)
        ? prev.filter(p => p !== permName)
        : [...prev, permName]
    );
  };

  const savePermissions = async () => {
    try {
      await axios.patch(`/api/roles/${roleId}/permissions`, {
        permissions: rolePermissions,
      });
      alert("Permissions updated");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan permissions");
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">
        Manage Permissions for Role: {roleName}
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {allPermissions.map((perm) => (
          <label key={perm.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={rolePermissions.includes(perm.name)}
              onChange={() => togglePermission(perm.name)}
            />
            <span>{perm.name}</span>
          </label>
        ))}
      </div>

      <button
        onClick={savePermissions}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Permissions
      </button>
    </div>
  );
}
