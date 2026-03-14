import { ShieldCheck, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
      {/* Decorative gradient blob */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full
                   bg-gradient-to-br from-brand-200/40 via-brand-100/20 to-transparent
                   blur-3xl pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                        bg-brand-50 text-brand-700 text-sm font-medium mb-6
                        border border-brand-200 animate-fade-in-up">
          <Sparkles size={14} />
          Powered by Explainable AI
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight
                     text-gray-900 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Deep
          <span className="text-brand-600">Guard</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-5 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto
                     animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Detect AI-generated images with transparency. Get instant predictions,
          confidence scores, and visual explanations powered by{" "}
          <span className="font-semibold text-gray-700">Grad-CAM</span>.
        </p>

        {/* Trust indicators */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-400
                     animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-green-500" />
            Academic-Grade Model
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-green-500" />
            Explainable Results
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-green-500" />
            Open Source
          </span>
        </div>
      </div>
    </section>
  );
}
