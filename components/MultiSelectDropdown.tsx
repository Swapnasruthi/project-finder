import React, { useState, useRef, useEffect } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface MultiSelectDropdownProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, selectedOptions, onChange, placeholder = "Select skills" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleOption = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(o => o !== option)
      : [...selectedOptions, option];
    onChange(newSelectedOptions);
  };

  const getButtonLabel = () => {
    if (selectedOptions.length === 0) {
        return placeholder;
    }
    if (selectedOptions.length <= 2) {
        return selectedOptions.join(', ');
    }
    return `${selectedOptions.length} skills selected`;
  };

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-brand-secondary border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
      >
        <span className="text-left">{getButtonLabel()}</span>
        <ChevronDownIcon className={`w-5 h-5 ml-2 transform transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full sm:w-72 bg-brand-secondary border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto right-0 sm:right-auto">
          <ul className="p-2 space-y-1">
            {options.map(option => (
              <li key={option}>
                <label className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleToggleOption(option)}
                    className="h-4 w-4 rounded bg-slate-800 border-slate-600 text-brand-accent focus:ring-brand-accent"
                  />
                  <span className="text-sm text-brand-text-primary">{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
