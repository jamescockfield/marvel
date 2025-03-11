import { fetchCharacterNames } from './api';

// Mock the global fetch function
global.fetch = jest.fn();

// Mock environment variables
process.env.MARVEL_API_URL = 'https://gateway.marvel.com/v1/public';
process.env.MARVEL_PUBLIC_KEY = 'test-public-key';
process.env.MARVEL_PRIVATE_KEY = 'test-private-key';

describe('Marvel API Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should fetch character names successfully', async () => {
    // Mock successful API response
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: {
          results: [
            { name: 'Spider-Man' },
            { name: 'Iron Man' }
          ]
        }
      })
    };
    
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    // Call the function
    const names = await fetchCharacterNames('spider');

    // Assertions
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(names).toEqual(['Spider-Man', 'Iron Man']);
    
    // Verify the URL contains the search parameter
    const fetchCall = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(fetchCall).toContain('nameStartsWith=spider');
  });

  it('should handle API errors', async () => {
    // Mock failed API response
    const mockResponse = {
      ok: false,
      status: 401
    };
    
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    // Call the function and expect it to throw
    await expect(fetchCharacterNames('spider')).rejects.toThrow('Marvel API error: 401');
  });

  // TODO: add tests for the hash computation
//   it('should compute the hash correctly', async () => {
}); 