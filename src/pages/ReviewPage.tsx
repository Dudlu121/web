import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Award } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AI_CERT_REVIEW_TEXT } from "../data/writeups";

export function ReviewPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-cyber-blue/30 selection:text-white pb-32">
      {/* Background FX */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyber-blue/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyber-blue/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 md:pt-32">
        {/* Navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 text-white/50 hover:text-cyber-blue transition-colors group px-4 py-2 rounded-full hover:bg-cyber-blue/10 border border-transparent hover:border-cyber-blue/20 mb-12 -ml-4"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">Return to Hub</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-cyber-blue">
            <span className="bg-cyber-blue/10 px-4 py-2 rounded-full border border-cyber-blue/20 flex items-center gap-2">
              <Award size={14} /> TryHackMe Certificate Review
            </span>
            <span className="text-white/40">Beta Tester Insights</span>
          </div>

          <h1 className="font-sans text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
            TryHackMe AI Security Review
          </h1>
          
          <p className="font-sans text-xl md:text-2xl text-white/50 font-light leading-relaxed border-l-2 border-cyber-blue/40 pl-6">
            Detailed beta tester insights, grading engine analysis, and the required skillset to pass the new AI1 Certificate.
          </p>
        </div>

        {/* Content */}
        <div className="font-sans text-base md:text-lg text-white/80 leading-[1.8] font-light writeup-markdown glass-panel p-8 md:p-16 rounded-[2rem] border border-white/5 shadow-2xl">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl md:text-5xl font-black text-white mt-16 mb-8 tracking-tight" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-bold text-cyber-blue mt-10 mb-4" {...props} />,
              p: ({node, ...props}) => <p className="mb-6 leading-relaxed" {...props} />,
              a: ({node, ...props}) => <a className="text-cyber-blue hover:text-white underline decoration-cyber-blue/30 underline-offset-4 transition-colors" target="_blank" rel="noreferrer" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-white/70" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-white/70" {...props} />,
              li: ({node, ...props}) => <li className="pl-2" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-cyber-blue/50 pl-6 my-8 italic text-white/60 bg-white/5 py-6 pr-6 rounded-r-xl" {...props} />,
              img: ({node, ...props}) => (
                <span className="block my-16 group relative max-w-2xl mx-auto">
                  <span className="absolute inset-0 bg-cyber-blue/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
                  <img 
                    className="w-full rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:border-cyber-blue/50 group-hover:scale-[1.01] transition-all duration-700 relative z-10" 
                    loading="lazy"
                    {...props} 
                  />
                  {props.alt && <span className="block text-center text-sm font-mono text-white/30 mt-6 tracking-widest uppercase">{props.alt}</span>}
                </span>
              )
            }}
          >
            {AI_CERT_REVIEW_TEXT}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
