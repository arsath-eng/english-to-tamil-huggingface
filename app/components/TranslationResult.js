export default function TranslationResult({ translatedText }) {
    return (
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Tamil Translation:</h2>
        <p className="whitespace-pre-wrap">{translatedText}</p>
      </div>
    );
  }