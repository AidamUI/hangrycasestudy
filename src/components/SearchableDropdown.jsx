// a searchable dropdown used for both account and category selection
// renders a search field plus a numbered list of options
// closes when user picks an option or clicks outside

import React, { useState, useRef, useEffect } from 'react';

export default function SearchableDropdown({ options, value, onChange, placeholder, renderOption }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // filter the option list based on the current search query
  const filtered = options.filter((opt) =>
    opt.name.toLowerCase().includes(query.toLowerCase())
  );

  // open the dropdown and focus the search field
  const handleOpen = () => {
    setOpen(true);
    setQuery('');
    // slight delay so the input is rendered before we try to focus it
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // pick an option and close the dropdown
  const handleSelect = (opt) => {
    onChange(opt.id);
    setOpen(false);
    setQuery('');
  };

  // close the dropdown when the user clicks outside this component
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // find the currently selected option object so we can display its label
  const selected = options.find((o) => o.id === value);

  return (
    <div ref={containerRef} className="relative w-full">
      {open ? (
        // when open, show the search input
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search to select"
          className="w-full text-sm text-gray-800 bg-transparent border-b border-gray-800 pb-1 placeholder-gray-400"
        />
      ) : (
        // when closed, show the selected value or a dash placeholder
        <button
          onClick={handleOpen}
          className="w-full text-left text-sm text-gray-800"
        >
          {selected ? (renderOption ? renderOption(selected) : selected.name) : (
            <span className="text-gray-400">-</span>
          )}
        </button>
      )}

      {/* the dropdown list panel */}
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 min-w-[160px] bg-white border border-gray-100 rounded shadow-lg overflow-hidden">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-400">No results</div>
          ) : (
            filtered.map((opt, index) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors"
              >
                {/* number prefix for each option matching the figma design */}
                <span className="text-gray-400 text-xs w-4">{index + 1}</span>
                {renderOption ? renderOption(opt) : opt.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
