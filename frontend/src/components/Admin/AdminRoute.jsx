import {useAuthStore} from "../../stores/useAuthStore.js";
import {Loader} from "lucide-react";
import {Navigate, Outlet} from "react-router-dom";

const AdminRoute = () => {
  const {authUser, isCheckingAuth} = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!authUser || authUser.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
