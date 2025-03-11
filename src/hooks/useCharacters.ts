'use client';

import { useState, useEffect } from 'react';

interface UseCharactersResult {
  characters: string[];
  isLoading: boolean;
}

export const useCharacters = (searchTerm: string): UseCharactersResult => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (characters.includes(searchTerm)) {
        return;
      }

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

  return {
    characters,
    isLoading
  };
}; 