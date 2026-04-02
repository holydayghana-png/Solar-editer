import { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { CelestialBody, SolarSystemState } from '../types';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIAssistantProps {
  currentState: SolarSystemState;
  onUpdate: (newState: SolarSystemState) => void;
}

export default function AIAssistant({ currentState, onUpdate }: AIAssistantProps) {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');

  const handleAIAction = async () => {
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    setStatus('Analyzing cosmic request...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Current Solar System State: ${JSON.stringify(currentState)}
        User Request: ${input}
        
        Modify the solar system based on the request. You can add, remove, or modify celestial bodies.
        Return the ENTIRE new state as a JSON object.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bodies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    type: { type: Type.STRING, enum: ['star', 'planet', 'moon', 'dwarf-planet', 'asteroid'] },
                    parentId: { type: Type.STRING },
                    description: { type: Type.STRING },
                    distance: { type: Type.NUMBER },
                    size: { type: Type.NUMBER },
                    angle: { type: Type.NUMBER },
                    tilt: { type: Type.NUMBER },
                    mass: { type: Type.NUMBER },
                    gravity: { type: Type.NUMBER },
                    temperature: { type: Type.NUMBER },
                    density: { type: Type.NUMBER },
                    escapeVelocity: { type: Type.NUMBER },
                    albedo: { type: Type.NUMBER },
                    surfacePressure: { type: Type.NUMBER },
                    age: { type: Type.NUMBER },
                    magneticFieldStrength: { type: Type.NUMBER },
                    coreTemperature: { type: Type.NUMBER },
                    habitabilityIndex: { type: Type.NUMBER },
                    resourceRichness: { type: Type.NUMBER },
                    orbitSpeed: { type: Type.NUMBER },
                    eccentricity: { type: Type.NUMBER },
                    inclination: { type: Type.NUMBER },
                    orbitDirection: { type: Type.NUMBER },
                    perihelion: { type: Type.NUMBER },
                    aphelion: { type: Type.NUMBER },
                    orbitalPeriod: { type: Type.NUMBER },
                    meanAnomaly: { type: Type.NUMBER },
                    argumentOfPeriapsis: { type: Type.NUMBER },
                    longitudeOfAscendingNode: { type: Type.NUMBER },
                    rotationSpeed: { type: Type.NUMBER },
                    rotationDirection: { type: Type.NUMBER },
                    dayLength: { type: Type.NUMBER },
                    axialPrecession: { type: Type.NUMBER },
                    color: { type: Type.STRING },
                    roughness: { type: Type.NUMBER },
                    metalness: { type: Type.NUMBER },
                    opacity: { type: Type.NUMBER },
                    wireframe: { type: Type.BOOLEAN },
                    flatShading: { type: Type.BOOLEAN },
                    visible: { type: Type.BOOLEAN },
                    emissive: { type: Type.BOOLEAN },
                    emissiveColor: { type: Type.STRING },
                    emissiveIntensity: { type: Type.NUMBER },
                    atmosphere: { type: Type.BOOLEAN },
                    atmosphereColor: { type: Type.STRING },
                    atmosphereOpacity: { type: Type.NUMBER },
                    atmosphereScale: { type: Type.NUMBER },
                    atmosphereRimPower: { type: Type.NUMBER },
                    atmosphereDensity: { type: Type.NUMBER },
                    atmosphereScattering: { type: Type.NUMBER },
                    atmosphereHeight: { type: Type.NUMBER },
                    rings: { type: Type.BOOLEAN },
                    ringColor: { type: Type.STRING },
                    ringInnerRadius: { type: Type.NUMBER },
                    ringOuterRadius: { type: Type.NUMBER },
                    ringOpacity: { type: Type.NUMBER },
                    ringTiltX: { type: Type.NUMBER },
                    ringTiltZ: { type: Type.NUMBER },
                    ringSegments: { type: Type.NUMBER },
                    ringThickness: { type: Type.NUMBER },
                    bumpScale: { type: Type.NUMBER },
                    specularColor: { type: Type.STRING },
                    shininess: { type: Type.NUMBER },
                    compositionRock: { type: Type.NUMBER },
                    compositionIce: { type: Type.NUMBER },
                    compositionGas: { type: Type.NUMBER },
                    craterDensity: { type: Type.NUMBER },
                    craterSize: { type: Type.NUMBER },
                    volcanicActivity: { type: Type.NUMBER },
                    tectonicActivity: { type: Type.NUMBER },
                    oceanCover: { type: Type.NUMBER },
                    oceanColor: { type: Type.STRING },
                    cloudCover: { type: Type.NUMBER },
                    cloudColor: { type: Type.STRING },
                    cloudHeight: { type: Type.NUMBER },
                    cloudOpacity: { type: Type.NUMBER },
                    cloudSpeed: { type: Type.NUMBER },
                    luminosity: { type: Type.NUMBER },
                    stellarClass: { type: Type.STRING },
                    coronaIntensity: { type: Type.NUMBER },
                    solarWindSpeed: { type: Type.NUMBER },
                    sunspotActivity: { type: Type.NUMBER },
                    flareFrequency: { type: Type.NUMBER },
                    showLabel: { type: Type.BOOLEAN },
                    labelColor: { type: Type.STRING },
                    labelSize: { type: Type.NUMBER },
                    labelOffset: { type: Type.NUMBER },
                    showOrbit: { type: Type.BOOLEAN },
                    orbitColor: { type: Type.STRING },
                    orbitWidth: { type: Type.NUMBER },
                    orbitOpacity: { type: Type.NUMBER },
                    castShadows: { type: Type.BOOLEAN },
                    receiveShadows: { type: Type.BOOLEAN },
                    civilizationLevel: { type: Type.NUMBER },
                    lifeProbability: { type: Type.NUMBER },
                    vegetationCover: { type: Type.NUMBER },
                    vegetationColor: { type: Type.STRING },
                    iceCover: { type: Type.NUMBER },
                    iceColor: { type: Type.STRING }
                  },
                  required: ['id', 'name', 'type', 'distance', 'size', 'color', 'orbitSpeed', 'rotationSpeed', 'tilt', 'angle']
                }
              }
            },
            required: ['bodies']
          }
        }
      });

      const newState = JSON.parse(response.text) as SolarSystemState;

      // Artificial 3-second delay as requested
      const steps = [
        'Calculating orbital mechanics...',
        'Simulating gravitational pull...',
        'Rendering celestial textures...',
        'Stabilizing planetary orbits...',
        'Finalizing cosmic alignment...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setStatus(steps[i]);
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      onUpdate(newState);
      setInput('');
      setStatus('');
    } catch (error) {
      console.error('AI Error:', error);
      setStatus('Cosmic interference detected. Please try again.');
      setTimeout(() => setStatus(''), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold text-white">AI Cosmic Assistant</h2>
      </div>

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 'Make all planets twice as large', 'Add a second sun', 'Turn the Earth into a red giant'..."
          className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none h-24 transition-all"
          disabled={isProcessing}
        />
        
        <button
          onClick={handleAIAction}
          disabled={isProcessing || !input.trim()}
          className={`absolute bottom-3 right-3 p-2 rounded-md transition-all ${
            isProcessing || !input.trim() 
              ? 'bg-white/5 text-white/20 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
          }`}
        >
          {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 flex items-center gap-3 text-sm text-purple-300/80 font-mono"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            {status}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap gap-2">
        {['Double size', 'Add asteroid belt', 'Reverse orbits', 'Make it neon'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setInput(suggestion)}
            disabled={isProcessing}
            className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 border border-white/10 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
