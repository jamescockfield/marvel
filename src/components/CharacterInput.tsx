'use client';

import React from 'react';

interface CharacterInputProps {
  searchTerm: string;
  onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

export const CharacterInput: React.FC<CharacterInputProps> = ({
  searchTerm,
  onSearchTermChange,
  onFocus = () => {}
}) => {
  const handleFocus = () => {
    onFocus();
  };

  return (
    <div className="relative flex-grow">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchTermChange}
        placeholder="Search Marvel characters..."
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        onFocus={handleFocus}
      />
    </div>
  );
}; 