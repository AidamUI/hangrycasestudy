import { DEFAULT_ACCOUNTS, EXPENSE_CATEGORIES, INCOME_CATEGORIES, TRANSACTION_TYPES } from '../data/constants';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const rupiahFormatter = new Intl.NumberFormat('id-ID');

export function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

export function getYesterdayStr() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateStr;
  return dateFormatter.format(date);
}

export function formatRupiah(value = 0) {
  return `Rp${rupiahFormatter.format(Math.abs(Number(value) || 0))}`;
}

export function calcExpenses(transactions = []) {
  return transactions.reduce(
    (total, transaction) => total + (transaction.type === TRANSACTION_TYPES.EXPENSE ? Number(transaction.amount) || 0 : 0),
    0,
  );
}

export function calcIncome(transactions = []) {
  return transactions.reduce(
    (total, transaction) => total + (transaction.type === TRANSACTION_TYPES.INCOME ? Number(transaction.amount) || 0 : 0),
    0,
  );
}

export function calcTotal(transactions = []) {
  return calcIncome(transactions) - calcExpenses(transactions);
}

export function calcDayTotal(transactions = []) {
  return calcTotal(transactions);
}

export function groupByDate(transactions = []) {
  return transactions.reduce((groups, transaction) => {
    if (!groups[transaction.date]) groups[transaction.date] = [];
    groups[transaction.date].push(transaction);
    return groups;
  }, {});
}

export function groupByCategory(transactions = []) {
  return transactions.reduce((groups, transaction) => {
    if (!groups[transaction.categoryId]) groups[transaction.categoryId] = [];
    groups[transaction.categoryId].push(transaction);
    return groups;
  }, {});
}

export function groupByAccount(transactions = []) {
  return transactions.reduce((groups, transaction) => {
    if (!groups[transaction.accountId]) groups[transaction.accountId] = [];
    groups[transaction.accountId].push(transaction);
    return groups;
  }, {});
}

export function getDateLabel(dateStr) {
  const today = getTodayStr();
  const yesterday = getYesterdayStr();

  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return formatDate(dateStr);
}

export function getCategoryById(categoryId, type) {
  const categories = type === TRANSACTION_TYPES.INCOME ? INCOME_CATEGORIES : type === TRANSACTION_TYPES.EXPENSE ? EXPENSE_CATEGORIES : [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  return categories.find((category) => category.id === categoryId);
}

export function getAccountById(accountId) {
  return DEFAULT_ACCOUNTS.find((account) => account.id === accountId);
}

export function searchTransactions(transactions = [], query = '') {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return transactions;

  return transactions.filter((transaction) => {
    const account = getAccountById(transaction.accountId);
    const category = getCategoryById(transaction.categoryId, transaction.type);
    return [transaction.note, transaction.date, account?.name, category?.name, transaction.type]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalized));
  });
}