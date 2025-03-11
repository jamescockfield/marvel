import crypto from 'crypto';

export async function fetchCharacterNames(nameStartsWith: string) {
  const data = await fetchCharacters(nameStartsWith);

  return data.data.results.map((character: any) => character.name);
}

async function fetchCharacters(nameStartsWith: string) {
  const baseUrl = process.env.MARVEL_API_URL;

  const params = getAuthParams();
  params.set('nameStartsWith', nameStartsWith);

  try {
    const response = await fetch(`${baseUrl}/characters?${params}`);
    if (!response.ok) {
      throw new Error(`Marvel API error: ${response.status}`);
    }
    
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getAuthParams(): URLSearchParams {
  // TODO: implement a validated .env configuration object
  const publicKey = process.env.MARVEL_PUBLIC_KEY!;
  const privateKey = process.env.MARVEL_PRIVATE_KEY!;

  const timestamp = new Date().getTime();
  const hash = getHash(timestamp, privateKey, publicKey);

  return new URLSearchParams({
    ts: timestamp.toString(),
    apikey: publicKey,
    hash: hash
  });
}

function getHash(timestamp: number, privateKey: string, publicKey: string) {
  return crypto.createHash('md5').update(`${timestamp}${privateKey}${publicKey}`).digest('hex');
}
