import React from 'react';

interface LandingPageProps {
    onGetStarted: () => void;
    onHistoryClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onHistoryClick }) => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content animate-fadeIn">
                        <div className="hero-badge">
                            <span className="pulse-dot"></span>
                            AI-Powered News Generation
                        </div>
                        <h1 className="hero-title">
                            Create Professional <br />
                            <span className="gradient-text">Hindi News</span> in Seconds
                        </h1>
                        <p className="hero-subtitle">
                            Transform simple topics into broadcast-quality news articles using advanced AI.
                            Perfect for journalists, content creators, and media professionals.
                        </p>
                        <div className="hero-actions">
                            <button onClick={onGetStarted} className="btn-primary btn-lg">
                                Start Generating Now
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                            <button className="btn-secondary btn-lg" onClick={onHistoryClick}>
                                <span className="text-xl">📜</span> View History
                            </button>
                        </div>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">10k+</span>
                                <span className="stat-label">Articles Generated</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">24/7</span>
                                <span className="stat-label">Availability</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">4.9/5</span>
                                <span className="stat-label">User Rating</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual animate-slideInRight">
                        <div className="visual-card glass-effect">
                            <div className="visual-header">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <div className="visual-content">
                                <div className="typing-animation">
                                    <span className="cursor">|</span> Generating breaking news...
                                </div>
                                <div className="skeleton-lines">
                                    <div className="line w-full"></div>
                                    <div className="line w-3/4"></div>
                                    <div className="line w-5/6"></div>
                                </div>
                            </div>
                        </div>
                        <div className="floating-badge badge-1">
                            <span>⚡ Instant</span>
                        </div>
                        <div className="floating-badge badge-2">
                            <span>🌐 Bilingual</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Why Choose Our AI?</h2>
                        <p className="section-subtitle">Built for modern newsrooms and digital creators.</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>Advanced AI Engine</h3>
                            <p>Powered by Google's Gemini models for human-like, context-aware news writing.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🗣️</div>
                            <h3>Bilingual Support</h3>
                            <p>Generate content in pure Hindi, English, or a natural Hinglish blend.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Lightning Fast</h3>
                            <p>Get full-length articles with headlines and facts in under 10 seconds.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎨</div>
                            <h3>Tone Control</h3>
                            <p>Adjust the tone from professional and neutral to sensational or opinionated.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">Three simple steps to your next big story.</p>
                    </div>

                    <div className="steps-container">
                        <div className="step-item">
                            <div className="step-number">01</div>
                            <div className="step-content">
                                <h3>Enter Topic & Facts</h3>
                                <p>Provide a headline or topic and any key facts you want included.</p>
                            </div>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step-item">
                            <div className="step-number">02</div>
                            <div className="step-content">
                                <h3>Customize Settings</h3>
                                <p>Choose your language, tone, and target word count.</p>
                            </div>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step-item">
                            <div className="step-number">03</div>
                            <div className="step-content">
                                <h3>Generate & Publish</h3>
                                <p>Click generate and get a polished article ready for publication.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card glass-effect">
                        <h2>Ready to Transform Your Newsroom?</h2>
                        <p>Join thousands of journalists using AI to enhance their workflow.</p>
                        <button onClick={onGetStarted} className="btn-primary btn-lg">
                            Start Creating Free
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
