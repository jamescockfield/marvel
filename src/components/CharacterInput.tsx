'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CharacterDropdown } from './CharacterDropdown';

export const CharacterInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [characters, setCharacters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const isCharacterSelected = useRef<boolean>(false);

  useEffect(() => {
    // Skip search if a character was just selected
    if (isCharacterSelected.current) {
      isCharacterSelected.current = false;
      return;
    }

    const fetchData = async () => {
      if (searchTerm.length < 2) {
        setCharacters([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/characters?query=${searchTerm}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();

        setCharacters(data.results);
        setIsDropdownOpen(true);

        console.log(data);
      } catch (error) {
        console.error('Error fetching Marvel characters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCharacterClick = (character: string) => {
    isCharacterSelected.current = true;
    setSearchTerm(character);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div>Search</div>
      <div className="flex w-full">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search Marvel characters..."
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
            onFocus={() => characters.length > 0 && setIsDropdownOpen(true)}
          />
          {/* Dropdown positioned directly under the input with same width */}
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
            if (searchTerm.length >= 2) {
              setIsDropdownOpen(true);
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