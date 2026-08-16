import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { OwnerRegistrationPage } from './pages/OwnerRegistrationPage';
import { TransactionPage } from './pages/TransactionPage';
import { HistoryPage } from './pages/HistoryPage';
import { TransactionDetailPage } from './pages/TransactionDetailPage';
import { ReportsPage } from './pages/ReportsPage';
import { OperatorsPage } from './pages/OperatorsPage';
import { AccessDeniedPage } from './pages/AccessDeniedPage';
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
