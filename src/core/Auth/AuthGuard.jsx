import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthGuard = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
