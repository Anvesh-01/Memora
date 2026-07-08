import Image from 'next/image';
import { Plus, PlayCircle, Video, FolderPlus, BrainCircuit } from 'lucide-react';

export default function Collections() {
  return (
    <div className="p-6 md:p-10 flex-1 max-w-[1440px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline-lg text-[32px] text-on-surface mb-1">Collections</h2>
          <p className="font-body-md text-[16px] text-on-surface-variant">Organize and curate your video knowledge base.</p>
        </div>
        <button className="bg-primary-container text-on-primary-container font-label-md text-[14px] px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 shadow-sm border border-transparent">
          <Plus className="w-5 h-5" />
          New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Collection 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:border-primary transition-colors group cursor-pointer flex flex-col h-full">
          <div className="h-32 relative bg-surface-container p-2 flex gap-1 overflow-hidden">
            <div className="w-2/3 h-full rounded border border-outline-variant relative overflow-hidden">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcGBhMfyCFulyi3SUad-YRk5O8dAfq1LjbtY8hvMyFIl1hvPh7qlJUvvugr0_IHazvmLENTzG5EQTLKOylRiggLscQfRP4bDiGn6Qk7S_trbyd5LDe9KUh2t6kex6AYDqR2mDnsCQz26VZJgn6F2QT8ID6FLBDfR8OebWEYg9JduELC924JQNyymFXPJkyWqxXZS-CCDTGhp3YRAtYCSi2OMjbk6wpbjWpwrb3o95YKSkBcNh4A5NTJsXVkYRkFmECawr7tGcAnn5q" alt="Thumb" fill className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" referrerPolicy="no-referrer"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <span className="absolute bottom-1 right-1 text-[10px] text-white bg-black/70 px-1 rounded font-code-sm">1:24:00</span>
            </div>
            <div className="w-1/3 flex flex-col gap-1 h-full">
              <div className="h-1/2 w-full rounded border border-outline-variant relative overflow-hidden bg-surface-container-high">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-3MshwRGq2K-JJVG7dx-R8xY8Duk1s518W33irUJLPs2VO0ckMIxsVtCxmjEfLcLoyyalyjTMrSyb1xyF1rtENOmeYlqm3Nl4eMfaf9xhQPvPpQ5HQN627rAceNG6iBHYAH0TNDH0ekpbaTCSKFVFjdPMNscU0fP_Os-rs_wGllSA53Ixkh4R1h_SfxEJJiHGC1ID94FSoQRoWRIGTgLxAaybvjoWsCQF8CJ5GvcWEjj7yRpI0j-zevHqt5Jh6rSbge19ypTFS109" alt="Thumb" fill className="object-cover grayscale opacity-70" referrerPolicy="no-referrer"/>
              </div>
              <div className="h-1/2 w-full rounded border border-outline-variant bg-surface-container flex items-center justify-center text-on-surface-variant text-xs font-label-md">
                  +12
              </div>
            </div>
            <div className="absolute inset-0 bg-surface-tint/0 group-hover:bg-surface-tint/5 transition-colors flex items-center justify-center pointer-events-none">
                <PlayCircle className="w-12 h-12 text-transparent group-hover:text-primary transition-colors" />
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-headline-md text-[20px] text-on-surface mb-1 group-hover:text-primary transition-colors">Stanford CS229</h3>
            <p className="font-code-sm text-[13px] text-on-surface-variant mb-4 line-clamp-2">Machine Learning complete course lectures, transcriptions, and extracted formula flashcards.</p>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-outline-variant/50">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <Video className="w-4 h-4" />
                <span className="font-label-md text-[12px]">14 Videos</span>
              </div>
              <div className="font-code-sm text-[11px] text-outline">Updated 2h ago</div>
            </div>
          </div>
        </div>

        {/* Collection 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:border-primary transition-colors group cursor-pointer flex flex-col h-full">
          <div className="h-32 relative bg-surface-container p-2 flex gap-1 overflow-hidden">
            <div className="w-full h-full rounded border border-outline-variant relative overflow-hidden">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZtFrYDEhds9AjMniR3Qcv0Wvd60vSfjsC_f3yxDulcWMdlsSHrC27kACNOSUQjjSV1PEnP0lG80uwiF7LelNN-WEBfTrSLFsIkgoZ9QXqsTmJrVEf6LeHiAONLczkIFI4lC9UNn6UWCS7jNAWH8WJJqdSRwnd4ZC4_SIBB3u1KPg2L_Hhla7pwEOjOXiFibZ-RJz4JHNNe6XuQTg4NDMKe-fApA1k8cfF50qvnNqPdr6yzmvo9MHD4ielDqLF68MxisVVooSYbQxv" alt="Thumb" fill className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" referrerPolicy="no-referrer"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-2 right-2 bg-surface-container-highest/80 backdrop-blur-sm rounded px-2 py-0.5 border border-outline-variant/50">
                <span className="font-label-md text-[10px] text-on-surface">Confidential</span>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-headline-md text-[20px] text-on-surface mb-1 group-hover:text-primary transition-colors">Quarterly Earnings Q3</h3>
            <p className="font-code-sm text-[13px] text-on-surface-variant mb-4 line-clamp-2">Executive summaries, Q&A sessions, and AI-extracted key performance indicators.</p>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-outline-variant/50">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <Video className="w-4 h-4" />
                <span className="font-label-md text-[12px]">4 Videos</span>
              </div>
              <div className="font-code-sm text-[11px] text-outline">Updated Yesterday</div>
            </div>
          </div>
        </div>

        {/* Collection 3 (AI Focus) */}
        <div className="bg-surface-container-lowest border border-primary-fixed rounded-xl overflow-hidden hover:border-primary transition-colors group cursor-pointer flex flex-col h-full relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary-fixed z-10"></div>
          <div className="h-32 relative bg-surface-container p-2 flex gap-1 overflow-hidden mt-1">
            <div className="w-1/2 h-full rounded border border-outline-variant relative overflow-hidden">
               <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY939F5P33jj-D8NUa5LspVfPrU_m2m3XKL-r0-j2SMaioPDKjcUzbeGP3xOLk9yHuLeOu4-Br7glu2DgzpoU_eO2tD32vWkoZkn0KFvgMk06gGT4OMKUKY7RcQdJ35UnJK1bKagTpB0qGL5O0T1hqw9Ty0n7YRwYugVuMaAcc4Qojl_of18idjiOvMGEX7s1IDEmxq0WMC0Df8bW5_JvC1zPaFHqI2jMRX6vkjlXJyMOYCVWNFxM4cXlY7YtWkGp3OsTm0jV_pxpy" alt="Thumb" fill className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" referrerPolicy="no-referrer"/>
            </div>
            <div className="w-1/2 h-full rounded border border-primary-fixed/50 bg-primary-fixed/10 relative overflow-hidden flex items-center justify-center flex-col">
                <BrainCircuit className="text-primary mb-1 w-6 h-6" />
                <span className="font-code-sm text-[10px] text-primary text-center leading-tight">AI Insights<br/>Generated</span>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-headline-md text-[20px] text-on-surface mb-1 group-hover:text-primary transition-colors">Literature Review 2024</h3>
              <span className="bg-primary-fixed text-on-primary-fixed px-1.5 py-0.5 rounded text-[10px] font-label-md border border-primary-fixed-dim">AI Active</span>
            </div>
            <p className="font-code-sm text-[13px] text-on-surface-variant mb-4 line-clamp-2">Automated summaries and knowledge graph extraction from uploaded conference presentations.</p>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-outline-variant/50">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <Video className="w-4 h-4" />
                <span className="font-label-md text-[12px]">8 Videos</span>
              </div>
              <div className="font-code-sm text-[11px] text-outline">Updated Oct 12</div>
            </div>
          </div>
        </div>

        {/* Empty state */}
        <div className="bg-surface-bright border border-dashed border-outline-variant rounded-xl overflow-hidden hover:border-primary hover:bg-surface-container-lowest transition-all group cursor-pointer flex flex-col h-full items-center justify-center p-6 text-center min-h-[280px]">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-fixed transition-colors">
            <FolderPlus className="w-8 h-8 text-outline group-hover:text-primary transition-colors" />
          </div>
          <h3 className="font-label-md text-[14px] text-on-surface mb-2">Create New Collection</h3>
          <p className="font-code-sm text-[13px] text-on-surface-variant max-w-[200px]">Drag and drop videos here or click to create an empty folder.</p>
        </div>

      </div>
    </div>
  );
}
