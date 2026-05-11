// the transaction entry form row at the top of the transaction page
// it shows five columns: date, account, category, note, amount
// tab moves focus between columns, enter submits the transaction

import React, { useRef, useCallback, useEffect } from 'react';
import SearchableDropdown from './SearchableDropdown';
import {
  DEFAULT_ACCOUNTS,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  TRANSACTION_TYPES,
  KEYBOARD_HINTS,
} from '../data/constants';
import { formatDate, getTodayStr, getYesterdayStr } from '../utils/helpers';

export default function TransactionForm({ form, onUpdateForm, onSubmit, onTypeChange }) {
  // refs for each field so we can programmatically move focus with tab/keyboard
  const dateRef = useRef(null);
  const noteRef = useRef(null);
  const amountRef = useRef(null);

  // pick the right category list based on current transaction type
  const categories = form.type === TRANSACTION_TYPES.EXPENSE ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  // handle keyboard shortcuts in the date field
  const handleDateKeyDown = useCallback((e) => {
    if (e.key === 't' || e.key === 'T') {
      e.preventDefault();
      onUpdateForm('date', getTodayStr());
    } else if (e.key === 'y' || e.key === 'Y') {
      e.preventDefault();
      onUpdateForm('date', getYesterdayStr());
    }
  }, [onUpdateForm]);

  // handle enter key in the amount field to submit the whole form
  const handleAmountKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  }, [onSubmit]);

  // focus the date field when the form first mounts
  useEffect(() => {
    dateRef.current?.focus();
  }, []);

  // decide what to show in the date cell
  // if date is set, show formatted date; otherwise show a dash
  const dateDisplay = form.date ? formatDate(form.date) : null;

  return (
    <div className="bg-[#f0efed] border-b border-gray-200">
      {/* top bar: expense/income toggle + keyboard shortcut hints */}
      <div className="flex items-center gap-4 px-6 py-2 border-b border-gray-200">
        {/* expense tab - highlighted red when active */}
        <button
          onClick={() => onTypeChange(TRANSACTION_TYPES.EXPENSE)}
          className={`text-sm font-medium px-2 py-0.5 rounded transition-colors ${
            form.type === TRANSACTION_TYPES.EXPENSE
              ? 'text-red-500 border border-red-400'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Expense
        </button>

        {/* keyboard shortcut hints shown as grey text */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {KEYBOARD_HINTS.map((hint) => (
            <span key={hint.label}>
              <span className="text-gray-500">{hint.keys}</span>{' '}
              <span>{hint.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* the five-column form row */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] border-b border-gray-200">
        {/* column headers */}
        {['DATE', 'ACCOUNT', 'CATEGORY', 'NOTE', 'AMOUNT'].map((col) => (
          <div
            key={col}
            className="px-6 py-2 text-[11px] font-semibold text-gray-500 tracking-wider border-r border-gray-200 last:border-r-0"
          >
            {col}
          </div>
        ))}

        {/* date field - supports typing or pressing t/y for today/yesterday */}
        <div className="px-6 py-3 border-r border-gray-200">
          {dateDisplay ? (
            // show the formatted date with a bottom border when a date is selected
            <div
              className="text-sm text-gray-800 border-b border-gray-800 pb-1 cursor-pointer font-mono"
              onClick={() => dateRef.current?.focus()}
            >
              {dateDisplay}
              {/* hidden date input for native date picking */}
              <input
                ref={dateRef}
                type="date"
                value={form.date}
                onChange={(e) => onUpdateForm('date', e.target.value)}
                onKeyDown={handleDateKeyDown}
                className="absolute opacity-0 w-0 h-0"
              />
            </div>
          ) : (
            <div className="relative">
              <span className="text-sm text-gray-400">-</span>
              <input
                ref={dateRef}
                type="date"
                value={form.date}
                onChange={(e) => onUpdateForm('date', e.target.value)}
                onKeyDown={handleDateKeyDown}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              />
            </div>
          )}
        </div>

        {/* account dropdown */}
        <div className="px-6 py-3 border-r border-gray-200">
          <SearchableDropdown
            options={DEFAULT_ACCOUNTS}
            value={form.accountId}
            onChange={(id) => onUpdateForm('accountId', id)}
            placeholder="Search to select"
            renderOption={(opt) => (
              <span style={{ color: opt.color }} className="font-semibold">
                {opt.name}
              </span>
            )}
          />
        </div>

        {/* category dropdown - list changes based on expense vs income */}
        <div className="px-6 py-3 border-r border-gray-200">
          <SearchableDropdown
            options={categories}
            value={form.categoryId}
            onChange={(id) => onUpdateForm('categoryId', id)}
            placeholder="Search to select"
            renderOption={(opt) => (
              <span className="flex items-center gap-2">
                <span>{opt.emoji}</span>
                <span>{opt.name}</span>
              </span>
            )}
          />
        </div>

        {/* note / description field */}
        <div className="px-6 py-3 border-r border-gray-200">
          <input
            ref={noteRef}
            type="text"
            value={form.note}
            onChange={(e) => onUpdateForm('note', e.target.value)}
            placeholder="Add Notes"
            className={`w-full text-sm bg-transparent ${
              form.note
                ? 'text-gray-800 border-b border-gray-800 pb-1'
                : 'text-gray-400'
            } placeholder-gray-400`}
          />
        </div>

        {/* amount field - pressing enter here submits the transaction */}
        <div className="px-6 py-3">
          <input
            ref={amountRef}
            type="number"
            value={form.amount}
            onChange={(e) => onUpdateForm('amount', e.target.value)}
            onKeyDown={handleAmountKeyDown}
            placeholder="Add Amount"
            className={`w-full text-sm bg-transparent ${
              form.amount
                ? 'text-gray-800 border-b border-gray-800 pb-1'
                : 'text-gray-400'
            } placeholder-gray-400`}
          />
        </div>
      </div>
    </div>
  );
}
