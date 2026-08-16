import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { OwnerRegistrationPage } from './pages/auth/OwnerRegistrationPage';
import { TransactionPage } from './pages/operator/TransactionPage';
import { HistoryPage } from './pages/shared/HistoryPage';
import { TransactionDetailPage } from './pages/shared/TransactionDetailPage';
import { ReportsPage } from './pages/owner/ReportsPage';
import { OperatorsPage } from './pages/owner/OperatorsPage';
import { AccessDeniedPage } from './pages/shared/AccessDeniedPage';
import { RequireRole } from './components/RequireRole';
import { useAuthStore } from './store/auth';
import { getDefaultRoute } from './utils/auth';
import { useNetworkListener } from './store/connection';

function App() {
  const user = useAuthStore((state) => state.user);

  useNetworkListener();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to={getDefaultRoute(user.role)} replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to={getDefaultRoute(user.role)} replace /> : <OwnerRegistrationPage />}
      />
      <Route
        path="/"
        element={
          <RequireRole roles={['OPERATOR']}>
            <TransactionPage />
          </RequireRole>
        }
      />
      <Route
        path="/history"
        element={
          <RequireRole roles={['OWNER', 'OPERATOR']}>
            <HistoryPage />
          </RequireRole>
        }
      />
      <Route
        path="/history/:transactionId"
        element={
          <RequireRole roles={['OWNER', 'OPERATOR']}>
            <TransactionDetailPage />
          </RequireRole>
        }
      />
      <Route
        path="/reports"
        element={
          <RequireRole roles={['OWNER']}>
            <ReportsPage />
          </RequireRole>
        }
      />
      <Route
        path="/operators"
        element={
          <RequireRole roles={['OWNER']}>
            <OperatorsPage />
          </RequireRole>
        }
      />
      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
