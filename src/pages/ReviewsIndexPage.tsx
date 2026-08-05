import { AiReviewSection } from "../components/home/AiReviewSection";

export function ReviewsIndexPage() {
  return (
    <div className="w-full flex justify-center pb-48">
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col pt-[25vh]">
        <div className="font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-16 flex items-center gap-4">
          <div className="w-24 h-[1px] bg-white/20" />
          Certification Reviews
        </div>
        <AiReviewSection />
      </div>
    </div>
  );
}
