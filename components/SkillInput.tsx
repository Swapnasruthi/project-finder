import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import { ALL_SKILLS } from '../constants';

interface SkillInputProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
  placeholder?: string;
}

const SkillInput: React.FC<SkillInputProps> = ({ skills, setSkills, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const filteredSuggestions = ALL_SKILLS.filter(
        skill => skill.toLowerCase().startsWith(value.toLowerCase()) && !skills.includes(skill)
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };
  
  const addSkill = (skillToAdd: string) => {
    const trimmedSkill = skillToAdd.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    addSkill(suggestion);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded-lg focus-within:ring-2 focus-within:ring-brand-accent">
        {skills.map(skill => (
          <span key={skill} className="flex items-center gap-1.5 px-2 py-1 text-sm font-medium bg-brand-accent text-white rounded-full">
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-white hover:text-slate-200"
              aria-label={`Remove ${skill}`}
            >
              <XIcon className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={() => addSkill(inputValue)}
          placeholder={skills.length === 0 ? placeholder : "Add another skill..."}
          className="flex-grow bg-transparent text-white outline-none p-1 min-w-[120px]"
        />
      </div>
       {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-brand-secondary border border-slate-700 rounded-lg shadow-lg max-h-48 overflow-auto">
          {suggestions.map(suggestion => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 text-sm text-brand-text-primary cursor-pointer hover:bg-slate-700"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillInput;
