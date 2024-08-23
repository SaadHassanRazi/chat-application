import FullScreenCard from "../../components/FullScreenCard";
import { Outlet, useLocation } from "react-router-dom";
import Link from "../../components/Link";

const AuthLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      <FullScreenCard>
        <FullScreenCard.Body>
          <Outlet />
        </FullScreenCard.Body>
        <FullScreenCard.BelowCard>
          <Link to={isLoginPage ? "/signup" : "/login"}>
            {isLoginPage ? "Create Account" : "Login"}
          </Link>
        </FullScreenCard.BelowCard>
      </FullScreenCard>
    </div>
  );
};

export default AuthLayout;
