import { useEffect, useState } from 'react';
import { SEED_TRANSACTIONS, TRANSACTION_TYPES } from '../data/constants';
import { getTodayStr } from '../utils/helpers';

const STORAGE_KEY = 'hangry.transactions';

const DEFAULT_FORM = {
  type: TRANSACTION_TYPES.EXPENSE,
  date: getTodayStr(),
  accountId: '',
  categoryId: '',
  note: '',
  amount: '',
};

function loadTransactions() {
  if (typeof window === 'undefined') return SEED_TRANSACTIONS;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : SEED_TRANSACTIONS;
  } catch {
    return SEED_TRANSACTIONS;
  }
}

function createTransactionId() {
  return `tx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [form, setForm] = useState(DEFAULT_FORM);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const amount = Number(transaction.amount);
    if (!Number.isFinite(amount) || amount <= 0) return;

    setTransactions((current) => [
      {
        id: createTransactionId(),
        type: transaction.type,
        date: transaction.date,
        accountId: transaction.accountId,
        categoryId: transaction.categoryId,
        note: transaction.note,
        amount,
      },
      ...current,
    ]);
  };

  const deleteTransaction = (transactionId) => {
    setTransactions((current) => current.filter((transaction) => transaction.id !== transactionId));
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(DEFAULT_FORM);
  };

  const setFormType = (type) => {
    setForm((current) => ({
      ...current,
      type,
      categoryId: '',
    }));
  };

  return {
    transactions,
    form,
    addTransaction,
    deleteTransaction,
    updateForm,
    resetForm,
    setFormType,
  };
}