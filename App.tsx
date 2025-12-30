import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import NewsForm from './components/NewsForm';
import ArticlePreview from './components/ArticlePreview';
import LandingPage from './components/LandingView';
import HistoryPage from './components/HistoryPage';
import { NewsFormData, APIResponse, Language, Tone, HistoryItem } from './types';
import { GoogleGenAI } from "@google/genai";

const INITIAL_FORM_DATA: NewsFormData = {
  topic: '',
  facts: '',
  location: '',
  date: new Date().toISOString().slice(0, 16),
  sources: '',
  language: Language.Hindi,
  tone: Tone.Professional,
  wordCount: 500,
  email: '',
  photo: null,
};

type ViewState = 'landing' | 'app' | 'history';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const [formData, setFormData] = useState<NewsFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('news_generator_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('news_generator_history', JSON.stringify(history.slice(0, 20)));
  }, [history]);

  const handleFormChange = (newData: Partial<NewsFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleClearForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setResult(null);
    setError(null);
  };

  const handleResetResult = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadFromHistory = (item: HistoryItem) => {
    setResult({
      success: true,
      message: "Loaded from history",
      data: {
        article: item.article,
        wordCount: item.wordCount,
        language: item.language,
        photoBase64: item.photoBase64,
        photoFilename: item.photoFilename,
        generatedAt: item.generatedAt,
        topic: item.topic
      }
    });
    setError(null);
    setCurrentView('app'); // Switch to App view
    // Small delay to allow view to switch before scrolling
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Fixed signature: made event optional to satisfy () => void requirement in onRetry prop of ArticlePreview
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Use process.env.API_KEY directly as per SDK guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const systemInstruction = `You are a professional journalist specializing in news writing. 
      Write a news article with the following details:
      - Topic: ${formData.topic}
      - Facts: ${formData.facts}
      - Location: ${formData.location || 'Not specified'}
      - Sources: ${formData.sources || 'Internal reports'}
      - Tone: ${formData.tone}
      - Language: ${formData.language}
      - Target Length: ~${formData.wordCount} words

      Instructions:
      1. Write in the requested language (${formData.language}). 
      2. If 'Hinglish', use a natural conversational blend of Hindi and English as used in Indian news media.
      3. Use professional journalistic style: Compelling headline, Lead paragraph (Who, What, Where, When, Why), Body paragraphs with context, and a Conclusion.
      4. Use short, punchy paragraphs.
      5. Output ONLY the article text.`;

      const promptText = `Create an article about: ${formData.topic}. Use these facts: ${formData.facts}`;
      const parts: any[] = [{ text: promptText }];

      // Include image data if photo is provided for multimodal context
      if (formData.photo) {
        parts.push({
          inlineData: {
            mimeType: formData.photo.mimeType,
            data: formData.photo.data,
          },
        });
      }

      // Using correctly structured GenerateContentParameters
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      // Directly access .text property from response
      const articleText = response.text || "Failed to generate content.";
      const generatedAt = new Date().toISOString();
      const wordCount = articleText.split(/\s+/).length;

      const newResult: APIResponse = {
        success: true,
        message: "Generated",
        data: {
          article: articleText,
          wordCount,
          language: formData.language,
          photoBase64: formData.photo?.data,
          photoFilename: formData.photo?.fileName,
          generatedAt,
          topic: formData.topic
        }
      };

      const historyItem: HistoryItem = {
        id: crypto.randomUUID(),
        topic: formData.topic,
        article: articleText,
        generatedAt,
        language: formData.language,
        photoBase64: formData.photo?.data,
        photoFilename: formData.photo?.fileName,
        wordCount
      };

      setResult(newResult);
      setHistory(prev => [historyItem, ...prev].slice(0, 20));

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: any) {
      setError(err.message || "Failed to generate article. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToApp = () => {
    setCurrentView('app');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };

  const navigateToHistory = () => {
    setCurrentView('history');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--light-bg)]">

      {currentView === 'landing' && (
        <LandingPage
          onGetStarted={navigateToApp}
          onHistoryClick={navigateToHistory}
        />
      )}

      {currentView === 'history' && (
        <HistoryPage
          history={history}
          onLoadHistory={loadFromHistory}
          onClearHistory={() => setHistory([])}
          onBack={navigateToHome}
        />
      )}

      {currentView === 'app' && (
        <div className="animate-fadeIn">
          <Header
            onLogoClick={navigateToHome}
            showBackBtn={true}
            onBackClick={navigateToHome}
          />

          <main className="main-content">
            <section className="animate-fadeIn">
              <NewsForm
                formData={formData}
                isSubmitting={isSubmitting}
                onFormChange={handleFormChange}
                onClear={handleClearForm}
                onSubmit={handleSubmit}
              />
            </section>

            <section className="lg:sticky lg:top-[140px] h-fit animate-fadeIn" ref={resultsRef}>
              <ArticlePreview
                result={result}
                isSubmitting={isSubmitting}
                error={error}
                onRetry={() => handleSubmit()}
                onReset={handleResetResult}
              />
            </section>
          </main>

          <footer className="p-10 text-center text-[#666] text-sm border-t border-[#e0e0e0] bg-white">
            <p className="font-bold mb-1 uppercase tracking-widest text-[10px] text-[#FF9933]">AI News Generator</p>
            <p className="hindi-font font-medium">&copy; 2024 - समाचार जेनरेटर • Powered by Gemini AI</p>
            <p className="text-[10px] mt-4 opacity-50">This tool uses artificial intelligence. Please verify facts before publishing.</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
