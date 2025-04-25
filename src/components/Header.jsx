import React, { useState, useEffect } from 'react';

const Header = ({ doctors, searchTerm, onSearch }) => {
  const [input, setInput] = useState(searchTerm);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setInput(searchTerm);
  }, [searchTerm]);

  const handleChange = e => {
    const v = e.target.value;
    setInput(v);

    if (!v.trim()) {
      setSuggestions([]);
      onSearch('');
      return;
    }

    const matches = doctors
      .filter(d => d.name.toLowerCase().includes(v.toLowerCase()))
      .slice(0, 3);

    setSuggestions(matches);
  };

  const handleSelect = name => {
    setInput(name);
    setSuggestions([]);
    onSearch(name);
  };

  const handleKey = e => {
    if (e.key === 'Enter') {
      onSearch(input);
      setSuggestions([]);
    }
  };

  return (
    <div className="p-6 bg-blue-900 text-white shadow sticky top-0 z-50">
      <div className="relative w-full md:w-1/2 mx-auto">
        {/* Search Input */}
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKey}
          placeholder="Search doctors by name..."
          data-testid="autocomplete-input"
          className="w-full block px-4 py-2 pr-10 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
        </svg>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute left-0 top-full mt-1 w-full bg-white rounded-lg shadow-lg overflow-hidden z-10">
            {suggestions.map(doc => (
              <li
                key={doc.id}
                onClick={() => handleSelect(doc.name)}
                data-testid="suggestion-item"
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800"
              >
                {doc.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
