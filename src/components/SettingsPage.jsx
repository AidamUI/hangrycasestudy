// settings page - currently a placeholder with basic user preferences
// will be expanded with currency settings, theme, and profile editing

import React, { useState } from 'react';

// settings sections defined as data so adding new settings is easy
const SETTINGS_SECTIONS = [
  {
    id: 'profile',
    label: 'Profile',
    fields: [
      { id: 'name', label: 'Display Name', type: 'text', placeholder: 'My Name' },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    ],
  },
  {
    id: 'preferences',
    label: 'Preferences',
    fields: [
      { id: 'currency', label: 'Currency', type: 'text', placeholder: 'IDR' },
      { id: 'defaultAccount', label: 'Default Account', type: 'text', placeholder: 'BCA' },
    ],
  },
];

export default function SettingsPage({ userName, onUserNameChange }) {
  // local state for all settings fields
  const [settings, setSettings] = useState({
    name: userName || 'My Name',
    email: '',
    currency: 'IDR',
    defaultAccount: 'BCA',
  });

  const handleChange = (fieldId, value) => {
    setSettings((prev) => ({ ...prev, [fieldId]: value }));
    // if the name changes, bubble it up so the navbar updates too
    if (fieldId === 'name') onUserNameChange?.(value);
  };

  return (
    <div className="mx-auto max-w-5xl mt-4 mb-8">
      {SETTINGS_SECTIONS.map((section) => (
        <div
          key={section.id}
          className="bg-[#f0efed] border border-gray-200 rounded-lg overflow-hidden mb-4"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700">{section.label}</h2>
          </div>

          {section.fields.map((field) => (
            <div
              key={field.id}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-100"
            >
              <label className="text-sm text-gray-600">{field.label}</label>
              <input
                type={field.type}
                value={settings[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="text-sm text-right text-gray-800 bg-transparent border-b border-transparent focus:border-gray-400 pb-0.5 transition-colors w-48"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
