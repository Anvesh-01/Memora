import Image from 'next/image';
import { Sparkles, Timer, LineChart, Filter, ArrowUpDown, ListTodo, CheckCircle2, History } from 'lucide-react';

export default function Quizzes() {
  return (
    <div className="p-6 md:p-10 md:px-6 max-w-[1440px] mx-auto w-full">
      <div className="mb-10">
        <h2 className="font-display-lg text-[48px] text-on-background mb-2 leading-tight">Assessments</h2>
        <p className="font-body-lg text-[18px] text-on-surface-variant max-w-3xl">Evaluate your comprehension across analyzed video lectures and research collections. AI-generated quizzes adapt to your knowledge graph gaps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Recommended Quiz Hero */}
        <div className="col-span-1 md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col md:flex-row relative">
          <div className="absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none" style={{ background: 'linear-gradient(45deg, #0749a1, #94d0fd) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'destination-out', maskComposite: 'exclude' }}></div>
          <div className="md:w-2/5 h-48 md:h-auto relative">
             <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB3xXoR-9HT-mWsMWWloyN3GnSb-cDu22peflcQhRUBe3apRhyw8lofBt3BntUVueXIHiBuJVAnqGS3vHZlTKcHMNk94VDPXG9oyIUynXBC0gDJyxw8dRjsOgSllVk45tCR3nRAxt_713zy577h1iKtHP1B3OXdiqwjZRoQRvUrTzOG8A_fwxI5ijpRBrJbAPGtl_PHRv5HpAjInNwREXp6CcKC30Tq8ACmqwnOBuWhuR6dWv379ki-Rh3W6PFLAHeGBtjWklV0uH_" alt="Thumb" fill className="object-cover" referrerPolicy="no-referrer"/>
             <div className="absolute top-4 left-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-md text-[14px] flex items-center gap-1 shadow-sm">
                <Sparkles className="w-4 h-4" /> Recommended
             </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center flex-1 z-10 bg-surface-container-lowest/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded font-code-sm text-[13px]">Collection: Quantum Mechanics</span>
              <span className="text-on-surface-variant font-label-md text-[14px] flex items-center gap-1"><Timer className="w-4 h-4"/> 15 mins</span>
            </div>
            <h3 className="font-headline-lg text-[32px] leading-tight text-on-surface mb-2">Wave-Particle Duality Synthesis</h3>
            <p className="font-body-md text-[16px] text-on-surface-variant mb-6">Generated from your recent viewing of &quot;Feynman Lectures&quot; and &quot;Double Slit Experiment Visualized&quot;. Focuses on bridging conceptual gaps identified in your last session.</p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-dim flex items-center justify-center font-label-md text-xs text-on-surface">20Q</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-dim flex items-center justify-center font-label-md text-xs text-on-surface">MC</div>
              </div>
              <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-[14px] hover:bg-primary-container transition-colors shadow-sm">Start Assessment</button>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex-1">
            <h4 className="font-headline-md text-[24px] text-on-surface mb-6 flex items-center gap-2">
              <LineChart className="w-6 h-6 text-primary" /> Performance Overview
            </h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between font-label-md text-[14px] mb-2">
                  <span className="text-on-surface-variant">Average Score</span>
                  <span className="text-on-surface font-bold">84%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{width: '84%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-md text-[14px] mb-2">
                  <span className="text-on-surface-variant">Assessments Completed</span>
                  <span className="text-on-surface font-bold">12 / 15</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-outline-variant">
              <p className="font-label-md text-[14px] text-on-surface-variant mb-3">Strongest Domains</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 border border-outline-variant rounded-full font-code-sm text-[13px] text-on-surface">Linear Algebra</span>
                <span className="px-3 py-1 border border-outline-variant rounded-full font-code-sm text-[13px] text-on-surface">Deep Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Library Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h3 className="font-headline-lg text-[32px] text-on-background">Available Quizzes</h3>
          <p className="font-body-md text-[16px] text-on-surface-variant mt-1">Generated from your library and knowledge graph.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-outline-variant rounded-lg font-label-md text-[14px] text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4"/> Filter
          </button>
          <button className="px-4 py-2 border border-outline-variant rounded-lg font-label-md text-[14px] text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4"/> Sort
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {/* Quiz 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary transition-colors group flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="px-2 py-0.5 bg-surface-container text-on-surface rounded font-code-sm text-[13px]">Video Lecture</span>
            <span className="text-secondary font-label-md text-[14px] bg-secondary-fixed px-2 py-0.5 rounded-full">New</span>
          </div>
          <h4 className="font-headline-md text-[24px] text-on-surface mb-2 group-hover:text-primary transition-colors leading-tight">Advanced CNN Architectures</h4>
          <p className="font-body-md text-[16px] text-on-surface-variant mb-6 flex-1 line-clamp-2">Test your understanding of ResNet, Inception, and Attention mechanisms discussed in Lecture 4.</p>
          <div className="border-t border-outline-variant pt-4 mt-auto">
            <div className="flex justify-between items-center mb-4 text-on-surface-variant font-label-md text-[14px]">
              <span className="flex items-center gap-1"><ListTodo className="w-4 h-4"/> 10 Questions</span>
              <span className="flex items-center gap-1"><Timer className="w-4 h-4"/> 10m</span>
            </div>
            <button className="w-full py-2 border border-primary text-primary rounded-lg font-label-md text-[14px] hover:bg-primary-fixed transition-colors">Start Quiz</button>
          </div>
        </div>

        {/* Quiz 2 Completed */}
        <div className="bg-surface border border-outline-variant rounded-xl p-5 flex flex-col opacity-90">
          <div className="flex justify-between items-start mb-4">
            <span className="px-2 py-0.5 bg-surface-container-highest text-on-surface rounded font-code-sm text-[13px]">Collection: Data Structs</span>
            <span className="text-primary font-label-md text-[14px] flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Completed</span>
          </div>
          <h4 className="font-headline-md text-[24px] text-on-surface mb-2 leading-tight">Graph Traversal Algorithms</h4>
          <p className="font-body-md text-[16px] text-on-surface-variant mb-6 flex-1 line-clamp-2">Comprehensive review of BFS, DFS, Dijkstra&apos;s, and A* search methodologies.</p>
          <div className="border-t border-outline-variant pt-4 mt-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="font-label-md text-[14px] text-on-surface-variant text-xs">High Score</span>
                <span className="font-headline-md text-[24px] text-primary">92%</span>
              </div>
              <span className="font-label-md text-[14px] text-on-surface-variant flex items-center gap-1 text-sm"><History className="w-4 h-4"/> 2 days ago</span>
            </div>
            <button className="w-full py-2 border border-outline-variant text-on-surface-variant rounded-lg font-label-md text-[14px] hover:bg-surface-container-low transition-colors">Retake Quiz</button>
          </div>
        </div>

        {/* Quiz 3 AI Gen */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary transition-colors group flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{background: 'radial-gradient(circle at top right, rgba(7, 73, 161, 0.1) 0%, transparent 70%)'}}></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="px-2 py-0.5 bg-surface-container text-on-surface rounded font-code-sm text-[13px]">Custom Generation</span>
            <span title="AI Generated"><Sparkles className="text-primary w-4 h-4" /></span>
          </div>
          <h4 className="font-headline-md text-[24px] text-on-surface mb-2 group-hover:text-primary transition-colors leading-tight relative z-10">Statistical Mechanics Midterm Prep</h4>
          <p className="font-body-md text-[16px] text-on-surface-variant mb-6 flex-1 line-clamp-2 relative z-10">Synthesized from 3 distinct video sources. Focus on partition functions and thermodynamic potentials.</p>
          <div className="border-t border-outline-variant pt-4 mt-auto relative z-10">
            <div className="flex justify-between items-center mb-4 text-on-surface-variant font-label-md text-[14px]">
              <span className="flex items-center gap-1"><ListTodo className="w-4 h-4"/> 25 Questions</span>
              <span className="flex items-center gap-1"><Timer className="w-4 h-4"/> 30m</span>
            </div>
            <button className="w-full py-2 border border-primary text-primary rounded-lg font-label-md text-[14px] hover:bg-primary-fixed transition-colors bg-surface-container-lowest">Start Quiz</button>
          </div>
        </div>

      </div>
    </div>
  );
}
