import { Navigate, Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import { Login } from './pages/Login';
import { TransactionPage } from './pages/TransactionPage';
import { HistoryPage } from './pages/HistoryPage';
import { TransactionDetailPage } from './pages/TransactionDetailPage';
import { useAuthStore } from './store/auth';
import { useNetworkListener } from './store/connection';

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

  useNetworkListener();

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
      <Route
        path="/history"
        element={
          <RequireAuth>
            <HistoryPage />
          </RequireAuth>
        }
      />
      <Route
        path="/history/:transactionId"
        element={
          <RequireAuth>
            <TransactionDetailPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
