import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';

interface Permission {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Props {
  roleId: number;
}

export default function RolePermissionForm({ roleId }: Props) {
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [role, setRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, [roleId]);

  const fetchData = async () => {
    const permRes = await axios.get('/api/permissions');
    setAllPermissions(permRes.data);

    const roleRes = await axios.get(`/api/roles/${roleId}`);
    setRole(roleRes.data);

    setSelectedPermissions(roleRes.data.permissions.map((p: Permission) => p.name));
  };

  const handleCheckboxChange = (permissionName: string) => {
    if (selectedPermissions.includes(permissionName)) {
      setSelectedPermissions(selectedPermissions.filter(name => name !== permissionName));
    } else {
      setSelectedPermissions([...selectedPermissions, permissionName]);
    }
  };

  const handleSubmit = async () => {
    await axios.post(`/api/roles/${roleId}/permissions`, {
      permissions: selectedPermissions
    });
    alert('Permissions updated!');
    fetchData();
  };

  return (
    <div className="border border-stroke rounded p-4 shadow-sm">
      <h3 className="font-semibold mb-3">Role: {role?.name}</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {allPermissions.map(permission => (
          <label key={permission.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedPermissions.includes(permission.name)}
              onChange={() => handleCheckboxChange(permission.name)}
            />
            {permission.name}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90"
      >
        Save Permissions
      </button>
    </div>
  );
}
