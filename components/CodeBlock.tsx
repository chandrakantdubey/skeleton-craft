
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from '../constants';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
    });
  };

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden relative group">
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 bg-slate-700/50 rounded-md text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
