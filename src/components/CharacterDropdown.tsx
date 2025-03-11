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
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {characters.map((character, index) => (
            <div 
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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
