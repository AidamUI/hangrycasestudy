// top navigation bar that appears on every page
// shows the app logo, nav links, and the current user's name

import React from 'react';

// the nav links definition lives here so it is easy to extend later
const NAV_LINKS = [
  { id: 'transaction', label: 'Transaction' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'settings', label: 'Settings' },
];

export default function Navbar({ currentPage, onNavigate, userName }) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#f0efed]">
      {/* app logo uses monospace font to match the figma design */}
      <div className="font-mono font-semibold text-base tracking-tight text-gray-900">
        Expense Tracker
      </div>

      {/* center nav links */}
      <div className="flex items-center gap-6">
        {NAV_LINKS.map((link) => {
          const isActive = currentPage === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm transition-colors ${
                isActive
                  ? 'font-semibold text-gray-900'
                  : 'font-normal text-gray-500 hover:text-gray-800'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>

      {/* user avatar and name on the right side */}
      <div className="flex items-center gap-2">
        {/* small circle avatar placeholder */}
        <div className="w-5 h-5 rounded-full bg-gray-300" />
        <span className="text-sm text-gray-700">{userName || 'My Name'}</span>
      </div>
    </nav>
  );
}
