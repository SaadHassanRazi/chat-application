import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthLayout from "./pages/layout/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";

// Define ContextWrapper first
const ContextWrapper = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

// Now use ContextWrapper in the router
const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

export default router;
