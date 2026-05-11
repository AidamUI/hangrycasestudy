// the transaction page is the primary screen of the app
// it composes the form, summary bar, and transaction list together
// all state flows down from useTransactions hook via App

import React from 'react';
import TransactionForm from './TransactionForm';
import SummaryBar from './SummaryBar';
import TransactionList from './TransactionList';
import { calcExpenses, calcIncome, calcTotal, getTodayStr } from '../utils/helpers';
import { TRANSACTION_TYPES } from '../data/constants';

export default function TransactionPage({
  transactions,
  form,
  onUpdateForm,
  onSubmit,
  onDelete,
  onTypeChange,
}) {
  // these totals are computed fresh on every render so they stay in sync
  const totalExpense = calcExpenses(transactions);
  const totalIncome = calcIncome(transactions);
  const netTotal = calcTotal(transactions);

  return (
    // the card-like container with a light background matching the figma design
    <div className="mx-auto max-w-5xl mt-4 mb-8 bg-[#f0efed] border border-gray-200 rounded-lg overflow-hidden">
      {/* transaction entry form at the top */}
      <TransactionForm
        form={form}
        onUpdateForm={onUpdateForm}
        onSubmit={onSubmit}
        onTypeChange={onTypeChange}
      />

      {/* three-column summary row */}
      <SummaryBar
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        netTotal={netTotal}
      />

      {/* grouped, searchable transaction list */}
      <TransactionList
        transactions={transactions}
        onDelete={onDelete}
      />
    </div>
  );
}
