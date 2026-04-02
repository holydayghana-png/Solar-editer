import { useState, useMemo } from 'react';
import { CelestialBody, SolarSystemState } from '../types';
import { 
  Settings2, Plus, ChevronDown, ChevronUp, Moon, Sun, Globe, Star, Orbit, 
  Zap, Wind, Cloud, Waves, Mountain, Thermometer, Box, Eye, Layers, 
  Activity, Cpu, Heart, Database, Shield, Layout, Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ManualControlsProps {
  state: SolarSystemState;
  onUpdate: (newState: SolarSystemState) => void;
}

type Category = 'general' | 'orbit' | 'rotation' | 'visuals' | 'atmosphere' | 'rings' | 'surface' | 'stellar' | 'physics' | 'ui' | 'life';

export default function ManualControls({ state, onUpdate }: ManualControlsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<Category>('general');

  const updateBody = (id: string, updates: Partial<CelestialBody>) => {
    const newBodies = state.bodies.map(b => b.id === id ? { ...b, ...updates } : b);
    onUpdate({ ...state, bodies: newBodies });
  };

  const addBody = () => {
    const newId = `body-${Date.now()}`;
    const newBody: CelestialBody = {
      id: newId,
      name: 'New Body',
      type: 'planet',
      distance: 150,
      size: 5,
      angle: Math.random() * Math.PI * 2,
      tilt: 0,
      mass: 1,
      gravity: 1,
      temperature: 300,
      density: 5,
      escapeVelocity: 11,
      albedo: 0.3,
      surfacePressure: 1,
      age: 4.5,
      magneticFieldStrength: 1,
      coreTemperature: 6000,
      habitabilityIndex: 0,
      resourceRichness: 0.5,
      orbitSpeed: 0.01,
      eccentricity: 0,
      inclination: 0,
      orbitDirection: 1,
      perihelion: 90,
      aphelion: 110,
      orbitalPeriod: 365,
      meanAnomaly: 0,
      argumentOfPeriapsis: 0,
      longitudeOfAscendingNode: 0,
      rotationSpeed: 0.01,
      rotationDirection: 1,
      dayLength: 24,
      axialPrecession: 0,
      color: '#ffffff',
      roughness: 0.7,
      metalness: 0.3,
      opacity: 1,
      wireframe: false,
      flatShading: false,
      visible: true,
      emissive: false,
      emissiveColor: '#ffffff',
      emissiveIntensity: 1,
      atmosphere: false,
      atmosphereColor: '#ffffff',
      atmosphereOpacity: 0.3,
      atmosphereScale: 1.1,
      atmosphereRimPower: 2,
      atmosphereDensity: 1,
      atmosphereScattering: 1,
      atmosphereHeight: 10,
      rings: false,
      ringColor: '#ffffff',
      ringInnerRadius: 10,
      ringOuterRadius: 15,
      ringOpacity: 0.6,
      ringTiltX: Math.PI / 2,
      ringTiltZ: 0,
      ringSegments: 64,
      ringThickness: 1,
      bumpScale: 0.05,
      specularColor: '#ffffff',
      shininess: 30,
      compositionRock: 50,
      compositionIce: 20,
      compositionGas: 30,
      craterDensity: 0.1,
      craterSize: 1,
      volcanicActivity: 0,
      tectonicActivity: 0,
      oceanCover: 0,
      oceanColor: '#0000ff',
      cloudCover: 0,
      cloudColor: '#ffffff',
      cloudHeight: 1,
      cloudOpacity: 0.5,
      cloudSpeed: 0.01,
      luminosity: 1,
      stellarClass: 'G',
      coronaIntensity: 1,
      solarWindSpeed: 400,
      sunspotActivity: 0.1,
      flareFrequency: 0.01,
      showLabel: true,
      labelColor: '#ffffff',
      labelSize: 12,
      labelOffset: 5,
      showOrbit: true,
      orbitColor: '#ffffff',
      orbitWidth: 1,
      orbitOpacity: 0.1,
      castShadows: true,
      receiveShadows: true,
      civilizationLevel: 0,
      lifeProbability: 0,
      vegetationCover: 0,
      vegetationColor: '#00ff00',
      iceCover: 0,
      iceColor: '#ffffff',
    };
    onUpdate({ ...state, bodies: [...state.bodies, newBody] });
    setEditingId(newId);
  };

  const filteredBodies = useMemo(() => {
    if (filter === 'all') return state.bodies;
    return state.bodies.filter(b => b.type === filter);
  }, [state.bodies, filter]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'star': return <Star className="w-4 h-4 text-yellow-400" />;
      case 'planet': return <Globe className="w-4 h-4 text-blue-400" />;
      case 'moon': return <Moon className="w-4 h-4 text-gray-400" />;
      case 'dwarf-planet': return <Orbit className="w-4 h-4 text-purple-400" />;
      default: return <Globe className="w-4 h-4 text-white" />;
    }
  };

  const renderSlider = (label: string, value: number, min: number, max: number, step: number, onChange: (val: number) => void, unit: string = '') => (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">{label}</label>
        <span className="text-[10px] text-white/60 font-mono">{value.toFixed(step > 0.1 ? 0 : 3)}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );

  const renderToggle = (label: string, checked: boolean, onChange: (val: boolean) => void) => (
    <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
      <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500/50"
      />
    </div>
  );

  const renderColor = (label: string, value: string, onChange: (val: string) => void) => (
    <div className="space-y-1.5">
      <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 bg-white/5 border border-white/10 rounded cursor-pointer"
      />
    </div>
  );

  const renderInput = (label: string, value: string | number, onChange: (val: string) => void, type: string = 'text') => (
    <div className="space-y-1.5">
      <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
      />
    </div>
  );

  return (
    <div className="p-6 bg-[#0a0a12]/80 border border-white/10 rounded-2xl backdrop-blur-xl h-full flex flex-col overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <Settings2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Cosmic Architect</h2>
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">100+ Parameters Active</p>
          </div>
        </div>
        <button
          onClick={addBody}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 shrink-0 no-scrollbar">
        {['all', 'star', 'planet', 'moon', 'dwarf-planet'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold border transition-all whitespace-nowrap ${
              filter === f 
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {filteredBodies.map((body) => (
          <div key={body.id} className="group">
            <div
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                editingId === body.id 
                  ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/5' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setEditingId(editingId === body.id ? null : body.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-4 h-4 rounded-full shadow-lg relative" 
                    style={{ backgroundColor: body.color, boxShadow: `0 0 15px ${body.color}` }} 
                  >
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white tracking-tight">{body.name}</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-mono mt-1">
                      {body.type} {body.parentId ? `• Moon of ${state.bodies.find(b => b.id === body.parentId)?.name}` : ''}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getIcon(body.type)}
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
                  <div className="p-5 mt-2 bg-black/40 border border-white/10 rounded-2xl space-y-6">
                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/5">
                      {[
                        { id: 'general', icon: <Box className="w-3 h-3" /> },
                        { id: 'orbit', icon: <Orbit className="w-3 h-3" /> },
                        { id: 'rotation', icon: <Activity className="w-3 h-3" /> },
                        { id: 'visuals', icon: <Palette className="w-3 h-3" /> },
                        { id: 'atmosphere', icon: <Wind className="w-3 h-3" /> },
                        { id: 'rings', icon: <Layers className="w-3 h-3" /> },
                        { id: 'surface', icon: <Mountain className="w-3 h-3" /> },
                        { id: 'stellar', icon: <Sun className="w-3 h-3" /> },
                        { id: 'physics', icon: <Thermometer className="w-3 h-3" /> },
                        { id: 'ui', icon: <Layout className="w-3 h-3" /> },
                        { id: 'life', icon: <Heart className="w-3 h-3" /> },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id as Category)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
                            activeCategory === cat.id 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white/5 text-white/40 hover:bg-white/10'
                          }`}
                        >
                          {cat.icon}
                          {cat.id}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      {activeCategory === 'general' && (
                        <div className="grid grid-cols-1 gap-4">
                          {renderInput('Name', body.name, (val) => updateBody(body.id, { name: val }))}
                          {renderInput('Description', body.description || '', (val) => updateBody(body.id, { description: val }))}
                          {renderToggle('Visible', body.visible, (val) => updateBody(body.id, { visible: val }))}
                        </div>
                      )}

                      {activeCategory === 'orbit' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderSlider('Distance', body.distance, 0, 1000, 1, (val) => updateBody(body.id, { distance: val }))}
                          {renderSlider('Orbit Speed', body.orbitSpeed, -0.1, 0.1, 0.0001, (val) => updateBody(body.id, { orbitSpeed: val }))}
                          {renderSlider('Eccentricity', body.eccentricity, 0, 0.9, 0.01, (val) => updateBody(body.id, { eccentricity: val }))}
                          {renderSlider('Inclination', body.inclination, -90, 90, 0.1, (val) => updateBody(body.id, { inclination: val }))}
                          {renderSlider('Orbit Direction', body.orbitDirection, -1, 1, 2, (val) => updateBody(body.id, { orbitDirection: val }))}
                          {renderSlider('Orbit Width', body.orbitWidth, 0.1, 5, 0.1, (val) => updateBody(body.id, { orbitWidth: val }))}
                          {renderSlider('Orbit Opacity', body.orbitOpacity, 0, 1, 0.01, (val) => updateBody(body.id, { orbitOpacity: val }))}
                          {renderColor('Orbit Color', body.orbitColor, (val) => updateBody(body.id, { orbitColor: val }))}
                          {renderToggle('Show Orbit', body.showOrbit, (val) => updateBody(body.id, { showOrbit: val }))}
                        </div>
                      )}

                      {activeCategory === 'rotation' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderSlider('Rotation Speed', body.rotationSpeed, -0.1, 0.1, 0.0001, (val) => updateBody(body.id, { rotationSpeed: val }))}
                          {renderSlider('Axial Tilt', body.tilt, 0, 360, 0.1, (val) => updateBody(body.id, { tilt: val }), '°')}
                          {renderSlider('Rotation Direction', body.rotationDirection, -1, 1, 2, (val) => updateBody(body.id, { rotationDirection: val }))}
                          {renderSlider('Day Length', body.dayLength, 0.1, 1000, 0.1, (val) => updateBody(body.id, { dayLength: val }), 'h')}
                          {renderSlider('Axial Precession', body.axialPrecession, 0, 1, 0.001, (val) => updateBody(body.id, { axialPrecession: val }))}
                        </div>
                      )}

                      {activeCategory === 'visuals' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderSlider('Size', body.size, 0.1, 100, 0.1, (val) => updateBody(body.id, { size: val }))}
                          {renderColor('Color', body.color, (val) => updateBody(body.id, { color: val }))}
                          {renderSlider('Roughness', body.roughness, 0, 1, 0.01, (val) => updateBody(body.id, { roughness: val }))}
                          {renderSlider('Metalness', body.metalness, 0, 1, 0.01, (val) => updateBody(body.id, { metalness: val }))}
                          {renderSlider('Opacity', body.opacity, 0, 1, 0.01, (val) => updateBody(body.id, { opacity: val }))}
                          {renderToggle('Wireframe', body.wireframe, (val) => updateBody(body.id, { wireframe: val }))}
                          {renderToggle('Flat Shading', body.flatShading, (val) => updateBody(body.id, { flatShading: val }))}
                          {renderToggle('Emissive', body.emissive, (val) => updateBody(body.id, { emissive: val }))}
                          {renderColor('Emissive Color', body.emissiveColor, (val) => updateBody(body.id, { emissiveColor: val }))}
                          {renderSlider('Emissive Intensity', body.emissiveIntensity, 0, 10, 0.1, (val) => updateBody(body.id, { emissiveIntensity: val }))}
                        </div>
                      )}

                      {activeCategory === 'atmosphere' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderToggle('Enabled', body.atmosphere, (val) => updateBody(body.id, { atmosphere: val }))}
                          {body.atmosphere && (
                            <>
                              {renderColor('Atmo Color', body.atmosphereColor, (val) => updateBody(body.id, { atmosphereColor: val }))}
                              {renderSlider('Opacity', body.atmosphereOpacity, 0, 1, 0.01, (val) => updateBody(body.id, { atmosphereOpacity: val }))}
                              {renderSlider('Scale', body.atmosphereScale, 1, 2, 0.01, (val) => updateBody(body.id, { atmosphereScale: val }))}
                              {renderSlider('Rim Power', body.atmosphereRimPower, 0.1, 10, 0.1, (val) => updateBody(body.id, { atmosphereRimPower: val }))}
                              {renderSlider('Density', body.atmosphereDensity, 0, 5, 0.1, (val) => updateBody(body.id, { atmosphereDensity: val }))}
                              {renderSlider('Scattering', body.atmosphereScattering, 0, 5, 0.1, (val) => updateBody(body.id, { atmosphereScattering: val }))}
                              {renderSlider('Height', body.atmosphereHeight, 1, 100, 1, (val) => updateBody(body.id, { atmosphereHeight: val }))}
                            </>
                          )}
                        </div>
                      )}

                      {activeCategory === 'rings' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderToggle('Enabled', body.rings, (val) => updateBody(body.id, { rings: val }))}
                          {body.rings && (
                            <>
                              {renderColor('Ring Color', body.ringColor, (val) => updateBody(body.id, { ringColor: val }))}
                              {renderSlider('Inner Radius', body.ringInnerRadius, 1, 200, 1, (val) => updateBody(body.id, { ringInnerRadius: val }))}
                              {renderSlider('Outer Radius', body.ringOuterRadius, 1, 300, 1, (val) => updateBody(body.id, { ringOuterRadius: val }))}
                              {renderSlider('Opacity', body.ringOpacity, 0, 1, 0.01, (val) => updateBody(body.id, { ringOpacity: val }))}
                              {renderSlider('Tilt X', body.ringTiltX, 0, Math.PI * 2, 0.01, (val) => updateBody(body.id, { ringTiltX: val }))}
                              {renderSlider('Tilt Z', body.ringTiltZ, 0, Math.PI * 2, 0.01, (val) => updateBody(body.id, { ringTiltZ: val }))}
                              {renderSlider('Segments', body.ringSegments, 16, 256, 1, (val) => updateBody(body.id, { ringSegments: val }))}
                              {renderSlider('Thickness', body.ringThickness, 0.1, 10, 0.1, (val) => updateBody(body.id, { ringThickness: val }))}
                            </>
                          )}
                        </div>
                      )}

                      {activeCategory === 'surface' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderSlider('Bump Scale', body.bumpScale, 0, 1, 0.01, (val) => updateBody(body.id, { bumpScale: val }))}
                          {renderColor('Specular Color', body.specularColor, (val) => updateBody(body.id, { specularColor: val }))}
                          {renderSlider('Shininess', body.shininess, 0, 100, 1, (val) => updateBody(body.id, { shininess: val }))}
                          {renderSlider('Rock %', body.compositionRock, 0, 100, 1, (val) => updateBody(body.id, { compositionRock: val }))}
                          {renderSlider('Ice %', body.compositionIce, 0, 100, 1, (val) => updateBody(body.id, { compositionIce: val }))}
                          {renderSlider('Gas %', body.compositionGas, 0, 100, 1, (val) => updateBody(body.id, { compositionGas: val }))}
                          {renderSlider('Crater Density', body.craterDensity, 0, 1, 0.01, (val) => updateBody(body.id, { craterDensity: val }))}
                          {renderSlider('Crater Size', body.craterSize, 0.1, 10, 0.1, (val) => updateBody(body.id, { craterSize: val }))}
                          {renderSlider('Volcanic', body.volcanicActivity, 0, 1, 0.01, (val) => updateBody(body.id, { volcanicActivity: val }))}
                          {renderSlider('Tectonic', body.tectonicActivity, 0, 1, 0.01, (val) => updateBody(body.id, { tectonicActivity: val }))}
                          {renderSlider('Ocean Cover', body.oceanCover, 0, 100, 1, (val) => updateBody(body.id, { oceanCover: val }), '%')}
                          {renderColor('Ocean Color', body.oceanColor, (val) => updateBody(body.id, { oceanColor: val }))}
                        </div>
                      )}

                      {activeCategory === 'stellar' && body.type === 'star' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderSlider('Luminosity', body.luminosity, 0.1, 10, 0.1, (val) => updateBody(body.id, { luminosity: val }))}
                          {renderInput('Class', body.stellarClass, (val) => updateBody(body.id, { stellarClass: val }))}
                          {renderSlider('Corona', body.coronaIntensity, 0, 5, 0.1, (val) => updateBody(body.id, { coronaIntensity: val }))}
                          {renderSlider('Solar Wind', body.solarWindSpeed, 0, 1000, 1, (val) => updateBody(body.id, { solarWindSpeed: val }), ' km/s')}
                          {renderSlider('Sunspots', body.sunspotActivity, 0, 1, 0.01, (val) => updateBody(body.id, { sunspotActivity: val }))}
                          {renderSlider('Flares', body.flareFrequency, 0, 1, 0.01, (val) => updateBody(body.id, { flareFrequency: val }))}
                        </div>
                      )}

                      {activeCategory === 'physics' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderSlider('Mass', body.mass, 0.01, 1000, 0.01, (val) => updateBody(body.id, { mass: val }))}
                          {renderSlider('Gravity', body.gravity, 0.01, 100, 0.01, (val) => updateBody(body.id, { gravity: val }))}
                          {renderSlider('Temp', body.temperature, 0, 10000, 1, (val) => updateBody(body.id, { temperature: val }), ' K')}
                          {renderSlider('Density', body.density, 0.1, 20, 0.1, (val) => updateBody(body.id, { density: val }))}
                          {renderSlider('Escape Vel', body.escapeVelocity, 0.1, 100, 0.1, (val) => updateBody(body.id, { escapeVelocity: val }), ' km/s')}
                          {renderSlider('Albedo', body.albedo, 0, 1, 0.01, (val) => updateBody(body.id, { albedo: val }))}
                          {renderSlider('Pressure', body.surfacePressure, 0, 1000, 0.1, (val) => updateBody(body.id, { surfacePressure: val }), ' atm')}
                          {renderSlider('Age', body.age, 0, 14, 0.1, (val) => updateBody(body.id, { age: val }), ' Byr')}
                          {renderSlider('Mag Field', body.magneticFieldStrength, 0, 100, 0.1, (val) => updateBody(body.id, { magneticFieldStrength: val }))}
                          {renderSlider('Core Temp', body.coreTemperature, 0, 20000, 100, (val) => updateBody(body.id, { coreTemperature: val }), ' K')}
                          {renderSlider('Habitability', body.habitabilityIndex, 0, 1, 0.01, (val) => updateBody(body.id, { habitabilityIndex: val }))}
                          {renderSlider('Resources', body.resourceRichness, 0, 1, 0.01, (val) => updateBody(body.id, { resourceRichness: val }))}
                        </div>
                      )}

                      {activeCategory === 'ui' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderToggle('Show Label', body.showLabel, (val) => updateBody(body.id, { showLabel: val }))}
                          {renderColor('Label Color', body.labelColor, (val) => updateBody(body.id, { labelColor: val }))}
                          {renderSlider('Label Size', body.labelSize, 8, 32, 1, (val) => updateBody(body.id, { labelSize: val }))}
                          {renderSlider('Label Offset', body.labelOffset, 0, 50, 1, (val) => updateBody(body.id, { labelOffset: val }))}
                          {renderToggle('Cast Shadows', body.castShadows, (val) => updateBody(body.id, { castShadows: val }))}
                          {renderToggle('Receive Shadows', body.receiveShadows, (val) => updateBody(body.id, { receiveShadows: val }))}
                        </div>
                      )}

                      {activeCategory === 'life' && (
                        <div className="grid grid-cols-2 gap-4">
                          {renderSlider('Life Prob', body.lifeProbability, 0, 1, 0.01, (val) => updateBody(body.id, { lifeProbability: val }))}
                          {renderSlider('Civ Level', body.civilizationLevel, 0, 5, 0.1, (val) => updateBody(body.id, { civilizationLevel: val }))}
                          {renderSlider('Veg Cover', body.vegetationCover, 0, 100, 1, (val) => updateBody(body.id, { vegetationCover: val }), '%')}
                          {renderColor('Veg Color', body.vegetationColor, (val) => updateBody(body.id, { vegetationColor: val }))}
                          {renderSlider('Ice Cover', body.iceCover, 0, 100, 1, (val) => updateBody(body.id, { iceCover: val }), '%')}
                          {renderColor('Ice Color', body.iceColor, (val) => updateBody(body.id, { iceColor: val }))}
                        </div>
                      )}
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
