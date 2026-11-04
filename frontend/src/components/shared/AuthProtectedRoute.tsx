import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from '../../features/auth/store/hooks';

const AuthProtectedRoute = () => {
    const user = useAuthSelector(state => state.user.user);
    if (user) return <Navigate to="/dashboard" />
    return (
        <Outlet />
    )
}

export default AuthProtectedRoute