'use client';

import React, { useState, useEffect } from 'react';

export const CharacterInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.length < 2) {
        return;
      }

      try {
        const response = await fetch(''); // TODO: add API route
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();

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
    </div>
  );
};
