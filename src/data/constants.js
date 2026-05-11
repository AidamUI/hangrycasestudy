// all app-wide constants live here so they are easy to change in one place

// transaction types - controls the expense/income toggle at top
export const TRANSACTION_TYPES = {
  EXPENSE: 'expense',
  INCOME: 'income',
};

// available bank accounts the user can pick from
export const DEFAULT_ACCOUNTS = [
  { id: 'bca', name: 'BCA', color: '#2563eb' },
  { id: 'jago', name: 'JAGO', color: '#16a34a' },
  { id: 'mandiri', name: 'Mandiri', color: '#ea580c' },
  { id: 'bni', name: 'BNI', color: '#dc2626' },
  { id: 'gopay', name: 'GoPay', color: '#0ea5e9' },
  { id: 'ovo', name: 'OVO', color: '#7c3aed' },
];

// expense categories with their emoji icons and colors
export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food', emoji: '🍔', color: '#f59e0b' },
  { id: 'shopping', name: 'Shopping', emoji: '🛍️', color: '#ec4899' },
  { id: 'transport', name: 'Transport', emoji: '🚗', color: '#3b82f6' },
  { id: 'health', name: 'Health', emoji: '💊', color: '#10b981' },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎮', color: '#8b5cf6' },
  { id: 'bills', name: 'Bills', emoji: '📄', color: '#6b7280' },
  { id: 'education', name: 'Education', emoji: '📚', color: '#f97316' },
  { id: 'gift', name: 'Gift', emoji: '🎁', color: '#e11d48' },
  { id: 'other', name: 'Other', emoji: '💰', color: '#64748b' },
];

// income categories are different from expense categories
export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Salary', emoji: '💼', color: '#10b981' },
  { id: 'freelance', name: 'Freelance', emoji: '💻', color: '#3b82f6' },
  { id: 'gift', name: 'Gift', emoji: '🎁', color: '#e11d48' },
  { id: 'investment', name: 'Investment', emoji: '📈', color: '#f59e0b' },
  { id: 'other', name: 'Other', emoji: '💰', color: '#64748b' },
];

// tab options for the transaction list view
export const LIST_TABS = [
  { id: 'date', label: 'By Date' },
  { id: 'category', label: 'By Category' },
  { id: 'account', label: 'By Account' },
];

// keyboard shortcut hints shown in the top bar
export const KEYBOARD_HINTS = [
  { keys: 'Tab', label: 'Next' },
  { keys: 'Enter', label: 'Submit' },
  { keys: '⌘←', label: 'Back' },
  { keys: '⌘→', label: 'Fwd' },
  { keys: 'T', label: 'Today' },
  { keys: 'Y', label: 'Yesterday' },
];

// seed transactions so the app has something to show on first load
export const SEED_TRANSACTIONS = [
  {
    id: 'seed-1',
    type: TRANSACTION_TYPES.INCOME,
    date: new Date().toISOString().split('T')[0],
    accountId: 'bca',
    categoryId: 'gift',
    note: 'Dari Robin',
    amount: 500000,
  },
  {
    id: 'seed-2',
    type: TRANSACTION_TYPES.INCOME,
    date: new Date().toISOString().split('T')[0],
    accountId: 'bca',
    categoryId: 'gift',
    note: 'Dari Robin',
    amount: 500000,
  },
  {
    id: 'seed-3',
    type: TRANSACTION_TYPES.INCOME,
    date: new Date().toISOString().split('T')[0],
    accountId: 'bca',
    categoryId: 'gift',
    note: 'Dari Robin',
    amount: 500000,
  },
];
