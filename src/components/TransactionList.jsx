// the main transaction list area below the summary bar
// supports three grouping modes (date, category, account) and a search bar
// each group shows a header with the group label and net total for that group

import React, { useState, useMemo } from 'react';
import TransactionItem from './TransactionItem';
import {
  groupByDate,
  groupByCategory,
  groupByAccount,
  getDateLabel,
  calcDayTotal,
  calcTotal,
  formatRupiah,
  searchTransactions,
  getCategoryById,
  getAccountById,
} from '../utils/helpers';
import { LIST_TABS, TRANSACTION_TYPES } from '../data/constants';

export default function TransactionList({ transactions, onDelete }) {
  const [activeTab, setActiveTab] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');

  // first apply the search filter, then group by whatever tab is active
  const filtered = useMemo(
    () => searchTransactions(transactions, searchQuery),
    [transactions, searchQuery]
  );

  // sort transactions newest-first so today always appears at the top
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.date.localeCompare(a.date)),
    [filtered]
  );

  // build the grouped data structure based on the active tab
  const grouped = useMemo(() => {
    if (activeTab === 'date') return groupByDate(sorted);
    if (activeTab === 'category') return groupByCategory(sorted);
    if (activeTab === 'account') return groupByAccount(sorted);
    return {};
  }, [sorted, activeTab]);

  // the keys are date strings, category ids, or account ids depending on the tab
  const groupKeys = Object.keys(grouped);

  // helper to get a display label for each group header
  const getGroupLabel = (key) => {
    if (activeTab === 'date') return getDateLabel(key);
    if (activeTab === 'category') {
      // try expense categories first, then income
      const cat =
        getCategoryById(key, TRANSACTION_TYPES.EXPENSE) ||
        getCategoryById(key, TRANSACTION_TYPES.INCOME);
      return cat ? `${cat.emoji} ${cat.name}` : key;
    }
    if (activeTab === 'account') {
      const acc = getAccountById(key);
      return acc ? acc.name : key;
    }
    return key;
  };

  // net total label for each group shown on the right side
  const getGroupTotal = (txs, key) => {
    if (activeTab === 'date') {
      // for date groups use the date-specific calc so the sign is right
      const total = calcTotal(txs);
      const abs = formatRupiah(Math.abs(total));
      return total >= 0 ? `+${abs}` : `-${abs}`;
    }
    // for category and account groups just sum the amounts
    const sum = txs.reduce((acc, tx) => acc + tx.amount, 0);
    return formatRupiah(sum);
  };

  return (
    <div className="flex-1">
      {/* tab row and search bar on the same line */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-1">
          {LIST_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 font-medium shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* search bar filters transactions in real time */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-1.5">
          <span className="text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transaction"
            className="text-sm bg-transparent text-gray-700 placeholder-gray-400 w-44"
          />
        </div>
      </div>

      {/* the grouped transaction groups */}
      <div>
        {groupKeys.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-gray-400">
            No transactions found
          </div>
        )}

        {groupKeys.map((key) => {
          const groupTxs = grouped[key];
          const groupLabel = getGroupLabel(key);
          const groupTotal = getGroupTotal(groupTxs, key);

          return (
            <div key={key}>
              {/* group header row: label on the left, net total on the right */}
              <div className="flex items-center justify-between px-6 py-2 bg-[#f0efed]">
                <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                  {groupLabel}
                </span>
                <span className="text-xs font-semibold text-green-600">
                  {groupTotal}
                </span>
              </div>

              {/* list of transaction rows inside this group */}
              {groupTxs.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  onDelete={onDelete}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
