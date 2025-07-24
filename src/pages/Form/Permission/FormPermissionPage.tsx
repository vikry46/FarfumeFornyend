import { useParams } from "react-router-dom";           
import RolePermissionForm from "./RolePermissionForm"; 

function FormPermissionPage() {
  const { roleID } = useParams<{ roleID: string }>();

  if (!roleID) return <div>Role ID tidak ditemukan</div>;

  return (
    <>
      <RolePermissionForm roleId={parseInt(roleID, 10)} />
    </>
  );
}

export default FormPermissionPage;
