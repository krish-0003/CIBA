import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import StepperPage from "../pages/StepperPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <StepperPage />,
      },
    ],
  },
]);

export default router;
