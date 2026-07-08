import Image from 'next/image';
import { UploadCloud, Filter, Folder, Calendar, PlayCircle, Clock, RefreshCcw, Cpu, ImageOff, AlertCircle } from 'lucide-react';

export default function Library() {
  return (
    <div className="p-6 md:p-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display-lg text-[48px] leading-tight text-on-background">Library</h2>
          <p className="font-body-lg text-[18px] text-on-surface-variant mt-1">Manage and explore your video knowledge base.</p>
        </div>
        <button className="bg-primary hover:bg-surface-tint text-on-primary font-label-md text-[14px] px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
          <UploadCloud className="w-5 h-5" />
          Upload Video
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-outline-variant/50">
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-md px-3 py-1.5 focus-within:border-primary transition-all">
          <Filter className="w-4 h-4 text-on-surface-variant" />
          <select className="bg-transparent font-label-md text-[14px] text-on-surface border-none p-0 focus:ring-0 cursor-pointer outline-none">
            <option value="">All Statuses</option>
            <option value="ready">Ready</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-md px-3 py-1.5 focus-within:border-primary transition-all">
          <Folder className="w-4 h-4 text-on-surface-variant" />
          <select className="bg-transparent font-label-md text-[14px] text-on-surface border-none p-0 focus:ring-0 cursor-pointer outline-none">
            <option value="">All Collections</option>
            <option value="q1">Q1 Townhalls</option>
            <option value="eng">Engineering Demos</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-md px-3 py-1.5 focus-within:border-primary transition-all">
          <Calendar className="w-4 h-4 text-on-surface-variant" />
          <select className="bg-transparent font-label-md text-[14px] text-on-surface border-none p-0 focus:ring-0 cursor-pointer outline-none">
            <option value="">Date Added</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Video Grid */}
        <div className="xl:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:border-outline hover:shadow-sm transition-all group flex flex-col cursor-pointer h-full">
            <div className="relative h-48 bg-surface-container-highest overflow-hidden">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJpHFS4vOsp2KQ8-i3BcqsyxQ3E33Ai6kgyEXZKk85uWRrlh0wkhAOHzoAhQ-T96uU2WV2LGx0GipMWpLZ86sGC1vyPIHMJz6RTeVJLvXo4ZDx4wpOau8e9pbY9bFVwXAmuLntp7UuK8sJarNkdgGH4bJTH7A3YUzAWnTHd409hBNfe1yERCc1PcZYA4FsaCnHDyyiKYa3Hi1EwzeqN7JcTyeYmT-ctpk0krG1T4TiOCzxUcLCZJT_yb3xW022W1WBUdGeYCqw9ioC" 
                alt="Video thumbnail" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="absolute bottom-3 right-3 bg-inverse-surface/80 text-inverse-on-surface font-code-sm text-[13px] px-2 py-1 rounded backdrop-blur-md">
                45:20
              </div>
              <div className="absolute top-3 left-3 bg-surface-container-lowest/95 text-primary font-label-md text-[14px] px-2.5 py-1 rounded-md shadow-sm border border-outline-variant backdrop-blur-md flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                READY
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 gap-3">
              <h3 className="font-headline-md text-[24px] text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">Advanced Neural Architectures & Transformer Models</h3>
              <p className="font-body-md text-[14px] text-on-surface-variant line-clamp-2 leading-relaxed">Deep dive session on scaling laws and attention mechanisms for next-generation large language models. Includes Q&A.</p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-outline-variant/40">
                <span className="bg-primary-fixed text-on-primary-fixed font-code-sm text-[12px] px-2 py-0.5 rounded-md border border-primary-fixed-dim/50">AI Research</span>
                <span className="bg-surface-container-high text-on-surface-variant font-code-sm text-[12px] px-2 py-0.5 rounded-md border border-outline-variant/60">Transcript</span>
                <span className="bg-surface-container-high text-on-surface-variant font-code-sm text-[12px] px-2 py-0.5 rounded-md border border-outline-variant/60">OCR</span>
              </div>
            </div>
          </div>

          {/* Card 2 Processing */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden group flex flex-col h-full relative">
            <div className="relative h-48 bg-surface-container-highest overflow-hidden">
              <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-tertiary-fixed-dim" />
              </div>
              <div className="absolute bottom-3 right-3 bg-inverse-surface/80 text-inverse-on-surface font-code-sm text-[13px] px-2 py-1 rounded backdrop-blur-md">
                12:05
              </div>
              <div className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container font-label-md text-[14px] px-2.5 py-1 rounded-md shadow-sm border border-secondary-fixed-dim backdrop-blur-md flex items-center gap-1.5">
                <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                PROCESSING
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 gap-3 opacity-70">
              <h3 className="font-headline-md text-[24px] text-on-surface line-clamp-2 leading-tight">Q3 All-Hands Engineering Update</h3>
              <p className="font-body-md text-[14px] text-on-surface-variant line-clamp-2 leading-relaxed">System is currently generating transcript, extracting entities, and building the knowledge graph.</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-outline-variant/40">
                <span className="bg-surface-container-high text-on-surface-variant font-code-sm text-[12px] px-2 py-0.5 rounded-md border border-outline-variant/60">Townhall</span>
              </div>
            </div>
          </div>

          {/* Card 3 Failed */}
          <div className="bg-surface-container-lowest border-l-4 border-l-error border-y border-r border-outline-variant rounded-xl overflow-hidden group flex flex-col h-full">
            <div className="relative h-48 bg-surface-container-highest overflow-hidden">
              <div className="w-full h-full bg-error-container/20 flex flex-col items-center justify-center text-error">
                <ImageOff className="w-12 h-12 mb-2" />
                <span className="font-label-md text-[14px]">Processing Failed</span>
              </div>
              <div className="absolute top-3 left-3 bg-error-container text-on-error-container font-label-md text-[14px] px-2.5 py-1 rounded-md shadow-sm border border-error/20 backdrop-blur-md flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                FAILED
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 gap-3">
              <h3 className="font-headline-md text-[24px] text-on-surface line-clamp-2 leading-tight">Legacy System Audit Recording</h3>
              <p className="font-body-md text-[14px] text-on-surface-variant line-clamp-2 leading-relaxed text-error/80">Audio extraction failed due to unsupported codec. Please re-encode and try again.</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-outline-variant/40">
                <button className="text-primary font-label-md text-[14px] hover:underline">View Logs</button>
                <button className="text-on-surface-variant font-label-md text-[14px] hover:text-error ml-auto">Delete</button>
              </div>
            </div>
          </div>

        </div>

        {/* Processing Engine Sidebar */}
        <div className="xl:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 sticky top-6 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-outline-variant/60 pb-4">
            <Cpu className="w-6 h-6 text-primary" />
            <h3 className="font-headline-md text-[18px] text-on-surface">Processing Engine</h3>
          </div>
          
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <span className="font-label-md text-[14px] text-on-surface flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-secondary animate-spin" /> 
                TRANSCRIPTION
              </span>
              <span className="font-code-sm text-[13px] text-on-surface-variant font-medium">68%</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <p className="font-code-sm text-[12px] text-on-surface-variant truncate">Q3_All_Hands_Eng_Update.mp4</p>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <span className="font-label-md text-[14px] text-on-surface flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-secondary animate-spin" /> 
                ENTITY EXTRACTION
              </span>
              <span className="font-code-sm text-[13px] text-on-surface-variant font-medium">22%</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: '22%' }}></div>
            </div>
            <p className="font-code-sm text-[12px] text-on-surface-variant truncate">Product_Roadmap_2024.mp4</p>
          </div>

          <div className="mt-4 pt-4 border-t border-outline-variant/60 flex items-center justify-between text-on-surface-variant">
            <span className="font-body-md text-[14px]">2 items in queue</span>
            <button className="font-label-md text-[14px] text-primary hover:underline">View All</button>
          </div>
        </div>

      </div>
    </div>
  );
}
