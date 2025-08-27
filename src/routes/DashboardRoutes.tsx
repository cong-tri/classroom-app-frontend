//import routes files
import { createBrowserRouter } from "react-router";
// LAYOUT
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import RootLayout from "../layouts/RootLayout";
// MIDDLEWARE
import { AuthMiddleware } from "../contexts/AuthMiddleware";
// PAGES
import SignIn from "../pages/auth/SignIn";
import ManagementStudentsPage from "../pages/manage_students";
import ManagementLessonsPage from "../pages/manage_lessons";

export const router = createBrowserRouter([
  {
    element: <AuthMiddleware />,
    children: [
      {
        id: "root",
        path: "/",
        Component: RootLayout,
        // errorElement: <NotFound />
        children: [
          {
            id: "manage-students",
            path: "/manage-students",
            Component: ManagementStudentsPage,
          },
          {
            id: "manage-lessons",
            path: "/manage-lessons",
            Component: ManagementLessonsPage,
          },
        ],
      },

      // AUTH
      {
        id: "auth",
        path: "/auth",
        Component: AuthenticationLayout,
        children: [
          {
            id: "sign-in",
            path: "sign-in",
            Component: SignIn,
          },
          //   {
          //     id: "forget-password",
          //     path: "forget-password",
          //     Component: ForgetPassword,
          //   },
        ],
      },
    ],
  },
]);
