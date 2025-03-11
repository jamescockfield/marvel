import crypto from 'crypto';

export async function fetchMarvelCharacters(nameStartsWith: string) {
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;
  const baseUrl = process.env.MARVEL_API_URL;

  console.log('baseUrl', baseUrl);

  if (!publicKey || !privateKey) {
    throw new Error('API keys not set');
  }

  const timestamp = new Date().getTime();
  const hash = getHash(timestamp, privateKey, publicKey);
  
  const params = new URLSearchParams({
    nameStartsWith,
    ts: timestamp.toString(),
    apikey: publicKey,
    hash: hash
  });

  try {
    const response = await fetch(`${baseUrl}/characters?${params}`);
    
    if (!response.ok) {
      throw new Error(`Marvel API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('data', data);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getHash(timestamp: number, privateKey: string, publicKey: string) {
  return crypto.createHash('md5').update(`${timestamp}${privateKey}${publicKey}`).digest('hex');
}
