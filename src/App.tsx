import { useState } from 'react';
import { INITIAL_SOLAR_SYSTEM, SolarSystemState } from './types';
import SolarSystemCanvas from './components/SolarSystemCanvas';
import AIAssistant from './components/AIAssistant';
import ManualControls from './components/ManualControls';
import { Rocket, Globe, Sparkles, Info } from 'lucide-react';

export default function App() {
  const [solarSystem, setSolarSystem] = useState<SolarSystemState>(INITIAL_SOLAR_SYSTEM);

  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Solar editer
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
            <Globe className="w-3 h-3" />
            <span>Simulation Active</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>AI Core Ready</span>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Preview and AI Assistant */}
        <div className="lg:col-span-8 space-y-8">
          {/* 4K Preview Section */}
          <section className="aspect-video relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <SolarSystemCanvas bodies={solarSystem.bodies} />
          </section>

          {/* AI Assistant Section */}
          <section>
            <AIAssistant 
              currentState={solarSystem} 
              onUpdate={setSolarSystem} 
            />
          </section>
        </div>

        {/* Right Column: Manual Controls and Info */}
        <div className="lg:col-span-4 space-y-8">
          <section className="h-[calc(100vh-200px)] sticky top-24">
            <ManualControls 
              state={solarSystem} 
              onUpdate={setSolarSystem} 
            />
          </section>

          <section className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
            <p className="text-xs text-blue-200/60 leading-relaxed">
              Welcome to the Architect's console. Use the AI Assistant to perform complex cosmic modifications or manually fine-tune individual celestial bodies.
            </p>
          </section>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-8 bg-black/40 border-t border-white/5 backdrop-blur-md flex items-center px-8 justify-between z-50">
        <div className="flex gap-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
          <span>Bodies: {solarSystem.bodies.length}</span>
          <span>Resolution: 3840x2160 (Virtual)</span>
          <span>Engine: Canvas2D High-Fidelity</span>
        </div>
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
          v1.0.4-stable
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
