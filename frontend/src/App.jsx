import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import UploadSection from "./components/UploadSection";
import ResultsSection from "./components/ResultsSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import { predictImage } from "./services/api";

export default function App() {
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setPreview(URL.createObjectURL(file));

    try {
      const data = await predictImage(file);
      setResult(data);
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <UploadSection onFileSelect={handleFileSelect} isLoading={isLoading} />

        {/* Error banner */}
        {error && (
          <div className="max-w-2xl mx-auto px-4 pb-8">
            <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 text-sm">
              {error}
            </div>
          </div>
        )}

        {/* Results */}
        {result && <ResultsSection result={result} preview={preview} />}

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}
