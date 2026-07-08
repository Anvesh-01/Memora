import Image from 'next/image';
import { Zap, TrendingUp, Brain, History, Upload, Wand2, Play } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-8">
        <h2 className="font-headline-lg text-[32px] text-on-surface mb-2">Overview</h2>
        <p className="font-body-lg text-[18px] text-on-surface-variant">Your cognitive workspace summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Quick Actions */}
        <section className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-primary w-6 h-6 fill-current opacity-20" strokeWidth={2.5} />
              <h3 className="font-headline-md text-[18px] text-on-surface">Quick Actions</h3>
            </div>
            <p className="font-body-md text-[14px] text-on-surface-variant mb-6">Initiate new processing tasks or access frequent tools.</p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="w-full bg-primary text-on-primary font-label-md text-[14px] py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-tint transition-colors">
              <Upload className="w-5 h-5" />
              Upload Video
            </button>
            <button className="w-full bg-surface-container text-on-surface font-label-md text-[14px] py-3 rounded-lg border border-outline-variant flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors">
              <Wand2 className="w-5 h-5" />
              Generate Flashcards
            </button>
          </div>
        </section>

        {/* Learning Velocity */}
        <section className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-secondary w-6 h-6" />
              <h3 className="font-headline-md text-[18px] text-on-surface">Learning Velocity</h3>
            </div>
            <span className="font-code-sm text-[13px] text-on-surface-variant">Last 7 Days</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-bright border border-outline-variant rounded-lg p-4 flex flex-col">
              <span className="font-label-md text-[14px] text-on-surface-variant mb-1">Flashcards Mastered</span>
              <span className="font-display-lg text-[48px] text-primary">248</span>
              <span className="font-code-sm text-[12px] text-secondary-container mt-1">+12% vs last week</span>
            </div>
            <div className="bg-surface-bright border border-outline-variant rounded-lg p-4 flex flex-col">
              <span className="font-label-md text-[14px] text-on-surface-variant mb-1">Quizzes Completed</span>
              <span className="font-display-lg text-[48px] text-on-surface">14</span>
              <span className="font-code-sm text-[12px] text-outline mt-1">Avg Score: 92%</span>
            </div>
            <div className="bg-surface-bright border border-outline-variant rounded-lg p-4 flex flex-col">
              <span className="font-label-md text-[14px] text-on-surface-variant mb-1">Videos Processed</span>
              <span className="font-display-lg text-[48px] text-on-surface">5</span>
              <span className="font-code-sm text-[12px] text-outline mt-1">12h 30m total duration</span>
            </div>
          </div>
        </section>

        {/* AI Insights / Graph */}
        <section className="md:col-span-8 bg-surface-container-lowest border border-primary-container/30 rounded-xl p-0 overflow-hidden flex flex-col shadow-sm relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <div className="p-6 border-b border-outline-variant/50 relative z-10 bg-surface-container-lowest/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Brain className="text-primary w-6 h-6 fill-current opacity-20" strokeWidth={2.5} />
              <h3 className="font-headline-md text-[18px] text-on-surface">Extracted Concepts Network</h3>
            </div>
            <p className="font-body-md text-[14px] text-on-surface-variant mt-1">Key nodes synthesized from recent Stanford CS224N lectures.</p>
          </div>
          
          <div className="flex-1 bg-surface relative min-h-[300px] flex items-center justify-center p-6">
            {/* Simulated Nodes */}
            <div className="absolute top-[20%] left-[25%] bg-surface-container-lowest border border-outline-variant px-3 py-1.5 rounded-full shadow-sm font-code-sm text-[13px] text-on-surface z-10 cursor-pointer hover:border-primary transition-colors">Transformer Models</div>
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-primary-container px-4 py-2 rounded-full shadow-sm font-label-md text-[14px] text-on-primary-container z-10 cursor-pointer border-2 border-primary">Attention Mechanisms</div>
            <div className="absolute bottom-[25%] right-[25%] bg-surface-container-lowest border border-outline-variant px-3 py-1.5 rounded-full shadow-sm font-code-sm text-[13px] text-on-surface z-10 cursor-pointer hover:border-primary transition-colors">Self-Attention</div>
            <div className="absolute top-[33%] right-[33%] bg-surface-container-lowest border border-outline-variant px-3 py-1.5 rounded-full shadow-sm font-code-sm text-[13px] text-on-surface z-10 cursor-pointer hover:border-primary transition-colors">Positional Encoding</div>
            
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-outline-variant/50" preserveAspectRatio="none">
              <line x1="35%" y1="25%" x2="50%" y2="50%" strokeWidth="1.5" strokeDasharray="4" />
              <line x1="50%" y1="50%" x2="65%" y2="70%" strokeWidth="1.5" />
              <line x1="50%" y1="50%" x2="62%" y2="38%" strokeWidth="1.5" />
            </svg>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col h-[400px]">
          <div className="flex items-center gap-2 mb-6">
            <History className="text-tertiary w-6 h-6" />
            <h3 className="font-headline-md text-[18px] text-on-surface">Recent Intake</h3>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            
            {/* Item 1 */}
            <div className="flex gap-3 items-start group cursor-pointer">
              <div className="w-16 h-12 bg-surface-container-high rounded flex-shrink-0 relative overflow-hidden border border-outline-variant group-hover:border-primary transition-colors">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF41_KnLmq8PEJwpJny0Qf4ssBVTgTTVqHlhcVtm1HgI891-PfcrhGJirsbgPpWFHUB3-wlSrr6FixNr7AhA0eCoEhZRE98lY3F1bVtUcZBENBARCqWLvGLkndyrVnT-pLtu2cz-O2vYXKOSf08VGdrzooyMmUjKSyki5atDK1gdrRzG0hKoiLiuJ-RwU41F8umKtwwPL8vYiPITHzIZBvKTYjXdxJFUZMLY3xbDawqQFKyr1OweukTDToSN5pQtRXTCFPDjb5koOi" alt="Thumb" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="text-white w-4 h-4 fill-current" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-[14px] text-on-surface line-clamp-1 group-hover:text-primary transition-colors">CS224N: Lecture 8 - Attention</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-primary/10 text-primary font-code-sm text-[10px] px-1.5 py-0.5 rounded border border-primary/20">Processed</span>
                  <span className="font-code-sm text-[11px] text-on-surface-variant">2 hrs ago</span>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-3 items-start group cursor-pointer">
              <div className="w-16 h-12 bg-surface-container-high rounded flex-shrink-0 relative overflow-hidden border border-outline-variant group-hover:border-primary transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wand2 className="text-outline w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-[14px] text-on-surface line-clamp-1 group-hover:text-primary transition-colors">Stanford NLP Flashcard Set</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-secondary/10 text-secondary font-code-sm text-[10px] px-1.5 py-0.5 rounded border border-secondary/20">Generated</span>
                  <span className="font-code-sm text-[11px] text-on-surface-variant">Yesterday</span>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-3 items-start group cursor-pointer">
              <div className="w-16 h-12 bg-surface-container-high rounded flex-shrink-0 relative overflow-hidden border border-outline-variant group-hover:border-primary transition-colors">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKipaEf2lcqBetVrI02DMcQzTWQgga6WBHY_zc917ex5uPyf-PvB82EJadNZ2iCGc4Rg62abh-8jyPSr9Z3t95RDaSyzAjFaYJ8FkOTqpweXYgffp7QVWVnBnxcywxFNb0dZEFHaI_FY0Tg7xsisA3cYYWSFAmLtoR8_GScUcE7EE85SwYA3cxhXDiZTypjP4bjgo1sKN1w7tK7KtBYC6-1OmUU5Nro4LnOdYznEh8CJNFs_40-2CNKi4Fo6nDzwU_wm1aGADvOmue" alt="Thumb" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="text-white w-4 h-4 fill-current" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-[14px] text-on-surface line-clamp-1 group-hover:text-primary transition-colors">Intro to MLOps - Part 1</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-primary/10 text-primary font-code-sm text-[10px] px-1.5 py-0.5 rounded border border-primary/20">Processed</span>
                  <span className="font-code-sm text-[11px] text-on-surface-variant">Oct 12</span>
                </div>
              </div>
            </div>

          </div>
          
          <Link href="/library" className="w-full mt-4 font-label-md text-[14px] text-primary hover:text-surface-tint flex items-center justify-center py-2 border-t border-outline-variant/30">
            View All History
          </Link>
        </section>

      </div>
    </div>
  );
}
