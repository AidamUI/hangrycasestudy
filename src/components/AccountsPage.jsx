// accounts page - currently a placeholder that shows all user accounts
// will be expanded with balances, transfers, and account management

import React from 'react';
import { DEFAULT_ACCOUNTS } from '../data/constants';
import { calcTotal } from '../utils/helpers';
import { TRANSACTION_TYPES } from '../data/constants';

export default function AccountsPage({ transactions }) {
  // calculate the balance for each account based on all transactions
  const getAccountBalance = (accountId) => {
    const accountTxs = transactions.filter((tx) => tx.accountId === accountId);
    return calcTotal(accountTxs);
  };

  return (
    <div className="mx-auto max-w-5xl mt-4 mb-8">
      <div className="bg-[#f0efed] border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-700">Your Accounts</h2>
        </div>

        {DEFAULT_ACCOUNTS.map((account) => {
          const balance = getAccountBalance(account.id);
          const positive = balance >= 0;
          return (
            <div
              key={account.id}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {/* account color dot and name */}
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: account.color }}
                />
                <span className="text-sm font-semibold" style={{ color: account.color }}>
                  {account.name}
                </span>
              </div>

              {/* balance for this account calculated from all transactions */}
              <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-500'}`}>
                {positive ? '+' : '-'}Rp{Math.abs(balance).toLocaleString('id-ID')}
              </span>
            </div>
          );
        })}

        {/* empty state message when no transactions exist yet */}
        {transactions.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-gray-400">
            No transactions recorded yet
          </div>
        )}
      </div>
    </div>
  );
}
