import { NextResponse } from 'next/server';
import { translateText } from '@/lib/translator';

export async function POST(request) {
  const { text } = await request.json();
  try {
    const translatedText = await translateText(text);
    return NextResponse.json({ translatedText });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}