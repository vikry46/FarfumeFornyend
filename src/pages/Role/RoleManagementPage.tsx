import { useAuth } from '../../hooks/useAuth';
import RoleForm from '../../components/Role/Form';
import RolePermissionForm from '../../components/Role/RolePermissionForm';
import UserRoleForm from '../../components/Role/UserRoleForm';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

export default function RoleManagementPage() {
  const { user } = useAuth();

  // TODO: Buat dynamic ID pakai dropdown 
  const roleId = 1;
  const userId = 2;

  return (
    <>
      <Breadcrumb pageName="Role & Permission Management" />

      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Role & Permission Management</h1>
        <p className="mb-6">Hello, {user?.name}! Manage Roles & Permissions below:</p>

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-2">1️⃣ Role List & Create</h2>
          <RoleForm />
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-2">2️⃣ Assign Permissions to Role</h2>
          <RolePermissionForm roleId={roleId} />
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-2">3️⃣ Assign Roles to User</h2>
          <UserRoleForm userId={userId} />
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-2">4️⃣ Permission List</h2>
          <p className="text-gray-600">Read-only view of all permissions (opsional).</p>
          {/* Bisa buat komponen khusus kalau mau */}
        </section>
      </div>
    </>
  );
}
