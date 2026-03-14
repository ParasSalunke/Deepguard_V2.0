import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-600 text-white">
              <Shield size={20} />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                DeepGuard
              </span>
              <span className="hidden sm:inline text-xs text-gray-400 ml-2">
                Explainable AI for Image Authenticity
              </span>
            </div>
          </div>

          {/* Right side */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
