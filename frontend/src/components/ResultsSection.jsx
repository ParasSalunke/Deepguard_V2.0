import { CheckCircle2, XCircle, TrendingUp, AlertTriangle } from "lucide-react";

/**
 * ResultsSection — displays prediction label, confidence bar, and
 * side-by-side original + Grad-CAM heatmap.
 *
 * Props
 * -----
 * result   : { label, confidence, heatmap }
 * preview  : string — data URL of the uploaded image
 */
export default function ResultsSection({ result, preview }) {
  if (!result) return null;

  const isReal = result.label === "Real";
  const pct = Math.round(result.confidence * 100);

  // Determine confidence level
  const getConfidenceLevel = () => {
    if (pct >= 90) return { text: "Very High", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" };
    if (pct >= 75) return { text: "High", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" };
    if (pct >= 60) return { text: "Medium", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" };
    return { text: "Low", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20" };
  };

  const confidenceLevel = getConfidenceLevel();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Results header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            {isReal ? (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <CheckCircle2 size={32} className="text-white" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                <XCircle size={32} className="text-white" />
              </div>
            )}
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {result.label}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isReal ? "This image appears to be authentic" : "This image appears to be AI-generated"}
          </p>
        </div>

        {/* Confidence metrics */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
          {/* Confidence score */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confidence Score
              </h3>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
                {pct}
              </span>
              <span className="text-3xl text-gray-500 dark:text-gray-400">%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${isReal ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Reliability indicator */}
          <div className={`${confidenceLevel.bg} rounded-2xl p-6 border ${isReal ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'} shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${isReal ? 'bg-green-200 dark:bg-green-900/30' : 'bg-red-200 dark:bg-red-900/30'} flex items-center justify-center`}>
                <AlertTriangle size={20} className={isReal ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Reliability
              </h3>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${confidenceLevel.bg} border ${isReal ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700'}`}>
              <span className={`text-2xl font-bold ${confidenceLevel.color}`}>
                {confidenceLevel.text}
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Based on model confidence and training data
            </p>
          </div>
        </div>

        {/* Visual explanation */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Visual Explanation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The Grad-CAM heatmap highlights the regions that influenced the AI's decision
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Original image */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-600 transition-all">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    📷 Original Image
                  </p>
                </div>
                <div className="p-6">
                  <img
                    src={preview}
                    alt="Original"
                    className="w-full h-80 object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Heatmap */}
            <div className="group">
              <div className="bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-2xl overflow-hidden border-2 border-brand-200 dark:border-brand-800 hover:border-brand-400 dark:hover:border-brand-600 transition-all">
                <div className="p-4 border-b border-brand-200 dark:border-brand-800 bg-white dark:bg-gray-800/50">
                  <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">
                    🔥 Grad-CAM Heatmap
                  </p>
                </div>
                <div className="p-6">
                  <img
                    src={`data:image/png;base64,${result.heatmap}`}
                    alt="Grad-CAM heatmap"
                    className="w-full h-80 object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Explanation text */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-brand-600 dark:text-brand-400">How to interpret:</strong> The red/yellow regions in the heatmap show areas the AI model focused on most when making its prediction. This transparency helps you understand and trust the AI's decision-making process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
