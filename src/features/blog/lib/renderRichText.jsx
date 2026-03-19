export const parseBold = (text) => {
  if (!text || !text.includes('**')) return text;

  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
};

export const renderRichBlock = (block, index) => {
  switch (block.type) {
    case 'intro':
      return (
        <p key={index} className="text-xl text-gray-500 italic mb-10 leading-relaxed">
          {parseBold(block.text)}
        </p>
      );
    case 'paragraph':
      return (
        <p key={index} className="text-gray-600 text-lg leading-relaxed mb-6">
          {parseBold(block.text)}
        </p>
      );
    case 'h2':
      return (
        <h2 key={index} className="text-3xl font-black text-gray-900 mt-16 mb-6 leading-tight">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={index} className="text-lg font-black text-pink-500 uppercase tracking-widest mt-10 mb-4">
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul key={index} className="mb-6 space-y-3">
          {(block.items || []).map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="flex items-start gap-3 text-gray-600 text-lg leading-relaxed"
            >
              <span className="text-pink-400 font-black mt-1 shrink-0">—</span>
              <span>{parseBold(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote key={index} className="my-10 pl-6 border-l-4 border-pink-300">
          <p className="text-2xl font-black text-gray-900 leading-tight italic">
            {parseBold(block.text)}
          </p>
        </blockquote>
      );
    case 'callout':
      return (
        <div key={index} className="my-10 bg-pink-50 border border-pink-100 rounded-2xl p-8">
          <p className="text-gray-700 text-base leading-relaxed">{parseBold(block.text)}</p>
        </div>
      );
    case 'image':
      return (
        <div key={index} className="my-10">
          <img src={block.url} alt={block.alt || ''} className="w-full rounded-2xl" loading="lazy" />
          {block.alt ? <p className="text-center text-xs text-gray-400 mt-3">{block.alt}</p> : null}
        </div>
      );
    default:
      return null;
  }
};
