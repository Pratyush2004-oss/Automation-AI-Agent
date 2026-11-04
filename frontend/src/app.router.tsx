import { createBrowserRouter, Outlet } from "react-router-dom"
import ProtectedRoute from "./components/shared/ProtectedRoute"
import DashboardPage from "./features/dashboard/pages/DashboardPage"
import LoginPage from "./features/auth/pages/LoginPage"
import AuthProtectedRoute from "./components/shared/AuthProtectedRoute"

const RootLayout = () => (
    <Outlet />
)

export const Router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <>Home</>
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute />,
                children: [{
                    index: true,
                    element: <DashboardPage />
                }]
            },
            {
                path: "/login",
                element: <AuthProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <LoginPage />
                    }
                ]
            },
            {
                path: "*",
                element: <>404</>
            }
        ]
    }
])