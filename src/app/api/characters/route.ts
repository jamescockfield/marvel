import { NextResponse } from 'next/server';
import { fetchCharacterNames } from '@/services/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nameStartsWith = searchParams.get('query');

  if (!nameStartsWith || nameStartsWith.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const characterNames = await fetchCharacterNames(nameStartsWith);
    return NextResponse.json({ results: characterNames });
  } catch (error) {
    console.error('Marvel API error:', error);
    return NextResponse.json({ error: 'Failed to fetch characters' }, { status: 500 });
  }
} 