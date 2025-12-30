import React, { useState } from 'react';
import Header from './Header';
import { HistoryItem } from '../types';

interface HistoryPageProps {
    history: HistoryItem[];
    onLoadHistory: (item: HistoryItem) => void;
    onClearHistory: () => void;
    onBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onLoadHistory, onClearHistory, onBack }) => {
    const [searchHistory, setSearchHistory] = useState('');

    const filteredHistory = history.filter(item =>
        item.topic.toLowerCase().includes(searchHistory.toLowerCase()) ||
        item.article.toLowerCase().includes(searchHistory.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-[var(--light-bg)] animate-fadeIn">
            <Header onLogoClick={onBack} />

            <div className="container py-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
                        >
                            ←
                        </button>
                        <h2 className="history-title mb-0">📜 Article History</h2>
                    </div>

                    <div className="relative w-full sm:w-[300px]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search history..."
                            className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-[#FF9933] transition-all"
                            value={searchHistory}
                            onChange={(e) => setSearchHistory(e.target.value)}
                        />
                    </div>
                </div>

                <div className="history-list">
                    {filteredHistory.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onLoadHistory(item)}
                            className="history-item group bg-white"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] font-bold text-[#FF9933] bg-[rgba(255,153,51,0.1)] px-2 py-0.5 rounded uppercase">
                                    {item.language}
                                </span>
                                <span className="text-[10px] text-gray-400 font-medium">
                                    {new Date(item.generatedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h4 className="hindi-font">
                                {item.topic}
                            </h4>
                            <p className="text-[11px] text-gray-500 line-clamp-3 mb-3 italic">
                                {item.article.slice(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold border-t border-gray-50 pt-3">
                                <span>📊 {item.wordCount} words</span>
                            </div>
                        </div>
                    ))}
                    {filteredHistory.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-400 font-medium flex flex-col items-center gap-4">
                            <span className="text-4xl">🔍</span>
                            No articles found matching "{searchHistory}"
                        </div>
                    )}
                </div>

                {history.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => { if (window.confirm("Clear all history?")) onClearHistory(); }}
                            className="text-xs font-bold text-[#dc3545] hover:text-[#c82333] transition-colors flex items-center gap-1 uppercase tracking-widest px-4 py-2 bg-white border border-red-100 rounded-lg hover:bg-red-50"
                        >
                            🗑️ Clear All History
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
