'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CharacterInput } from './CharacterInput';
import { CharacterDropdown } from './CharacterDropdown';
import { useCharacters } from '../hooks/useCharacters';

export const CharacterSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  const { characters, isLoading } = useCharacters(searchTerm);

  // Handle dropdown visibility when characters change
  useEffect(() => {
    setIsDropdownOpen(characters.length > 0);
  }, [characters]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node) && 
        isDropdownOpen
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedCharacter('');
  };

  const handleCharacterClick = (character: string) => {
    setSelectedCharacter(character);
    setSearchTerm(character);
    setIsDropdownOpen(false);
  };

  const handleInputFocus = () => {
    if (characters.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div className="relative">
      <div>Search</div>
      <div className="flex w-full" ref={searchContainerRef}>
        <div className="relative flex-grow">
          <CharacterInput 
            searchTerm={searchTerm}
            onSearchTermChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div className="absolute left-0 right-0 z-10">
            <CharacterDropdown
              characters={characters}
              isDropdownOpen={isDropdownOpen}
              isLoading={isLoading}
              onCharacterClick={handleCharacterClick}
            />
          </div>
        </div>
        <button 
          className="bg-yellow-700 hover:bg-yellow-800 text-yellow-50 px-4 py-2 rounded ml-1.5"
          onClick={() => {
            if (selectedCharacter) {
              alert(selectedCharacter);
            }
          }}
        >
          Search
        </button>
      </div>
      <div className="mt-10">Footer</div>
    </div>
  );
};