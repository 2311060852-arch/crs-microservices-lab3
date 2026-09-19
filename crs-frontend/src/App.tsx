import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import ApiKeyPage from './pages/ApiKeyPage';
import RegisterCoursePage from './pages/RegisterCoursePage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>

                <Navbar />

                <Routes>

                    {/* Trang mac dinh */}
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/courses"
                                replace
                            />
                        }
                    />

                    {/* Dang nhap */}
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    {/* Danh sach mon hoc */}
                    <Route
                        path="/courses"
                        element={<CoursesPage />}
                    />

                    {/* ADMIN - Quan tri mon hoc */}
                    <Route
                        path="/admin/courses"
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <AdminCoursesPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* ADMIN - Quan ly API Key */}
                    <Route
                        path="/admin/api-keys"
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <ApiKeyPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* STUDENT - Dang ky hoc phan */}
                    <Route
                        path="/register-course"
                        element={
                            <ProtectedRoute requiredRole="STUDENT">
                                <RegisterCoursePage />
                            </ProtectedRoute>
                        }
                    />

                    {/* STUDENT - Mon hoc da dang ky */}
                    <Route
                        path="/my-registrations"
                        element={
                            <ProtectedRoute requiredRole="STUDENT">
                                <MyRegistrationsPage />
                            </ProtectedRoute>
                        }
                    />

                </Routes>

            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;