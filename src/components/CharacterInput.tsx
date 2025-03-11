'use client';

import React, { useState, useEffect } from 'react';

export const CharacterInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [characters, setCharacters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.length < 2) {
        setCharacters([]);
        return;
      }

      try {
        const response = await fetch(`/api/characters?query=${searchTerm}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();

        setCharacters(data.results);

        console.log(data);
      } catch (error) {
        console.error('Error fetching Marvel characters:', error);
      }
    };

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search Marvel characters..."
      />
      {characters.length > 0 && (
        <ul>
          {characters.map((character, index) => (
            <li key={index}>{character}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
