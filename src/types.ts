export interface CelestialBody {
  // --- Identification & Metadata (4) ---
  id: string;
  name: string;
  type: 'star' | 'planet' | 'moon' | 'dwarf-planet' | 'asteroid';
  parentId?: string;
  description?: string;

  // --- Basic Transform (4) ---
  distance: number;
  size: number;
  angle: number;
  tilt: number;

  // --- Physics & Stats (12) ---
  mass: number;
  gravity: number;
  temperature: number;
  density: number;
  escapeVelocity: number;
  albedo: number;
  surfacePressure: number;
  age: number;
  magneticFieldStrength: number;
  coreTemperature: number;
  habitabilityIndex: number;
  resourceRichness: number;

  // --- Orbit Dynamics (10) ---
  orbitSpeed: number;
  eccentricity: number;
  inclination: number;
  orbitDirection: number; // 1 or -1
  perihelion: number;
  aphelion: number;
  orbitalPeriod: number;
  meanAnomaly: number;
  argumentOfPeriapsis: number;
  longitudeOfAscendingNode: number;

  // --- Rotation Dynamics (4) ---
  rotationSpeed: number;
  rotationDirection: number; // 1 or -1
  dayLength: number;
  axialPrecession: number;

  // --- Visuals - Material (10) ---
  color: string;
  roughness: number;
  metalness: number;
  opacity: number;
  wireframe: boolean;
  flatShading: boolean;
  visible: boolean;
  emissive: boolean;
  emissiveColor: string;
  emissiveIntensity: number;

  // --- Atmosphere (8) ---
  atmosphere: boolean;
  atmosphereColor: string;
  atmosphereOpacity: number;
  atmosphereScale: number;
  atmosphereRimPower: number;
  atmosphereDensity: number;
  atmosphereScattering: number;
  atmosphereHeight: number;

  // --- Rings (9) ---
  rings: boolean;
  ringColor: string;
  ringInnerRadius: number;
  ringOuterRadius: number;
  ringOpacity: number;
  ringTiltX: number;
  ringTiltZ: number;
  ringSegments: number;
  ringThickness: number;

  // --- Surface Features (12) ---
  bumpScale: number;
  specularColor: string;
  shininess: number;
  compositionRock: number;
  compositionIce: number;
  compositionGas: number;
  craterDensity: number;
  craterSize: number;
  volcanicActivity: number;
  tectonicActivity: number;
  oceanCover: number;
  oceanColor: string;

  // --- Clouds (5) ---
  cloudCover: number;
  cloudColor: string;
  cloudHeight: number;
  cloudOpacity: number;
  cloudSpeed: number;

  // --- Stellar Specific (6) ---
  luminosity: number;
  stellarClass: string;
  coronaIntensity: number;
  solarWindSpeed: number;
  sunspotActivity: number;
  flareFrequency: number;

  // --- UI & Rendering (10) ---
  showLabel: boolean;
  labelColor: string;
  labelSize: number;
  labelOffset: number;
  showOrbit: boolean;
  orbitColor: string;
  orbitWidth: number;
  orbitOpacity: number;
  castShadows: boolean;
  receiveShadows: boolean;

  // --- Advanced/Misc (6) ---
  civilizationLevel: number;
  lifeProbability: number;
  vegetationCover: number;
  vegetationColor: string;
  iceCover: number;
  iceColor: string;
}

export interface SolarSystemState {
  bodies: CelestialBody[];
}

// Helper to create a body with defaults
const createBody = (overrides: Partial<CelestialBody>): CelestialBody => ({
  id: '',
  name: '',
  type: 'planet',
  distance: 100,
  size: 5,
  angle: 0,
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
  ...overrides
});

export const INITIAL_SOLAR_SYSTEM: SolarSystemState = {
  bodies: [
    createBody({
      id: 'sun',
      name: 'Sun',
      type: 'star',
      distance: 0,
      size: 30,
      color: '#FFD700',
      emissive: true,
      emissiveIntensity: 2,
      luminosity: 3.8e26,
      stellarClass: 'G2V',
      temperature: 5778,
      description: 'The center of our solar system.'
    }),
    createBody({
      id: 'mercury',
      name: 'Mercury',
      type: 'planet',
      distance: 60,
      size: 2.4,
      color: '#A5A5A5',
      orbitSpeed: 0.04,
      tilt: 0.03
    }),
    createBody({
      id: 'venus',
      name: 'Venus',
      type: 'planet',
      distance: 90,
      size: 6.0,
      color: '#E3BB76',
      orbitSpeed: 0.015,
      tilt: 177.3,
      atmosphere: true,
      atmosphereColor: '#FFE5B4',
      atmosphereOpacity: 0.4
    }),
    createBody({
      id: 'earth',
      name: 'Earth',
      type: 'planet',
      distance: 130,
      size: 6.3,
      color: '#2271B3',
      orbitSpeed: 0.01,
      tilt: 23.4,
      atmosphere: true,
      atmosphereColor: '#87CEEB',
      atmosphereOpacity: 0.3,
      oceanCover: 71,
      cloudCover: 50,
      lifeProbability: 1
    }),
    createBody({
      id: 'moon',
      name: 'Moon',
      type: 'moon',
      parentId: 'earth',
      distance: 12,
      size: 1.7,
      color: '#D3D3D3',
      orbitSpeed: 0.05
    }),
    createBody({
      id: 'mars',
      name: 'Mars',
      type: 'planet',
      distance: 180,
      size: 3.4,
      color: '#E27B58',
      orbitSpeed: 0.008,
      tilt: 25.19,
      atmosphere: true,
      atmosphereColor: '#FF7F50',
      atmosphereOpacity: 0.1
    }),
    createBody({
      id: 'jupiter',
      name: 'Jupiter',
      type: 'planet',
      distance: 300,
      size: 20,
      color: '#D39C7E',
      orbitSpeed: 0.004,
      tilt: 3.13,
      atmosphere: true,
      atmosphereColor: '#F5DEB3',
      atmosphereOpacity: 0.2
    }),
    createBody({
      id: 'saturn',
      name: 'Saturn',
      type: 'planet',
      distance: 420,
      size: 17,
      color: '#C5AB6E',
      orbitSpeed: 0.002,
      tilt: 26.73,
      rings: true,
      ringColor: '#C5AB6E',
      ringInnerRadius: 22,
      ringOuterRadius: 35,
      atmosphere: true,
      atmosphereColor: '#F4A460',
      atmosphereOpacity: 0.2
    }),
    createBody({
      id: 'uranus',
      name: 'Uranus',
      type: 'planet',
      distance: 520,
      size: 12,
      color: '#BBE1E4',
      orbitSpeed: 0.001,
      tilt: 97.77,
      rings: true,
      ringColor: '#BBE1E4',
      ringInnerRadius: 15,
      ringOuterRadius: 18,
      atmosphere: true,
      atmosphereColor: '#AFEEEE',
      atmosphereOpacity: 0.3
    }),
    createBody({
      id: 'neptune',
      name: 'Neptune',
      type: 'planet',
      distance: 620,
      size: 11,
      color: '#6081FF',
      orbitSpeed: 0.0008,
      tilt: 28.32,
      atmosphere: true,
      atmosphereColor: '#4169E1',
      atmosphereOpacity: 0.3
    }),
    createBody({
      id: 'pluto',
      name: 'Pluto',
      type: 'dwarf-planet',
      distance: 720,
      size: 1.2,
      color: '#DEB887',
      orbitSpeed: 0.0005,
      tilt: 122.5
    })
  ]
};
