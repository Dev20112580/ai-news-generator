
import React, { useState } from 'react';
import { APIResponse } from '../types';

interface ArticlePreviewProps {
  result: APIResponse | null;
  isSubmitting: boolean;
  error: string | null;
  onRetry: () => void;
  onReset: () => void;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  result,
  isSubmitting,
  error,
  onRetry,
  onReset
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result?.data?.article) {
      navigator.clipboard.writeText(result.data.article);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (result?.data) {
      const element = document.createElement("a");
      const file = new Blob([result.data.article], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      const filename = `${result.data.topic.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.txt`;
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleShare = async () => {
    if (!result?.data) return;

    const shareData = {
      title: result.data.topic,
      text: result.data.article.slice(0, 200) + '...',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          alert('Could not share. Copied article to clipboard instead.');
          handleCopy();
        }
      }
    } else {
      handleCopy();
      alert('✓ Article copied to clipboard (Share not supported in this browser)');
    }
  };

  return (
    <div className="card" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
      {!result && !isSubmitting && !error ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-10 py-20 animate-fadeIn">
          <div className="text-6xl mb-6 opacity-20 grayscale">📝</div>
          <p className="text-[#666] font-medium text-lg">
            Fill form & click Generate
          </p>
        </div>
      ) : isSubmitting ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-10 py-20 animate-pulse">
          <div className="spinner mb-6 !w-12 !h-12 !border-4"></div>
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Generating article...</h3>
          <p className="text-[#666] text-sm italic">Crafting your professional news story</p>
        </div>
      ) : error ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-10 py-20 animate-fadeIn">
          <div className="bg-[rgba(220,53,69,0.1)] text-[#dc3545] p-6 rounded-xl border-l-4 border-[#dc3545] w-full max-w-sm">
            <h3 className="font-bold text-lg mb-2">❌ Error</h3>
            <p className="text-sm font-medium mb-4">{error}</p>
            <button
              onClick={onRetry}
              className="px-6 py-2 bg-[#dc3545] text-white rounded-lg font-bold hover:bg-[#c82333] transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      ) : result?.data ? (
        <div className="p-6 sm:p-8 animate-fadeIn">
          {/* Article Header */}
          <div className="article-header">
            <h2 className="article-title hindi-font">
              {result.data.topic}
            </h2>
            <div className="article-metadata">
              <span className="badge">
                🌐 {result.data.language}
              </span>
              <span className="badge">
                📊 {result.data.wordCount} words
              </span>
              <span className="badge">
                ⏰ {new Date(result.data.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Photo Display */}
          {result.data.photoBase64 && (
            <div className="text-center mb-6">
              <img
                src={`data:image/jpeg;base64,${result.data.photoBase64}`}
                alt="News Article"
                className="max-w-full max-h-[150px] sm:max-h-[200px] mx-auto rounded-lg shadow-sm border border-gray-100 object-cover"
              />
              <p className="text-[12px] text-[#666] mt-3 italic">📸 {result.data.photoFilename || 'Uploaded Photo'}</p>
            </div>
          )}

          {/* Article Content */}
          <div className="article-content hindi-font select-all">
            {result.data.article}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={handleDownload}
              className="btn-download"
            >
              📥 Download
            </button>
            <button
              onClick={handleCopy}
              className="btn-copy"
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
            <button
              onClick={handleShare}
              className="btn-share"
            >
              📤 Share
            </button>
            <button
              onClick={onReset}
              className="btn-again"
            >
              🔄 Again
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ArticlePreview;
