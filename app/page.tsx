import { Network, ArrowRight, PlayCircle, Video, Brain, Library, FileQuestion, Subtitles } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 h-16 glass-panel border-b border-outline-variant z-50 flex items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-3">
          <Network className="text-primary w-6 h-6" />
          <span className="font-headline text-[24px] leading-[32px] font-semibold text-primary tracking-tight">Mnemosyne</span>
        </div>
        <div>
          <button className="bg-primary-container text-on-primary-container font-mono text-[14px] leading-[20px] font-medium tracking-wide px-4 py-2 rounded border border-transparent hover:bg-inverse-primary transition-colors">
            Get Started
          </button>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 md:px-10 py-16 md:py-24 bg-grid-pattern overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-primary-container/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center gap-6 md:gap-8">
            <div className="inline-flex items-center gap-2 bg-surface border border-outline-variant rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-[14px] leading-[20px] font-medium tracking-wide text-on-surface-variant">Version 2.0 Now Available</span>
            </div>
            
            <h1 className="font-headline text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-bold text-on-surface tracking-tight max-w-4xl">
              Mnemosyne — AI Video Knowledge Platform
            </h1>
            
            <p className="font-body text-[clamp(1rem,2vw,1.125rem)] leading-[1.65] text-on-surface-variant max-w-2xl">
              Transform raw video into a structured, searchable knowledge graph. Engineered for deep research, powered by institutional-grade AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 w-full sm:w-auto">
              <button className="bg-primary-container text-on-primary-container font-mono text-[14px] leading-[20px] font-medium tracking-wide px-6 py-3 rounded hover:bg-inverse-primary transition-colors flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                Get Started
                <ArrowRight className="w-[18px] h-[18px]" />
              </button>
              <button className="bg-transparent border border-outline-variant text-on-surface font-mono text-[14px] leading-[20px] font-medium tracking-wide px-6 py-3 rounded hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
                <PlayCircle className="w-[18px] h-[18px]" />
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-20 md:py-24">
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-on-surface mb-4">Command Center for Knowledge</h2>
            <p className="font-body text-[16px] leading-[24px] text-on-surface-variant max-w-xl mx-auto md:mx-0">Precision ingestion, advanced retrieval, and automated intelligence derivation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch auto-rows-fr">
            {/* Video Ingestion */}
            <div className="md:col-span-8 bg-surface border border-outline-variant rounded-xl p-6 sm:p-8 relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-[60px]"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <Video className="text-primary w-8 h-8 mb-4" />
                  <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-on-surface mb-2">Video Ingestion</h3>
                  <p className="font-body text-[16px] leading-[24px] text-on-surface-variant">Seamlessly import from YouTube or direct upload. Our pipeline handles encoding, chunking, and storage with zero configuration required.</p>
                </div>
                <div className="mt-8 flex gap-3">
                  <span className="font-mono text-[14px] leading-[20px] font-medium tracking-wide bg-secondary-container text-on-secondary-container px-3 py-1 rounded">YouTube API</span>
                  <span className="font-mono text-[14px] leading-[20px] font-medium tracking-wide bg-secondary-container text-on-secondary-container px-3 py-1 rounded">Direct Upload</span>
                </div>
              </div>
            </div>

            {/* Derived AI Features */}
            <div className="md:col-span-4 p-[1px] rounded-xl bg-gradient-to-br from-[#2d5a6e] to-[#41484c] relative overflow-hidden h-full">
              <div className="bg-surface h-full w-full rounded-[11px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent"></div>
                <div className="relative z-10">
                  <Brain className="text-primary w-8 h-8 mb-4" />
                  <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-on-surface mb-2">Derived Intelligence</h3>
                  <p className="font-body text-[16px] leading-[24px] text-on-surface-variant mb-6">Automatically generate study materials and assessments from source material.</p>
                  <div className="space-y-3">
                    <div className="bg-surface-container-high border border-outline-variant p-3 rounded-lg flex items-center gap-3">
                      <Library className="text-tertiary w-5 h-5" />
                      <span className="font-mono text-[14px] leading-[20px] font-medium tracking-wide text-on-surface">Flashcards</span>
                    </div>
                    <div className="bg-surface-container-high border border-outline-variant p-3 rounded-lg flex items-center gap-3">
                      <FileQuestion className="text-tertiary w-5 h-5" />
                      <span className="font-mono text-[14px] leading-[20px] font-medium tracking-wide text-on-surface">Quizzes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Transcription */}
            <div className="md:col-span-5 bg-surface border border-outline-variant rounded-xl p-6 sm:p-8 flex flex-col h-full">
              <Subtitles className="text-primary w-8 h-8 mb-4" />
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-on-surface mb-2">AI Transcription</h3>
              <p className="font-body text-[16px] leading-[24px] text-on-surface-variant mb-6">High-fidelity diaritized transcripts with precise timestamps.</p>
              
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg flex-grow overflow-hidden flex flex-col text-sm">
                <div className="px-4 py-2 bg-surface-container-high flex gap-4 border-b border-outline-variant">
                  <span className="font-mono text-[13px] leading-[18px] text-tertiary w-12 pt-1">00:12</span>
                  <span className="font-body text-[16px] leading-[24px] text-on-surface">The core concept revolves around vector embeddings.</span>
                </div>
                <div className="px-4 py-2 flex gap-4 border-b border-outline-variant">
                  <span className="font-mono text-[13px] leading-[18px] text-tertiary w-12 pt-1">00:18</span>
                  <span className="font-body text-[16px] leading-[24px] text-on-surface">By mapping concepts to high-dimensional space...</span>
                </div>
                <div className="px-4 py-2 bg-surface-container-high flex gap-4">
                  <span className="font-mono text-[13px] leading-[18px] text-tertiary w-12 pt-1">00:24</span>
                  <span className="font-body text-[16px] leading-[24px] text-on-surface">We can achieve semantic retrieval across modalities.</span>
                </div>
              </div>
            </div>

            {/* Hybrid Retrieval */}
            <div className="md:col-span-7 bg-surface border border-outline-variant rounded-xl p-6 sm:p-8 relative flex flex-col h-full">
              <div className="relative z-10">
                <Network className="text-primary w-8 h-8 mb-4" />
                <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-on-surface mb-2">Hybrid Retrieval</h3>
                <p className="font-body text-[16px] leading-[24px] text-on-surface-variant mb-6">Combine exact keyword matching with dense vector search for unparalleled accuracy.</p>
              </div>
              
              <div className="w-full min-h-48 bg-surface-container border border-outline-variant rounded-lg relative overflow-hidden flex items-center justify-center mt-auto">
                <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
                <div className="flex items-center gap-4 sm:gap-8 relative z-10 px-4 py-8 flex-wrap justify-center">
                  <div className="w-20 h-20 bg-surface border border-outline-variant rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(45,90,110,0.3)]">
                    <span className="font-mono text-[14px] leading-[20px] font-medium tracking-wide text-on-surface">OpenSearch</span>
                  </div>
                  <div className="w-10 sm:w-16 h-[2px] bg-outline-variant relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-primary w-1/2 animate-[pulse_2s_ease-in-out_infinite]"></div>
                  </div>
                  <div className="w-20 h-20 bg-primary-container border border-primary text-on-primary-container rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(160,205,228,0.2)]">
                    <span className="font-mono text-[14px] leading-[20px] font-medium tracking-wide">Qdrant</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant py-8 mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Network className="text-tertiary w-5 h-5" />
            <span className="font-mono text-[14px] leading-[20px] font-medium tracking-wide text-tertiary">© 2024 Mnemosyne. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a className="font-mono text-[14px] leading-[20px] font-medium tracking-wide text-on-surface-variant hover:text-primary transition-colors" href="#">Documentation</a>
            <a className="font-mono text-[14px] leading-[20px] font-medium tracking-wide text-on-surface-variant hover:text-primary transition-colors" href="#">API</a>
            <a className="font-mono text-[14px] leading-[20px] font-medium tracking-wide text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
