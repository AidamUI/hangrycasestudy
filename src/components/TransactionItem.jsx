// renders a single transaction row in the list
// shows: directional arrow icon, account badge, category badge, note, amount
// clicking delete removes the transaction

import React, { useState } from 'react';
import { getCategoryById, getAccountById, formatRupiah } from '../utils/helpers';
import { TRANSACTION_TYPES } from '../data/constants';

export default function TransactionItem({ transaction, onDelete }) {
  const { id, type, accountId, categoryId, note, amount } = transaction;
  const [hovered, setHovered] = useState(false);

  // look up the account and category objects so we can display their names/colors
  const account = getAccountById(accountId);
  const category = getCategoryById(categoryId, type);

  // income arrow points down-right (money in), expense points up-right (money out)
  const isIncome = type === TRANSACTION_TYPES.INCOME;

  return (
    <div
      className="flex items-center px-6 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* directional arrow icon in a teal circle */}
      <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center mr-3 flex-shrink-0">
        <span className="text-teal-500 text-xs">{isIncome ? '↘' : '↗'}</span>
      </div>

      {/* account badge and category badge side by side */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          {/* account name in its brand color */}
          {account && (
            <span
              className="text-xs font-semibold"
              style={{ color: account.color }}
            >
              {account.name}
            </span>
          )}

          {/* category shown as emoji + label pill */}
          {category && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </span>
          )}
        </div>

        {/* the note text below the account/category line */}
        <span className="text-sm text-gray-800 truncate">{note || '-'}</span>
      </div>

      {/* amount aligned to the right */}
      <div className="ml-4 flex items-center gap-3">
        <span className="text-sm text-gray-800 tabular-nums">
          {formatRupiah(amount)}
        </span>

        {/* delete button appears on hover so it does not clutter the ui */}
        {hovered && (
          <button
            onClick={() => onDelete(id)}
            className="text-gray-300 hover:text-red-400 transition-colors text-base leading-none"
            title="Delete transaction"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
