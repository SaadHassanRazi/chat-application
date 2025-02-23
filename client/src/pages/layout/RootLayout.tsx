import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RootLayout = () => {
    const {user} = useAuth()
    if(user == null) return <Navigate to='/login'/>
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
