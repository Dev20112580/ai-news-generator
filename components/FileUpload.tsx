
import React, { useState } from 'react';
import { PhotoData } from '../types';

interface FileUploadProps {
  photo: PhotoData | null;
  onPhotoChange: (photo: PhotoData | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ photo, onPhotoChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Max 5MB.");
      return;
    }

    // Validate format
    const validFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validFormats.includes(file.type)) {
      setError("Invalid format. Use JPG, PNG, WebP or GIF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(',')[1];

      onPhotoChange({
        fileName: file.name,
        mimeType: file.type,
        data: base64,
        preview: dataUrl,
        size: file.size
      });
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="form-group">
      <label className="form-label">
        <span className="icon">📸</span> Photo/Image Upload (फोटो अपलोड करें)
      </label>

      {!photo ? (
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          className="photo-upload"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <div className="text-4xl mb-2 text-[#FF9933] opacity-50">📤</div>
          <p className="photo-upload-text">Click or drag photo here</p>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.webp,.gif"
            onChange={onSelectFile}
          />
        </div>
      ) : (
        <div className="photo-preview">
          <div className="relative">
            <img
              src={photo.preview}
              alt="Preview"
            />
            <button
              type="button"
              onClick={() => onPhotoChange(null)}
              className="absolute -top-2 -right-2 bg-[#dc3545] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-[#c82333] shadow-md transition-all active:scale-90"
              title="Remove photo"
            >
              ×
            </button>
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-sm font-bold text-[#1a1a1a] truncate">{photo.fileName}</p>
            <p className="text-xs text-[#666] mt-1">{formatSize(photo.size)}</p>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-[#dc3545] mt-1 font-medium italic">⚠️ {error}</p>}
    </div>
  );
};

export default FileUpload;
