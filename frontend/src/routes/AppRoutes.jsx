import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";

import AppLayout from "../components/AppLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import AI from "../pages/AI";
import Groups from "../pages/Groups";
import Calls from "../pages/Calls";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-8xl font-black text-violet-500">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold text-white">
        Page Not Found
      </h2>

      <p className="mt-3 text-slate-400 max-w-md">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
      >
        Back to Home
      </Link>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },

  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },

  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },

  {
    path: "/groups",
    element: (
      <ProtectedRoute>
        <Groups />
      </ProtectedRoute>
    ),
  },

  {
    path: "/calls",
    element: (
      <ProtectedRoute>
        <Calls />
      </ProtectedRoute>
    ),
  },

  {
    path: "/ai",
    element: (
      <ProtectedRoute>
        <AI />
      </ProtectedRoute>
    ),
  },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },

  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
