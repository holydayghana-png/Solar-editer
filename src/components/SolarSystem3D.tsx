import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { CelestialBody } from '../types';

interface BodyProps {
  body: CelestialBody;
  allBodies: CelestialBody[];
}

function BodyMesh({ body, allBodies }: BodyProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  // Calculate position based on elliptical orbit parameters
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (groupRef.current) {
      // Orbit calculation
      const speed = body.orbitSpeed * body.orbitDirection;
      const angle = body.angle + t * speed;
      
      // Elliptical orbit: x = a * cos(theta), z = b * sin(theta)
      const a = body.distance;
      const b = a * Math.sqrt(1 - Math.pow(body.eccentricity, 2));
      
      const x = a * Math.cos(angle);
      const z = b * Math.sin(angle);
      
      groupRef.current.position.set(x, 0, z);
      
      // Inclination
      if (orbitRef.current) {
        orbitRef.current.rotation.x = THREE.MathUtils.degToRad(body.inclination);
      }
    }

    if (meshRef.current) {
      // Rotation calculation
      meshRef.current.rotation.y += body.rotationSpeed * body.rotationDirection;
    }
  });

  const material = useMemo(() => {
    if (body.type === 'star' || body.emissive) {
      return (
        <meshStandardMaterial
          color={body.color}
          emissive={body.emissiveColor || body.color}
          emissiveIntensity={body.emissiveIntensity}
          wireframe={body.wireframe}
          flatShading={body.flatShading}
        />
      );
    }
    return (
      <meshStandardMaterial
        color={body.color}
        roughness={body.roughness}
        metalness={body.metalness}
        opacity={body.opacity}
        transparent={body.opacity < 1}
        wireframe={body.wireframe}
        flatShading={body.flatShading}
      />
    );
  }, [body]);

  const orbitPath = useMemo(() => {
    if (!body.showOrbit || body.distance === 0) return null;
    const points = [];
    const a = body.distance;
    const b = a * Math.sqrt(1 - Math.pow(body.eccentricity, 2));
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(a * Math.cos(angle), 0, b * Math.sin(angle)));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [body.distance, body.eccentricity, body.showOrbit]);

  const content = (
    <group ref={orbitRef}>
      {/* Orbit Line */}
      {orbitPath && (
        <mesh rotation={[0, 0, 0]}>
          <tubeGeometry args={[orbitPath, 128, body.orbitWidth * 0.1, 8, true]} />
          <meshBasicMaterial color={body.orbitColor} opacity={body.orbitOpacity} transparent />
        </mesh>
      )}

      <group ref={groupRef}>
        <Float speed={body.type === 'star' ? 0 : 1} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh ref={meshRef} rotation={[THREE.MathUtils.degToRad(body.tilt), 0, 0]} castShadow={body.castShadows} receiveShadow={body.receiveShadows} visible={body.visible}>
            <sphereGeometry args={[body.size, 64, 64]} />
            {material}
            
            {/* Label */}
            {body.showLabel && (
              <Html distanceFactor={15} position={[0, body.size + body.labelOffset, 0]} center>
                <div 
                  className="px-2 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/10 whitespace-nowrap pointer-events-none select-none"
                  style={{ color: body.labelColor, fontSize: `${body.labelSize}px` }}
                >
                  {body.name}
                </div>
              </Html>
            )}
          </mesh>

          {/* Atmosphere */}
          {body.atmosphere && (
            <mesh scale={[body.atmosphereScale, body.atmosphereScale, body.atmosphereScale]}>
              <sphereGeometry args={[body.size, 64, 64]} />
              <meshPhongMaterial
                color={body.atmosphereColor}
                transparent
                opacity={body.atmosphereOpacity}
                side={THREE.BackSide}
              />
            </mesh>
          )}

          {/* Rings */}
          {body.rings && (
            <mesh rotation={[body.ringTiltX, 0, body.ringTiltZ]}>
              <ringGeometry args={[body.ringInnerRadius, body.ringOuterRadius, body.ringSegments]} />
              <meshStandardMaterial
                color={body.ringColor}
                transparent
                opacity={body.ringOpacity}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}

          {/* Star Light */}
          {body.type === 'star' && (
            <pointLight intensity={body.emissiveIntensity * 1000} distance={2000} decay={1} color={body.color} castShadow />
          )}
        </Float>

        {/* Render children (moons) recursively */}
        {allBodies.filter(b => b.parentId === body.id).map(moon => (
          <BodyMesh key={moon.id} body={moon} allBodies={allBodies} />
        ))}
      </group>
    </group>
  );

  if (body.parentId) return null;
  return content;
}

export default function SolarSystem3D({ bodies }: { bodies: CelestialBody[] }) {
  return (
    <div className="w-full h-full bg-[#05050a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
      <Canvas shadows camera={{ position: [0, 400, 800], fov: 45 }}>
        <color attach="background" args={['#020205']} />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
        <ambientLight intensity={0.1} />
        
        <group>
          {bodies.filter(b => !b.parentId).map((body) => (
            <BodyMesh key={body.id} body={body} allBodies={bodies} />
          ))}
        </group>

        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          maxDistance={2000} 
          minDistance={10}
          makeDefault
        />
      </Canvas>
      
      <div className="absolute top-6 left-6 pointer-events-none space-y-1">
        <div className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em]">System Engine</div>
        <div className="text-xl font-bold text-white tracking-tight">Real-Time 3D Render</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">High Fidelity Active</span>
        </div>
      </div>
    </div>
  );
}
