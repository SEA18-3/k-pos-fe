import { create } from 'zustand';

export interface Operator {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateOperatorInput {
  name: string;
  email: string;
  password: string;
}

export type CreateOperatorResult =
  | { ok: true; operator: Operator }
  | { ok: false; error: string };

interface OperatorStore {
  operators: Operator[];
  createOperator: (input: CreateOperatorInput) => CreateOperatorResult;
  setOperatorActive: (id: string, active: boolean) => void;
}

export const useOperatorStore = create<OperatorStore>((set, get) => ({
  operators: [],
  createOperator: (input) => {
    const duplicate = get().operators.some(
      (operator) =>
        operator.email.trim().toLowerCase() === input.email.trim().toLowerCase()
    );
    if (duplicate) {
      return { ok: false, error: 'Email operator sudah digunakan.' };
    }

    const operator: Operator = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      email: input.email.trim(),
      password: input.password,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ operators: [operator, ...state.operators] }));
    return { ok: true, operator };
  },
  setOperatorActive: (id, active) =>
    set((state) => ({
      operators: state.operators.map((operator) =>
        operator.id === id ? { ...operator, isActive: active } : operator
      ),
    })),
}));