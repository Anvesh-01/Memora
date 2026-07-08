import Image from 'next/image';
import { Camera, Plus, Database, Cpu, Eye, Trash2 } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-6 md:p-10 flex-1 max-w-4xl mx-auto w-full pb-20">
      
      <div className="md:hidden flex items-center gap-4 mb-8">
        <h1 className="font-headline-md text-[24px] text-primary font-bold">Settings</h1>
      </div>

      <div className="space-y-8">
        
        {/* Profile Section */}
        <section className="bg-surface-container-lowest rounded-lg border border-outline-variant p-6">
          <div className="border-b border-outline-variant pb-4 mb-6">
            <h2 className="font-headline-md text-[24px] text-on-surface">Profile</h2>
            <p className="font-body-md text-[16px] text-on-surface-variant mt-1">Manage your account identity and personal details.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="w-32 h-32 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant relative group">
                 <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9FTzQ7BQFguruayJEg5HOWAvlzubREnAdXkeXy6z0R7rYn9fJBB9GJHYTDpUSP9dFgTjLRye-oTO5EJGAO8sjBEp2b6Qcp6ICntvelKT1yravIKsKxI0B7PIj_B1gDRKztkOfHHxh2TeKV2uW-FCa9ZYOTLSDA6sOl9ur6w-Rd9pGYrW17pg6ZpIZeqZPES0sxSXPz_yXvi6n0vOIuXQ3bsKsaAguV0ZyGmA7Vx9UwocIacPuDu_IlIHG0l74pi3bWgDD0xbmY5FI" alt="Avatar" fill className="object-cover" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-on-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-8 h-8 text-on-tertiary" />
                 </div>
              </div>
              <button className="font-label-md text-[14px] text-primary hover:text-primary-container transition-colors">Change Avatar</button>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-[14px] text-on-surface mb-2">First Name</label>
                  <input type="text" defaultValue="Dr. Eleanor" className="w-full bg-surface border border-outline-variant rounded p-3 font-body-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"/>
                </div>
                <div>
                  <label className="block font-label-md text-[14px] text-on-surface mb-2">Last Name</label>
                  <input type="text" defaultValue="Vance" className="w-full bg-surface border border-outline-variant rounded p-3 font-body-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"/>
                </div>
              </div>
              <div>
                <label className="block font-label-md text-[14px] text-on-surface mb-2">Email Address</label>
                <input type="email" disabled defaultValue="e.vance@research.edu" className="w-full bg-surface-container-low border border-outline-variant rounded p-3 font-body-md text-[16px] text-on-surface-variant cursor-not-allowed"/>
                <p className="font-code-sm text-[13px] text-outline mt-2">Contact support to change your institutional email address.</p>
              </div>
              <div className="pt-4 flex justify-end">
                <button className="bg-primary text-on-primary font-label-md text-[14px] px-6 py-2.5 rounded hover:bg-primary-container transition-colors shadow-sm">Save Changes</button>
              </div>
            </div>
          </div>
        </section>

        {/* API Configs */}
        <section className="bg-surface-container-lowest rounded-lg border border-outline-variant p-6">
          <div className="border-b border-outline-variant pb-4 mb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <h2 className="font-headline-md text-[24px] text-on-surface">API Configurations</h2>
              <p className="font-body-md text-[16px] text-on-surface-variant mt-1">Connect external vector stores and language models.</p>
            </div>
            <button className="bg-surface-container text-on-surface font-label-md text-[14px] px-4 py-2 rounded border border-outline-variant hover:bg-surface-container-highest transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4"/> New Connection
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Qdrant */}
            <div className="p-4 border border-outline-variant rounded bg-surface flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group hover:border-primary transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-on-primary-container" />
                </div>
                <div>
                  <h3 className="font-label-md text-[14px] text-on-surface font-semibold">Qdrant Cloud</h3>
                  <p className="font-code-sm text-[13px] text-on-surface-variant">Primary Vector Store · Connected 2d ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input type="password" readOnly defaultValue="************************" className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 pl-3 pr-10 font-code-sm text-[13px] text-on-surface-variant outline-none"/>
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1">
                    <Eye className="w-4 h-4"/>
                  </button>
                </div>
                <button className="text-error hover:bg-error-container p-2 rounded transition-colors" title="Revoke Access">
                  <Trash2 className="w-5 h-5"/>
                </button>
              </div>
            </div>

            {/* OpenAI */}
            <div className="p-4 border border-outline-variant rounded bg-surface flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group hover:border-primary transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-tertiary-container flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-on-tertiary-container" />
                </div>
                <div>
                  <h3 className="font-label-md text-[14px] text-on-surface font-semibold">OpenAI API</h3>
                  <p className="font-code-sm text-[13px] text-on-surface-variant">Inference & Embedding · Connected 1mo ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input type="password" readOnly defaultValue="************************" className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 pl-3 pr-10 font-code-sm text-[13px] text-on-surface-variant outline-none"/>
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1">
                    <Eye className="w-4 h-4"/>
                  </button>
                </div>
                <button className="text-error hover:bg-error-container p-2 rounded transition-colors" title="Revoke Access">
                  <Trash2 className="w-5 h-5"/>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Processing Preferences */}
        <section className="bg-surface-container-lowest rounded-lg border border-outline-variant p-6">
          <div className="border-b border-outline-variant pb-4 mb-6">
            <h2 className="font-headline-md text-[24px] text-on-surface">Transcription & Processing</h2>
            <p className="font-body-md text-[16px] text-on-surface-variant mt-1">Configure default models for knowledge extraction.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block font-label-md text-[14px] text-on-surface mb-2">Default Transcription Model</label>
                <select className="w-full bg-surface border border-outline-variant rounded p-3 font-body-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                  <option>Whisper large-v3 (Accurate)</option>
                  <option>Whisper base.en (Fast)</option>
                  <option>Deepgram Nova-2</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-[14px] text-on-surface mb-2">Primary Language</label>
                <select className="w-full bg-surface border border-outline-variant rounded p-3 font-body-md text-[16px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="block font-label-md text-[14px] text-on-surface mb-2">Automatic Extraction Jobs</label>
              <label className="flex items-start gap-3 p-3 border border-outline-variant rounded bg-surface hover:bg-surface-container-low cursor-pointer transition-colors">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-primary bg-surface-container-lowest border-outline-variant rounded focus:ring-primary focus:ring-2" />
                <div>
                  <span className="block font-label-md text-[14px] text-on-surface">Generate Flashcards</span>
                  <span className="block font-code-sm text-[13px] text-on-surface-variant mt-0.5">Automatically create Anki-style cards post-transcription.</span>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 border border-outline-variant rounded bg-surface hover:bg-surface-container-low cursor-pointer transition-colors">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-primary bg-surface-container-lowest border-outline-variant rounded focus:ring-primary focus:ring-2" />
                <div>
                  <span className="block font-label-md text-[14px] text-on-surface">Build Knowledge Graph</span>
                  <span className="block font-code-sm text-[13px] text-on-surface-variant mt-0.5">Extract entities and relationships automatically.</span>
                </div>
              </label>
            </div>
          </div>
          
          <div className="pt-6 flex justify-end">
            <button className="bg-surface-container text-on-surface font-label-md text-[14px] px-6 py-2.5 rounded border border-outline-variant hover:bg-surface-container-highest transition-colors">Apply Preferences</button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-error-container/20 rounded-lg border border-error/30 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="font-headline-md text-[24px] text-error">Danger Zone</h2>
              <p className="font-body-md text-[16px] text-on-surface-variant mt-1">Irreversible actions regarding your data and account.</p>
            </div>
            <button className="bg-error text-on-error font-label-md text-[14px] px-6 py-2.5 rounded hover:bg-on-error-container transition-colors shadow-sm">Delete Account & Data</button>
          </div>
        </section>

      </div>
    </div>
  );
}
