'use client';

import React from 'react';

interface CharacterDropdownProps {
  characters: string[];
  isDropdownOpen: boolean;
  isLoading: boolean;
  onCharacterClick: (character: string) => void;
}

export const CharacterDropdown: React.FC<CharacterDropdownProps> = ({
  characters,
  isDropdownOpen,
  isLoading,
  onCharacterClick
}) => {
  return (
    <>
      {isLoading && <p className="mt-1">Loading...</p>}
      {isDropdownOpen && characters.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-gray-200 dark:border-gray-700 rounded shadow-lg max-h-60 overflow-y-auto">
          {characters.map((character, index) => (
            <div 
              key={index}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => onCharacterClick(character)}
            >
              {character}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
