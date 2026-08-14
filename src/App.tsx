import { Navigate, Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import { Login } from './pages/Login';
import { TransactionPage } from './pages/TransactionPage';
import { useAuthStore } from './store/auth';

interface RequireAuthProps {
  children: ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <TransactionPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
