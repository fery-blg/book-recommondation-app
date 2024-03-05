import { AdminAuth } from "../layouts/routing/Admin";
import Admin from "./Admin";

function AdminIndex() {
  return (
    <AdminAuth>
      <Admin />
    </AdminAuth>
  );
}

export default AdminIndex;
