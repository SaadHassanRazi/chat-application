import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthLayout from "./pages/layout/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import RootLayout from "./pages/layout/RootLayout";
import Home from "./pages/Home";
import New from "./pages/channel/New";

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
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "/channel",
            children: [
              {
                path: "new",
                element: <New />,
              },
            ],
          },
        ],
      },
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
