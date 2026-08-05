import { WriteupsSection } from "../components/home/WriteupsSection";

export function WriteupsIndexPage() {
  return (
    <div className="w-full flex justify-center pb-48">
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col pt-[25vh]">
        <WriteupsSection />
      </div>
    </div>
  );
}
