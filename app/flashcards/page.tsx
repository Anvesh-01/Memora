import { Plus, Play, Filter, Edit2, Smile, Meh, Frown } from 'lucide-react';

export default function Flashcards() {
  return (
    <div className="p-6 md:p-10 flex-1 max-w-[1440px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-headline-lg text-[32px] text-on-surface mb-2">Flashcards Management</h2>
          <p className="font-body-md text-[16px] text-on-surface-variant">Review and edit AI-generated flashcards from your knowledge base.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-[14px] flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Deck
          </button>
          <button className="px-6 py-2 bg-primary-container text-on-primary-container rounded-lg hover:bg-primary hover:text-on-primary transition-colors font-label-md text-[14px] shadow-sm flex items-center gap-2">
            <Play className="w-4 h-4 fill-current" />
            Study Now
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <select className="bg-surface-container border border-outline-variant rounded-lg px-4 py-2 font-body-md text-[16px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary outline-none cursor-pointer">
          <option>All Collections</option>
          <option>Neural Networks Intro</option>
          <option>Advanced NLP Seminars</option>
        </select>
        <select className="bg-surface-container border border-outline-variant rounded-lg px-4 py-2 font-body-md text-[16px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary outline-none cursor-pointer">
          <option>All Tags</option>
          <option>Definition</option>
          <option>Equation</option>
          <option>Concept</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 text-primary font-label-md text-[14px] hover:bg-surface-container-low rounded-lg transition-colors">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Flashcard 1 */}
        <div className="relative h-64 bg-transparent group perspective-1000">
          <div className="relative w-full h-full text-center rounded-xl shadow-sm border border-outline-variant transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
            {/* Front */}
            <div className="absolute w-full h-full bg-surface-container-lowest rounded-xl flex flex-col justify-between p-6 backface-hidden">
              <div className="flex justify-between items-start w-full">
                <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded text-xs font-label-md">Concept</span>
                <button className="text-outline hover:text-primary transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <h3 className="font-headline-md text-[24px] text-on-surface">What is the primary function of an activation function in a neural network?</h3>
              </div>
              <div className="w-full text-left">
                <p className="font-code-sm text-[13px] text-outline">Source: Lec_04_NeuralNets.mp4</p>
              </div>
            </div>
            
            {/* Back */}
            <div className="absolute w-full h-full bg-surface-container-low rounded-xl flex flex-col justify-center items-center p-6 border border-primary/20 bg-gradient-to-br from-surface-container-low to-secondary-fixed/10 backface-hidden rotate-y-180">
              <p className="font-body-md text-[16px] text-on-surface">To introduce non-linearity into the output of a neuron, allowing the network to learn complex patterns.</p>
              <div className="mt-4 flex gap-2">
                <button className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center hover:bg-error hover:text-on-error transition-colors"><Frown className="w-4 h-4"/></button>
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:bg-outline-variant transition-colors"><Meh className="w-4 h-4"/></button>
                <button className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"><Smile className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
        </div>

        {/* Flashcard 2 */}
        <div className="relative h-64 bg-transparent group perspective-1000">
          <div className="relative w-full h-full text-center rounded-xl shadow-sm border border-outline-variant transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
            {/* Front */}
            <div className="absolute w-full h-full bg-surface-container-lowest rounded-xl flex flex-col justify-between p-6 backface-hidden">
              <div className="flex justify-between items-start w-full">
                <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded text-xs font-label-md">Equation</span>
                <button className="text-outline hover:text-primary transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <h3 className="font-headline-md text-[24px] text-on-surface">State the formula for Softmax activation.</h3>
              </div>
              <div className="w-full text-left">
                <p className="font-code-sm text-[13px] text-outline">Source: Math_Foundations.mp4</p>
              </div>
            </div>
            
            {/* Back */}
            <div className="absolute w-full h-full bg-surface-container-low rounded-xl flex flex-col justify-center items-center p-6 border border-primary/20 bg-gradient-to-br from-surface-container-low to-secondary-fixed/10 backface-hidden rotate-y-180">
              <p className="font-code-sm text-[16px] text-on-surface font-bold bg-surface p-2 rounded border border-outline-variant">σ(z)_i = e^(z_i) / Σ e^(z_j)</p>
              <div className="mt-4 flex gap-2">
                <button className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center hover:bg-error hover:text-on-error transition-colors"><Frown className="w-4 h-4"/></button>
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:bg-outline-variant transition-colors"><Meh className="w-4 h-4"/></button>
                <button className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"><Smile className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
        </div>

        {/* Flashcard 3 */}
        <div className="relative h-64 bg-transparent group perspective-1000">
          <div className="relative w-full h-full text-center rounded-xl shadow-sm border border-outline-variant transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
            {/* Front */}
            <div className="absolute w-full h-full bg-surface-container-lowest rounded-xl flex flex-col justify-between p-6 backface-hidden">
              <div className="flex justify-between items-start w-full">
                <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-1 rounded text-xs font-label-md">Definition</span>
                <button className="text-outline hover:text-primary transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <h3 className="font-headline-md text-[24px] text-on-surface">Define &apos;Overfitting&apos; in machine learning.</h3>
              </div>
              <div className="w-full text-left">
                <p className="font-code-sm text-[13px] text-outline">Source: ML_Basics_Q1.mp4</p>
              </div>
            </div>
            
            {/* Back */}
            <div className="absolute w-full h-full bg-surface-container-low rounded-xl flex flex-col justify-center items-center p-6 border border-primary/20 bg-gradient-to-br from-surface-container-low to-secondary-fixed/10 backface-hidden rotate-y-180">
              <p className="font-body-md text-[16px] text-on-surface">When a model learns the detail and noise in the training data to the extent that it negatively impacts the performance of the model on new data.</p>
              <div className="mt-4 flex gap-2">
                <button className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center hover:bg-error hover:text-on-error transition-colors"><Frown className="w-4 h-4"/></button>
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:bg-outline-variant transition-colors"><Meh className="w-4 h-4"/></button>
                <button className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"><Smile className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
