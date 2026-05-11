// summary bar showing total expenses, total income, and the net total
// this sits between the form and the transaction list
// expense total is red, income is green, net total is green if positive

import React from 'react';
import { formatRupiah } from '../utils/helpers';

export default function SummaryBar({ totalExpense, totalIncome, netTotal }) {
  // determine sign and color for the net total
  const netPositive = netTotal >= 0;

  return (
    <div className="grid grid-cols-3 border-b border-gray-200">
      {/* expense total - always red */}
      <div className="flex items-center gap-2 px-6 py-3 border-r border-gray-200">
        <span className="text-xs text-gray-500 uppercase tracking-wide">Expense</span>
        {/* arrow icon pointing up-right to indicate money going out */}
        <span className="text-gray-400 text-xs">↗</span>
        <span className="ml-auto text-sm font-medium text-red-500">
          {formatRupiah(totalExpense)}
        </span>
      </div>

      {/* income total - always green */}
      <div className="flex items-center gap-2 px-6 py-3 border-r border-gray-200">
        <span className="text-xs text-gray-500 uppercase tracking-wide">Income</span>
        {/* arrow icon pointing down-right to indicate money coming in */}
        <span className="text-gray-400 text-xs">↘</span>
        <span className="ml-auto text-sm font-medium text-green-600">
          {formatRupiah(totalIncome)}
        </span>
      </div>

      {/* net total - green when positive, red when negative */}
      <div className="flex items-center gap-2 px-6 py-3">
        <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
        <span className={`ml-auto text-sm font-medium ${netPositive ? 'text-green-600' : 'text-red-500'}`}>
          {formatRupiah(Math.abs(netTotal))}
        </span>
      </div>
    </div>
  );
}
