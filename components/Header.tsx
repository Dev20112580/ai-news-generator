
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <img src="/logo-new.png" alt="AI News Generator Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
        </div>
        <div className="header-text">
          <h1>AI News Generator</h1>
          <p className="hindi-font">समाचार जेनरेटर - AI से पेशेवर आर्टिकल बनाएं</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
