import { createBrowserRouter, Outlet } from "react-router-dom"
import ProtectedRoute from "./components/shared/ProtectedRoute"
import DashboardPage from "./features/dashboard/pages/DashboardPage"
import LoginPage from "./features/auth/pages/LoginPage"
import AuthProtectedRoute from "./components/shared/AuthProtectedRoute"
import AgentsPage from "./features/dashboard/pages/AgentsPage"
import IntegrationPage from "./features/dashboard/pages/IntegrationPage"
import CreateAgent from "./features/dashboard/pages/CreateAgent"
import HomePage from "./components/shared/HomePage"

const RootLayout = () => (
    <Outlet />
)

export const Router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <AuthProtectedRoute />,
                children: [{
                    index: true,
                    element: <HomePage />
                }]
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute />,
                children: [{
                    index: true,
                    element: <DashboardPage />
                }, {
                    path: "agents",
                    element: <AgentsPage />
                }, {
                    path: "integrations",
                    element: <IntegrationPage />
                }, {
                    path: "agents/create",
                    element: <CreateAgent />
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