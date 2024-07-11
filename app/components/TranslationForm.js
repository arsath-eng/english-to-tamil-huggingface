'use client';

import { useState } from 'react';
import TranslationResult from './TranslationResult';

export default function TranslationForm() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('An error occurred during translation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleTranslate} className="mb-8">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          rows="4"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter English text here..."
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Translating...' : 'Translate'}
        </button>
      </form>
      {translatedText && <TranslationResult translatedText={translatedText} />}
    </div>
  );
}

