import React from 'react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[var(--light-bg)] animate-fadeIn">
            <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-[#FF9933] font-bold hover:underline"
                >
                    ← Back to Home
                </button>

                <div className="card">
                    <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a1a', marginBottom: '24px' }}>
                        Privacy Policy
                    </h1>
                    <p style={{ color: '#666', marginBottom: '24px' }}>
                        <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN')}
                    </p>

                    <div style={{ lineHeight: 1.8, color: '#333' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>
                            About AI News Generator
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            AI News Generator is a tool that helps journalists and content creators generate
                            professional news articles using artificial intelligence. We are committed to
                            protecting your privacy and being transparent about our data practices.
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>
                            Google AdSense
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            We use Google AdSense to display advertisements on our website. Google may use
                            cookies to serve ads based on your prior visits to this website or other websites.
                            Google's use of advertising cookies enables it and its partners to serve ads to
                            you based on your visit to our site and/or other sites on the Internet.
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>
                            Cookies and Tracking
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            This website uses cookies for analytics and advertising purposes. Cookies are
                            small text files that are stored on your device when you visit our website.
                            You can opt out of personalized advertising by visiting{' '}
                            <a
                                href="https://www.google.com/settings/ads"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#FF9933', textDecoration: 'underline' }}
                            >
                                Google Ads Settings
                            </a>.
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>
                            Data Storage
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            Your generated articles and history are stored locally in your browser using
                            localStorage. This data is not transmitted to our servers. You can clear this
                            data at any time by clearing your browser's local storage or using the "Clear
                            All History" button in the app.
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>
                            Third-Party Services
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            We use Google's Gemini AI to generate content. When you submit a request, your
                            input (topic, facts, etc.) is sent to Google's API for processing. Please refer
                            to Google's Privacy Policy for more information about how they handle data.
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginTop: '32px', marginBottom: '16px' }}>
                            Contact
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            For privacy concerns or questions, please contact us at:{' '}
                            <a
                                href="mailto:privacy@ainewsgenerator.com"
                                style={{ color: '#FF9933', textDecoration: 'underline' }}
                            >
                                privacy@ainewsgenerator.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
