import { useState } from 'react';
import { CelestialBody, SolarSystemState } from '../types';
import { Settings2, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ManualControlsProps {
  state: SolarSystemState;
  onUpdate: (newState: SolarSystemState) => void;
}

export default function ManualControls({ state, onUpdate }: ManualControlsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateBody = (id: string, updates: Partial<CelestialBody>) => {
    const newBodies = state.bodies.map(b => b.id === id ? { ...b, ...updates } : b);
    onUpdate({ ...state, bodies: newBodies });
  };

  const deleteBody = (id: string) => {
    const newBodies = state.bodies.filter(b => b.id !== id);
    onUpdate({ ...state, bodies: newBodies });
  };

  const addBody = () => {
    const newId = `body-${Date.now()}`;
    const newBody: CelestialBody = {
      id: newId,
      name: 'New Body',
      type: 'planet',
      distance: 100 + Math.random() * 300,
      size: 5 + Math.random() * 10,
      color: '#ffffff',
      orbitSpeed: 0.01,
      angle: Math.random() * Math.PI * 2
    };
    onUpdate({ ...state, bodies: [...state.bodies, newBody] });
    setEditingId(newId);
  };

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Celestial Architect</h2>
        </div>
        <button
          onClick={addBody}
          className="p-2 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-600/30 transition-all"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {state.bodies.map((body) => (
          <div key={body.id} className="group">
            <div
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                editingId === body.id 
                  ? 'bg-blue-600/10 border-blue-500/50' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setEditingId(editingId === body.id ? null : body.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full shadow-lg" 
                    style={{ backgroundColor: body.color, boxShadow: `0 0 8px ${body.color}` }} 
                  />
                  <span className="text-sm font-medium text-white/90">{body.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-white/30 font-mono">{body.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteBody(body.id); }}
                    className="p-1.5 rounded-md text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {editingId === body.id ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {editingId === body.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 mt-1 bg-black/20 border-x border-b border-white/10 rounded-b-lg space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Name</label>
                        <input
                          type="text"
                          value={body.name}
                          onChange={(e) => updateBody(body.id, { name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Color</label>
                        <input
                          type="color"
                          value={body.color}
                          onChange={(e) => updateBody(body.id, { color: e.target.value })}
                          className="w-full h-8 bg-white/5 border border-white/10 rounded cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Distance</label>
                        <span className="text-[10px] text-white/60 font-mono">{body.distance.toFixed(0)} AU</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="600"
                        value={body.distance}
                        onChange={(e) => updateBody(body.id, { distance: Number(e.target.value) })}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Size</label>
                        <span className="text-[10px] text-white/60 font-mono">{body.size.toFixed(1)} km</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        step="0.1"
                        value={body.size}
                        onChange={(e) => updateBody(body.id, { size: Number(e.target.value) })}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Orbit Speed</label>
                        <span className="text-[10px] text-white/60 font-mono">{body.orbitSpeed.toFixed(4)} rad/f</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="0.1"
                        step="0.0001"
                        value={body.orbitSpeed}
                        onChange={(e) => updateBody(body.id, { orbitSpeed: Number(e.target.value) })}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
