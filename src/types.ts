export interface CelestialBody {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'moon' | 'asteroid';
  distance: number; // in relative units
  size: number; // in relative units
  color: string;
  orbitSpeed: number;
  angle: number; // current position in orbit
  rings?: boolean;
  ringColor?: string;
  description?: string;
}

export interface SolarSystemState {
  bodies: CelestialBody[];
}

export const INITIAL_SOLAR_SYSTEM: SolarSystemState = {
  bodies: [
    {
      id: 'sun',
      name: 'Sun',
      type: 'star',
      distance: 0,
      size: 40,
      color: '#FFD700',
      orbitSpeed: 0,
      angle: 0,
      description: 'The center of our solar system.'
    },
    {
      id: 'mercury',
      name: 'Mercury',
      type: 'planet',
      distance: 60,
      size: 4,
      color: '#A5A5A5',
      orbitSpeed: 0.04,
      angle: Math.random() * Math.PI * 2
    },
    {
      id: 'venus',
      name: 'Venus',
      type: 'planet',
      distance: 90,
      size: 9,
      color: '#E3BB76',
      orbitSpeed: 0.015,
      angle: Math.random() * Math.PI * 2
    },
    {
      id: 'earth',
      name: 'Earth',
      type: 'planet',
      distance: 130,
      size: 10,
      color: '#2271B3',
      orbitSpeed: 0.01,
      angle: Math.random() * Math.PI * 2
    },
    {
      id: 'mars',
      name: 'Mars',
      type: 'planet',
      distance: 170,
      size: 6,
      color: '#E27B58',
      orbitSpeed: 0.008,
      angle: Math.random() * Math.PI * 2
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      type: 'planet',
      distance: 240,
      size: 22,
      color: '#D39C7E',
      orbitSpeed: 0.004,
      angle: Math.random() * Math.PI * 2
    },
    {
      id: 'saturn',
      name: 'Saturn',
      type: 'planet',
      distance: 310,
      size: 18,
      color: '#C5AB6E',
      orbitSpeed: 0.002,
      angle: Math.random() * Math.PI * 2,
      rings: true,
      ringColor: 'rgba(197, 171, 110, 0.4)'
    },
    {
      id: 'uranus',
      name: 'Uranus',
      type: 'planet',
      distance: 370,
      size: 12,
      color: '#BBE1E4',
      orbitSpeed: 0.001,
      angle: Math.random() * Math.PI * 2
    },
    {
      id: 'neptune',
      name: 'Neptune',
      type: 'planet',
      distance: 420,
      size: 11,
      color: '#6081FF',
      orbitSpeed: 0.0008,
      angle: Math.random() * Math.PI * 2
    }
  ]
};
