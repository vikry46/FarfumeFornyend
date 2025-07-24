import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

export default function RolePermissionForm({ roleId }: { roleId: number }) {
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    // Ambil semua permission
    axios.get("/permissions").then(res => setPermissions(res.data));
    // Ambil role + permissions yang sudah dimiliki
    axios.get(`/roles/${roleId}`).then(res => {
      setRoleName(res.data.name);
      const p = res.data.permissions?.map((p: any) => p.name) || [];
      setRolePermissions(p);
    });
  }, [roleId]);

  const togglePermission = (permName: string) => {
    if (rolePermissions.includes(permName)) {
      setRolePermissions(rolePermissions.filter(p => p !== permName));
    } else {
      setRolePermissions([...rolePermissions, permName]);
    }
  };

  const savePermissions = async () => {
    await axios.patch(`/roles/${roleId}/assign-permission`, {
      permissions: rolePermissions,
    });
    alert("Permissions updated");
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-2">Manage Permissions for Role: {roleName}</h3>
      <div className="flex flex-col space-y-2">
        {permissions.map((perm: any) => (
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
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Permissions
      </button>
    </div>
  );
}
