// root application component
// handles page routing (transaction / accounts / settings)
// all transaction state lives in the useTransactions hook

import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import TransactionPage from './components/TransactionPage';
import AccountsPage from './components/AccountsPage';
import SettingsPage from './components/SettingsPage';
import { useTransactions } from './hooks/useTransactions';
import { getTodayStr } from './utils/helpers';

export default function App() {
  // which top-level page is currently visible
  const [currentPage, setCurrentPage] = useState('transaction');

  // the display name shown in the navbar
  const [userName, setUserName] = useState('My Name');

  // get all transaction state and actions from the custom hook
  const {
    transactions,
    form,
    addTransaction,
    deleteTransaction,
    updateForm,
    resetForm,
    setFormType,
  } = useTransactions();

  // called when the user presses enter in the amount field
  // validates that required fields are filled before adding
  const handleSubmit = useCallback(() => {
    // require at least an amount to create a transaction
    if (!form.amount || parseFloat(form.amount) <= 0) return;

    addTransaction({
      type: form.type,
      date: form.date || getTodayStr(),
      accountId: form.accountId,
      categoryId: form.categoryId,
      note: form.note,
      amount: form.amount,
    });

    // clear the form so the user can start entering the next transaction
    resetForm();
  }, [form, addTransaction, resetForm]);

  // render the correct page based on currentPage state
  const renderPage = () => {
    if (currentPage === 'transaction') {
      return (
        <TransactionPage
          transactions={transactions}
          form={form}
          onUpdateForm={updateForm}
          onSubmit={handleSubmit}
          onDelete={deleteTransaction}
          onTypeChange={setFormType}
        />
      );
    }
    if (currentPage === 'accounts') {
      return <AccountsPage transactions={transactions} />;
    }
    if (currentPage === 'settings') {
      return (
        <SettingsPage
          userName={userName}
          onUserNameChange={setUserName}
        />
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#f0efed]">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        userName={userName}
      />
      <main className="px-8">
        {renderPage()}
      </main>
    </div>
  );
}
