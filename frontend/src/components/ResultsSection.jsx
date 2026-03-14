import {
  CheckCircle2,
  XCircle,
  BarChart3,
  ShieldAlert,
  Eye,
} from "lucide-react";

/**
 * ResultsSection — displays prediction label, confidence bar, reliability
 * badge, and side-by-side original + Grad-CAM heatmap.
 *
 * Props
 * -----
 * result   : { label, confidence, reliability, heatmap }
 * preview  : string — data URL of the uploaded image
 */
export default function ResultsSection({ result, preview }) {
  if (!result) return null;

  const isReal = result.label === "Real";
  const pct = Math.round(result.confidence * 100);

  // Label styling
  const labelClasses = isReal
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-red-50 text-red-700 border-red-200";

  const labelIcon = isReal ? (
    <CheckCircle2 size={20} className="text-green-500" />
  ) : (
    <XCircle size={20} className="text-red-500" />
  );

  // Reliability styling
  const relMap = {
    High: "bg-green-50 text-green-700",
    Medium: "bg-yellow-50 text-yellow-700",
    Low: "bg-red-50 text-red-700",
  };

  return (
    <section className="max-w-4xl mx-auto px-4 pb-20 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Eye size={22} className="text-brand-600" />
        Analysis Results
      </h2>

      {/* Top row: label + confidence + reliability */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {/* Prediction label */}
        <div className={`card flex items-center gap-3 border ${labelClasses}`}>
          {labelIcon}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider opacity-70">
              Prediction
            </p>
            <p className="text-lg font-bold">{result.label}</p>
          </div>
        </div>

        {/* Confidence */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-brand-500" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Confidence
            </p>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{pct}%</p>
          <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full animate-grow"
              style={{
                width: `${pct}%`,
                background: isReal
                  ? "linear-gradient(90deg, #22c55e, #16a34a)"
                  : "linear-gradient(90deg, #ef4444, #dc2626)",
              }}
            />
          </div>
        </div>

        {/* Reliability */}
        <div className="card flex items-center gap-3">
          <ShieldAlert size={20} className="text-brand-500" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Reliability
            </p>
            <span className={`badge mt-1 ${relMap[result.reliability] || ""}`}>
              {result.reliability}
            </span>
          </div>
        </div>
      </div>

      {/* Explainability: side-by-side */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Explainability — Grad-CAM Heatmap
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-2">
          <p className="text-xs font-medium text-gray-400 mb-2 ml-1">
            Original Image
          </p>
          <img
            src={preview}
            alt="Original"
            className="w-full rounded-lg object-contain max-h-72 bg-gray-50"
          />
        </div>
        <div className="card p-2">
          <p className="text-xs font-medium text-gray-400 mb-2 ml-1">
            Grad-CAM Heatmap
          </p>
          <img
            src={`data:image/png;base64,${result.heatmap}`}
            alt="Grad-CAM heatmap"
            className="w-full rounded-lg object-contain max-h-72 bg-gray-50"
          />
        </div>
      </div>
    </section>
  );
}
