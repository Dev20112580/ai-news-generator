
import React from 'react';
import { NewsFormData, Language, Tone } from '../types';
import FileUpload from './FileUpload';

interface NewsFormProps {
  formData: NewsFormData;
  isSubmitting: boolean;
  onFormChange: (data: Partial<NewsFormData>) => void;
  onClear: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const NewsForm: React.FC<NewsFormProps> = ({
  formData,
  isSubmitting,
  onFormChange,
  onClear,
  onSubmit
}) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isFormValid = formData.topic.trim() && formData.facts.trim() && formData.email.trim() && isEmailValid;

  return (
    <div className="card">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* 1. Topic */}
        <div className="form-group">
          <label className="form-label">
            <span className="icon">📝</span> Topic/Headline (विषय/शीर्षक) <span className="required"></span>
          </label>
          <input
            type="text"
            required
            maxLength={120}
            placeholder="उदाहरण: मुंबई में भारी बारिश"
            value={formData.topic}
            onChange={(e) => onFormChange({ topic: e.target.value })}
            disabled={isSubmitting}
          />
          <div className="char-counter">
            {formData.topic.length}/120
          </div>
        </div>

        {/* 2. Key Facts */}
        <div className="form-group">
          <label className="form-label">
            <span className="icon">📋</span> Key Facts (मुख्य तथ्य) <span className="required"></span>
          </label>
          <textarea
            required
            rows={5}
            maxLength={3000}
            placeholder="महत्वपूर्ण जानकारी लिखें..."
            value={formData.facts}
            onChange={(e) => onFormChange({ facts: e.target.value })}
            disabled={isSubmitting}
          />
          <div className="char-counter">
            {formData.facts.length}/3000
          </div>
        </div>

        {/* 3. Photo Upload */}
        <FileUpload
          photo={formData.photo}
          onPhotoChange={(photo) => onFormChange({ photo })}
        />

        {/* 4. Location */}
        <div className="form-group">
          <label className="form-label"><span className="icon">📍</span> Location (स्थान)</label>
          <input
            type="text"
            maxLength={100}
            placeholder="Mumbai, Maharashtra"
            value={formData.location}
            onChange={(e) => onFormChange({ location: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        {/* 5. Date Time */}
        <div className="form-group">
          <label className="form-label"><span className="icon">📅</span> Date/Time (तारीख/समय)</label>
          <input
            type="datetime-local"
            value={formData.date}
            onChange={(e) => onFormChange({ date: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        {/* 6. Sources */}
        <div className="form-group">
          <label className="form-label"><span className="icon">📰</span> Sources (स्रोत)</label>
          <input
            type="text"
            maxLength={200}
            placeholder="IMD, Police..."
            value={formData.sources}
            onChange={(e) => onFormChange({ sources: e.target.value })}
            disabled={isSubmitting}
          />
          <div className="char-counter">{formData.sources.length}/200</div>
        </div>

        {/* 7. Language */}
        <div className="form-group">
          <label className="form-label"><span className="icon">🌐</span> Language (भाषा) <span className="required"></span></label>
          <select
            value={formData.language}
            onChange={(e) => onFormChange({ language: e.target.value as Language })}
            disabled={isSubmitting}
          >
            <option value={Language.Hindi}>🇮🇳 Hindi</option>
            <option value={Language.English}>🇺🇸 English</option>
            <option value={Language.Hinglish}>🇮🇳 Hinglish</option>
          </select>
        </div>

        {/* 8. Tone */}
        <div className="form-group">
          <label className="form-label"><span className="icon">🎯</span> Tone/Style (लहजा)</label>
          <select
            value={formData.tone}
            onChange={(e) => onFormChange({ tone: e.target.value as Tone })}
            disabled={isSubmitting}
          >
            <option value={Tone.Professional}>Professional (पेशेवर)</option>
            <option value={Tone.Urgent}>Urgent (जरूरी)</option>
            <option value={Tone.Casual}>Casual (आरामदायक)</option>
            <option value={Tone.Formal}>Formal (औपचारिक)</option>
          </select>
        </div>

        {/* 9. Word Count */}
        <div className="form-group">
          <label className="form-label"><span className="icon">📊</span> Word Count (शब्द संख्या)</label>
          <input
            type="number"
            min={100}
            max={2000}
            value={formData.wordCount}
            onChange={(e) => onFormChange({ wordCount: parseInt(e.target.value) || 500 })}
            disabled={isSubmitting}
          />
          <p className="char-counter">लगभग {formData.wordCount} शब्द का आर्टिकल बनेगा</p>
        </div>

        {/* 10. Email */}
        <div className="form-group">
          <label className="form-label"><span className="icon">📧</span> Email (ईमेल) <span className="required"></span></label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => onFormChange({ email: e.target.value })}
            disabled={isSubmitting}
          />
          {formData.email && !isEmailValid && (
            <p className="text-[12px] text-[#dc3545] font-medium mt-1">Invalid email format</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Processing...
              </>
            ) : (
              '📨 Generate'
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={isSubmitting}
            className="btn-secondary"
          >
            🔄 Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
