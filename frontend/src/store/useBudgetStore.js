import { create } from 'zustand';
import api from '../api/axios';

const useBudgetStore = create((set) => ({
  transactions: [],
  summary: null,

  fetchTransactions: async () => {
    const { data } = await api.get('/api/transactions');
    set({ transactions: data });
  },

  fetchSummary: async () => {
    const { data } = await api.get('/api/transactions/summary');
    set({ summary: data });
  },

  setBudget: async (budget) => {
    await api.put('/api/transactions/budget', { budget });
    const { data } = await api.get('/api/transactions/summary');
    set({ summary: data });
  },

  syncTransactions: async () => {
    await api.post('/api/plaid/sync');
    const { data } = await api.get('/api/transactions');
    set({ transactions: data });
  },
}));

export default useBudgetStore;
