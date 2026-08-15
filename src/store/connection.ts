import { useEffect } from 'react';
import { create } from 'zustand';

export type NetworkStatus = 'online' | 'offline';

export type BackendStatus = 'unknown' | 'reachable' | 'unreachable';

interface ConnectionStore {
  networkStatus: NetworkStatus;
  backendStatus: BackendStatus;
  setNetworkStatus: (status: NetworkStatus) => void;
  setBackendStatus: (status: BackendStatus) => void;
}

export const useConnectionStore = create<ConnectionStore>((set) => ({
  networkStatus: navigator.onLine ? 'online' : 'offline',
  backendStatus: 'unknown',
  setNetworkStatus: (status) => set({ networkStatus: status }),
  setBackendStatus: (status) => set({ backendStatus: status }),
}));

export interface ConnectionState {
  kind: 'offline' | 'connected' | 'backend-unreachable' | 'checking';
  label: string;
}

export function getConnectionState(
  network: NetworkStatus,
  backend: BackendStatus
): ConnectionState {
  if (network === 'offline') {
    return { kind: 'offline', label: 'Offline' };
  }
  if (backend === 'reachable') {
    return { kind: 'connected', label: 'Connected' };
  }
  if (backend === 'unreachable') {
    return { kind: 'backend-unreachable', label: 'Backend unavailable' };
  }
  return { kind: 'checking', label: 'Checking connection' };
}

export function useNetworkListener() {
  useEffect(() => {
    const handleOnline = () => {
      useConnectionStore.getState().setNetworkStatus('online');
    };
    const handleOffline = () => {
      useConnectionStore.getState().setNetworkStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
}
