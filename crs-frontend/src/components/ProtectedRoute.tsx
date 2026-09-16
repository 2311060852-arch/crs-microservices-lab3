import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'ADMIN' | 'STUDENT';
}

export default function ProtectedRoute({
                                           children,
                                           requiredRole,
                                       }: ProtectedRouteProps) {
    const { user, isAuthenticated } = useAuth();

    // Chua dang nhap
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Da dang nhap nhung sai quyen
    if (
        requiredRole &&
        user?.role !== requiredRole
    ) {
        return <Navigate to="/courses" replace />;
    }

    return <>{children}</>;
}