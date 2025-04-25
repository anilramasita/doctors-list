import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

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
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          data-testid="autocomplete-input"
          className="w-full block px-4 py-2 pr-10 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Search Icon */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <Search className="text-gray-400 w-5 h-5" />
        </div>

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
