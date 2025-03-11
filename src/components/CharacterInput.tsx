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
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search Marvel characters..."
        className="w-full p-2 border rounded"
        onFocus={() => characters.length > 0 && setIsDropdownOpen(true)}
      />
      <CharacterDropdown
        characters={characters}
        isDropdownOpen={isDropdownOpen}
        isLoading={isLoading}
        onCharacterClick={handleCharacterClick}
      />
    </div>
  );
};