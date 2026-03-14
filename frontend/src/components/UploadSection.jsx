import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

/**
 * UploadSection — drag-and-drop or click-to-upload image area.
 *
 * Props
 * -----
 * onFileSelect : (file: File) => void
 * isLoading    : boolean
 */
export default function UploadSection({ onFileSelect, isLoading }) {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // --- handlers -----------------------------------------------------------
  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a JPG or PNG image.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too large. Maximum size is 10 MB.");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    },
    []
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handleInputChange = (e) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const clearPreview = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (selectedFile) onFileSelect(selectedFile);
  };

  // --- render -------------------------------------------------------------
  return (
    <section id="upload" className="max-w-2xl mx-auto px-4 pb-16">
      <div className="card animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Upload Image</h2>
        <p className="text-sm text-gray-400 mb-5">
          Drop an image below or click to browse. Accepts JPG &amp; PNG (max 10 MB).
        </p>

        {/* Drop zone */}
        {!preview && (
          <label
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`
              flex flex-col items-center justify-center gap-3
              h-56 rounded-xl border-2 border-dashed cursor-pointer
              transition-colors duration-200
              ${dragActive
                ? "border-brand-500 bg-brand-50"
                : "border-gray-200 hover:border-brand-400 hover:bg-gray-50"}
            `}
          >
            <Upload
              size={32}
              className={dragActive ? "text-brand-500" : "text-gray-300"}
            />
            <span className="text-sm text-gray-400">
              {dragActive ? "Drop image here" : "Drag & drop or click to browse"}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
        )}

        {/* Preview */}
        {preview && (
          <div className="relative rounded-xl overflow-hidden border border-gray-100">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-80 object-contain bg-gray-50"
            />
            {!isLoading && (
              <button
                onClick={clearPreview}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80
                           hover:bg-white shadow text-gray-500 hover:text-red-500
                           transition-colors"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {/* Upload button */}
        {preview && (
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className="btn-primary w-full mt-5"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Analyzing image with AI…
              </>
            ) : (
              <>
                <ImageIcon size={18} />
                Analyze Image
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
