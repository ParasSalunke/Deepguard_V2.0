import { BrainCircuit, BarChart3, Eye, GraduationCap } from "lucide-react";

const features = [
  {
    icon: <BrainCircuit size={28} />,
    title: "Explainable AI",
    desc: "Understand WHY the model made its decision through visual Grad-CAM heatmaps.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Confidence Scoring",
    desc: "Get a precise probability score so you know how certain the model is.",
  },
  {
    icon: <Eye size={28} />,
    title: "Transparent Results",
    desc: "No black-box answers — every prediction comes with a visual explanation.",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Academic Reliability",
    desc: "Built with transfer learning on ResNet50, suitable for research and presentations.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50/60 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
          Why DeepGuard?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card text-center hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14
                              rounded-xl bg-brand-50 text-brand-600 mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
