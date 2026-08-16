import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  getConnectionState,
  useConnectionStore,
  type BackendStatus,
  type NetworkStatus,
} from '../store/connection';

const DOT_COLOR: Record<string, string> = {
  offline: 'bg-slate-400',
  connected: 'bg-emerald-500',
  'backend-unreachable': 'bg-red-500',
  checking: 'bg-amber-500',
};

const NETWORK_OPTIONS: { value: NetworkStatus; label: string }[] = [
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' },
];

const BACKEND_OPTIONS: { value: BackendStatus; label: string }[] = [
  { value: 'unknown', label: 'Unknown' },
  { value: 'reachable', label: 'Reachable' },
  { value: 'unreachable', label: 'Unreachable' },
];

export const ConnectionStatus: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const networkStatus = useConnectionStore((state) => state.networkStatus);
  const backendStatus = useConnectionStore((state) => state.backendStatus);
  const setNetworkStatus = useConnectionStore((state) => state.setNetworkStatus);
  const setBackendStatus = useConnectionStore((state) => state.setBackendStatus);

  const state = getConnectionState(networkStatus, backendStatus);

  return (
    <>
      {/* Simulation Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="relative flex-shrink-0">
        {/* Status Badge */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-white text-gray-800 rounded-full pl-3 pr-2 py-1.5 shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-white/60 cursor-pointer"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={`Connection status: ${state.label}`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${DOT_COLOR[state.kind]}`} />
          <span className="text-[11px] font-bold tracking-wide">
            {state.label}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Simulation Popover */}
        {isOpen && (
          <div
            role="dialog"
            aria-label="Connection simulation"
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 flex flex-col gap-4"
          >
            {/* Network */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Network
              </span>
              <div className="flex gap-1">
                {NETWORK_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setNetworkStatus(option.value)}
                    aria-pressed={networkStatus === option.value}
                    className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue ${
                      networkStatus === option.value
                        ? 'bg-brand-blue text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Backend
              </span>
              <div className="flex flex-col gap-1">
                {BACKEND_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setBackendStatus(option.value)}
                    aria-pressed={backendStatus === option.value}
                    className={`py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue ${
                      backendStatus === option.value
                        ? 'bg-brand-blue text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
