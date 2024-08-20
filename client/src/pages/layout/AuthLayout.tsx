import FullScreenCard from "../../components/FullScreenCard";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <FullScreenCard>
        <FullScreenCard.Body>
          <Outlet />
        </FullScreenCard.Body>
        <FullScreenCard.BelowCard>
          <h1>HI</h1>
        </FullScreenCard.BelowCard>
      </FullScreenCard>
    </div>
  );
};

export default AuthLayout;
