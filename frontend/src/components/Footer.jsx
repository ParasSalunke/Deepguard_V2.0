import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white">
            <Shield size={16} />
          </div>
          <span className="font-bold text-gray-900">DeepGuard</span>
        </div>

        <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          DeepGuard is an academic research project demonstrating Explainable AI
          for image authenticity detection. It is not intended for production
          forensic use.
        </p>

        <div className="mt-6 text-xs text-gray-300">
          &copy; {new Date().getFullYear()} DeepGuard &middot; Built with
          React, FastAPI &amp; TensorFlow
        </div>
      </div>
    </footer>
  );
}
