import React from 'react';

interface HeaderProps {
  onHistoryClick?: () => void;
  onLogoClick?: () => void;
  onBackClick?: () => void;
  showHistoryBtn?: boolean;
  showBackBtn?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onHistoryClick,
  onLogoClick,
  onBackClick,
  showHistoryBtn = false,
  showBackBtn = false
}) => {
  return (
    <header className="header">
      <div className="header-content justify-between">
        <div className="flex items-center gap-4">
          {showBackBtn && (
            <button
              onClick={onBackClick}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all text-white"
              title="Go Back"
            >
              ←
            </button>
          )}
          <div className="flex items-center gap-5 cursor-pointer" onClick={onLogoClick}>
            <div className="header-logo">
              <img src="/logo-new.png" alt="AI News Generator Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
            </div>
            <div className="header-text">
              <h1>AI News Generator</h1>
              <p className="hindi-font">समाचार जेनरेटर - AI से पेशेवर आर्टिकल बनाएं</p>
            </div>
          </div>
        </div>

        {showHistoryBtn && (
          <button onClick={onHistoryClick} className="btn-secondary" style={{ width: 'auto', padding: '10px 20px' }}>
            <span style={{ fontSize: '20px' }}>📜</span>
            <span className="hidden sm:inline">History</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
