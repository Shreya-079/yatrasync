import { Float, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group, Mesh, Points } from "three";

/** Ultra-smooth globe with atmosphere halo, continent layer, and equatorial rings */
function Globe() {
  const meshRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);
  const contRef = useRef<Mesh>(null);
  const atmoRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.18;
    if (wireRef.current) wireRef.current.rotation.y += delta * 0.18;
    if (contRef.current) contRef.current.rotation.y += delta * 0.16;
    if (atmoRef.current) atmoRef.current.rotation.y -= delta * 0.05;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.8}>
      <group position={[0, 0, 0]}>
        {/* Atmosphere halo — outer transparent shell */}
        <mesh ref={atmoRef}>
          <sphereGeometry args={[1.664, 64, 64]} />
          <meshPhysicalMaterial
            color="#4a90d9"
            transmission={0.6}
            opacity={0.15}
            transparent
            roughness={0.0}
            metalness={0.0}
            depthWrite={false}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Core globe — pearl-white with lacquered clearcoat */}
        <mesh ref={meshRef} castShadow>
          <sphereGeometry args={[1.6, 96, 96]} />
          <meshPhysicalMaterial
            color="#e8f2fa"
            metalness={0.15}
            roughness={0.08}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            reflectivity={0.95}
            transmission={0.04}
          />
        </mesh>

        {/* Continent-like surface layer — earthy green tint */}
        <mesh ref={contRef}>
          <sphereGeometry args={[1.605, 48, 48]} />
          <meshPhysicalMaterial
            color="#4a7c59"
            roughness={0.9}
            metalness={0.0}
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>

        {/* Outer wireframe latitude/longitude lines */}
        <mesh ref={wireRef}>
          <sphereGeometry args={[1.66, 24, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Atmosphere equatorial ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.74, 0.05, 8, 128]} />
          <meshStandardMaterial
            color="#60a5fa"
            transparent
            opacity={0.3}
            emissive="#93c5fd"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Equatorial amber ring */}
        <mesh>
          <torusGeometry args={[1.77, 0.025, 6, 128]} />
          <meshStandardMaterial
            color="#f59e0b"
            transparent
            opacity={0.45}
            emissive="#fbbf24"
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Realistic airplane with fuselage, swept wings, engines, and tail */
function Airplane() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const radius = 3.2;
    groupRef.current.position.x = Math.sin(t * 0.42) * radius;
    groupRef.current.position.y = Math.cos(t * 0.32) * 0.9 + 0.6;
    groupRef.current.position.z = Math.cos(t * 0.42) * 0.6;
    const dx = Math.cos(t * 0.42) * radius * 0.42;
    const dy = -Math.sin(t * 0.32) * 0.9 * 0.32;
    groupRef.current.rotation.z = -Math.atan2(dy, dx) * 0.5;
    groupRef.current.rotation.y = Math.sin(t * 0.42) * 0.2;
  });

  return (
    <group ref={groupRef} scale={0.18}>
      {/* Fuselage — elongated capsule */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.22, 5.5, 12, 1, false]} />
        <meshPhysicalMaterial
          color="#f0f4f8"
          metalness={0.55}
          roughness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.05}
          reflectivity={0.9}
        />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 0, 2.9]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.38, 1.2, 12]} />
        <meshPhysicalMaterial
          color="#f0f4f8"
          metalness={0.55}
          roughness={0.1}
          clearcoat={0.8}
        />
      </mesh>
      {/* Main wings */}
      <mesh position={[0, 0, 0.3]}>
        <boxGeometry args={[8.8, 0.12, 1.6]} />
        <meshPhysicalMaterial
          color="#e8eef5"
          metalness={0.6}
          roughness={0.12}
          clearcoat={0.7}
          reflectivity={0.85}
        />
      </mesh>
      {/* Swept wingtips */}
      <mesh position={[4.5, 0.45, 0.1]} rotation={[0, 0, 0.42]}>
        <boxGeometry args={[1.5, 0.1, 0.7]} />
        <meshPhysicalMaterial
          color="#dde6f0"
          metalness={0.6}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[-4.5, 0.45, 0.1]} rotation={[0, 0, -0.42]}>
        <boxGeometry args={[1.5, 0.1, 0.7]} />
        <meshPhysicalMaterial
          color="#dde6f0"
          metalness={0.6}
          roughness={0.15}
        />
      </mesh>
      {/* Left engine nacelle */}
      <mesh position={[2.8, -0.28, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 1.1, 10]} />
        <meshPhysicalMaterial
          color="#fbbf24"
          metalness={0.6}
          roughness={0.2}
          emissive="#f59e0b"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Right engine nacelle */}
      <mesh position={[-2.8, -0.28, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 1.1, 10]} />
        <meshPhysicalMaterial
          color="#fbbf24"
          metalness={0.6}
          roughness={0.2}
          emissive="#f59e0b"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Horizontal tail stabilizer */}
      <mesh position={[0, 0, -2.5]}>
        <boxGeometry args={[3.4, 0.08, 0.75]} />
        <meshPhysicalMaterial
          color="#e8eef5"
          metalness={0.55}
          roughness={0.14}
        />
      </mesh>
      {/* Vertical stabilizer */}
      <mesh position={[0, 0.65, -2.4]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[0.1, 1.3, 1.0]} />
        <meshPhysicalMaterial
          color="#d4e2f0"
          metalness={0.5}
          roughness={0.18}
          clearcoat={0.5}
        />
      </mesh>
    </group>
  );
}

/** Animated pulse ring for map pin base */
function PulseRing({ delay = 0 }: { delay?: number }) {
  const ref = useRef<Mesh>(null);
  const startRef = useRef(delay);

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime - startRef.current) % 2.0) / 2.0;
    const s = 1.0 + t * 2.0;
    ref.current.scale.setScalar(s);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = (1.0 - t) * 0.45;
  });

  return (
    <mesh ref={ref} position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.18, 0.02, 8, 24]} />
      <meshBasicMaterial color="#f97316" transparent opacity={0.45} />
    </mesh>
  );
}

/** Realistic saffron location markers: sphere + cone + pulse ring */
function MapPin({
  position,
  delay = 0,
}: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.4 + delay) * 0.22;
  });

  return (
    <group ref={ref} position={position}>
      {/* Pin head sphere */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhysicalMaterial
          color="#f97316"
          emissive="#ea580c"
          emissiveIntensity={0.5}
          metalness={0.2}
          roughness={0.25}
          clearcoat={0.7}
        />
      </mesh>
      {/* Cone pointing down */}
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.048, 0.22, 10]} />
        <meshPhysicalMaterial
          color="#fb923c"
          emissive="#f97316"
          emissiveIntensity={0.35}
          metalness={0.15}
          roughness={0.32}
        />
      </mesh>
      {/* Animated pulse ring at base */}
      <PulseRing delay={delay} />
    </group>
  );
}

/** Saturn-like triple concentric rings — earthy green, ocean blue, amber */
function FloatingRings() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.22;
    groupRef.current.rotation.z += delta * 0.08;
  });

  return (
    <Float speed={1.5} floatIntensity={0.6}>
      <group ref={groupRef} position={[4.0, -0.8, -2]}>
        {/* Ring 1 — earthy green, tilted +5° */}
        <mesh rotation={[Math.PI / 2 + 0.087, 0, 0]}>
          <torusGeometry args={[0.72, 0.018, 12, 64]} />
          <meshPhysicalMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.15}
            clearcoat={0.8}
          />
        </mesh>
        {/* Ring 2 — ocean blue, flat */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.015, 12, 64]} />
          <meshPhysicalMaterial
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={0.35}
            metalness={0.55}
            roughness={0.18}
            clearcoat={0.7}
          />
        </mesh>
        {/* Ring 3 — amber, tilted -5° */}
        <mesh rotation={[Math.PI / 2 - 0.087, 0, 0]}>
          <torusGeometry args={[0.88, 0.014, 12, 64]} />
          <meshPhysicalMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.38}
            metalness={0.5}
            roughness={0.2}
            clearcoat={0.65}
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Iridescent gem accents with IcosahedronGeometry and multi-axis rotation */
function GemAccent({
  position,
  colorHex,
  emissiveHex,
}: {
  position: [number, number, number];
  colorHex: string;
  emissiveHex: string;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s =
      0.85 + Math.sin(state.clock.elapsedTime * 1.8 + position[0] * 4) * 0.15;
    ref.current.scale.setScalar(s);
    ref.current.rotation.x += 0.008;
    ref.current.rotation.y += 0.012;
    ref.current.rotation.z += 0.005;
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.16, 1]} />
      <meshPhysicalMaterial
        color={colorHex}
        emissive={emissiveHex}
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.0}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        reflectivity={1.0}
      />
    </mesh>
  );
}

/** 150-particle cloud with size variation and 5-color palette */
function ParticleCloud() {
  const ref = useRef<Points>(null);
  const [positions, colors, sizes] = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    // 5-color palette: amber, ocean blue, earthy green, soft pink, warm cream
    const palette: [number, number, number][] = [
      [0.96, 0.62, 0.04], // amber
      [0.24, 0.51, 0.96], // ocean blue
      [0.07, 0.73, 0.51], // earthy green
      [0.98, 0.66, 0.83], // soft pink
      [0.99, 0.95, 0.78], // warm cream
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.4 + Math.random() * 2.6; // spread 2.4–5.0
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[i % palette.length];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
      sz[i] = 0.03 + Math.random() * 0.06; // size 0.03–0.09
    }
    return [pos, col, sz];
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.055;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
        <bufferAttribute args={[sizes, 1]} attach="attributes-size" />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

/** 3D compass rose floating near the globe */
function FloatingCompass() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={1.0} floatIntensity={0.5}>
      <group ref={groupRef} position={[2.2, 0.8, 0.3]} scale={0.7}>
        {/* Base disc */}
        <mesh>
          <cylinderGeometry args={[0.25, 0.25, 0.025, 24]} />
          <meshPhysicalMaterial
            color="#faf5eb"
            clearcoat={1.0}
            roughness={0.05}
            metalness={0.1}
            reflectivity={0.9}
          />
        </mesh>
        {/* N/S arm — amber */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.06, 0.03, 0.42]} />
          <meshPhysicalMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.4}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        {/* E/W arm — ocean blue */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.42, 0.03, 0.06]} />
          <meshPhysicalMaterial
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={0.35}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        {/* N arrowhead */}
        <mesh position={[0, 0.03, -0.24]}>
          <coneGeometry args={[0.05, 0.1, 4]} />
          <meshPhysicalMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Stylized suitcase floating element */
function FloatingSuitcase() {
  return (
    <Float speed={0.8} floatIntensity={0.6}>
      <group position={[-2.0, -0.6, 0.5]} scale={0.9}>
        {/* Main body */}
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.22, 0.12]} />
          <meshPhysicalMaterial
            color="#f59e0b"
            clearcoat={0.7}
            clearcoatRoughness={0.1}
            roughness={0.25}
            metalness={0.15}
            emissive="#d97706"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Handle — torus at top */}
        <mesh position={[0, 0.18, 0]}>
          <torusGeometry args={[0.06, 0.015, 8, 16]} />
          <meshPhysicalMaterial
            color="#1e2a4a"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Horizontal stripe 1 */}
        <mesh position={[0, 0.04, 0.065]}>
          <boxGeometry args={[0.32, 0.018, 0.005]} />
          <meshPhysicalMaterial color="#fef3c7" opacity={0.9} transparent />
        </mesh>
        {/* Horizontal stripe 2 */}
        <mesh position={[0, -0.04, 0.065]}>
          <boxGeometry args={[0.32, 0.018, 0.005]} />
          <meshPhysicalMaterial color="#fef3c7" opacity={0.9} transparent />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7.5], fov: 52 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
      shadows
    >
      {/* Warm key light (3000 K) — main illumination from upper-right */}
      <pointLight
        position={[5, 6, 4]}
        intensity={2.5}
        color="#ffe8b0"
        castShadow
      />
      {/* Cool fill light (6500 K) — from lower-left */}
      <pointLight position={[-6, -3, 3]} intensity={1.0} color="#c8d8ff" />
      {/* Rim light from above — gives globe a halo */}
      <pointLight position={[0, 7, -2]} intensity={1.8} color="#ffffff" />
      {/* Ambient — warm, keeps everything readable on light theme */}
      <ambientLight intensity={0.9} color="#fff5e8" />
      {/* Spotlight — upper-left amber accent */}
      <spotLight
        position={[-5, 5, 3]}
        target-position={[0, 0, 0]}
        color="#f59e0b"
        intensity={1.2}
        distance={12}
        angle={0.4}
        penumbra={0.6}
      />
      {/* Directional light for subtle shadow casting */}
      <directionalLight
        position={[3, 4, 2]}
        intensity={0.8}
        color="#fff0d0"
        castShadow
      />
      {/* Hemisphere light — warm sky, cool ground */}
      <hemisphereLight args={["#fff8e7", "#c8d8f0", 0.6]} />

      {/* Very sparse, faint stars */}
      <Stars
        radius={40}
        depth={30}
        count={300}
        factor={2}
        saturation={0.3}
        fade
        speed={0.4}
      />

      <ParticleCloud />
      <Globe />
      <Airplane />
      <FloatingRings />
      <FloatingCompass />
      <FloatingSuitcase />

      <MapPin position={[2.2, 0.3, 1.5]} delay={0} />
      <MapPin position={[-2.4, 0.6, 1.2]} delay={1.2} />
      <MapPin position={[0.8, 1.8, 1.8]} delay={2.4} />
      <MapPin position={[-0.5, -1.5, 2.0]} delay={0.8} />

      <GemAccent
        position={[-3.5, 2.2, -0.5]}
        colorHex="#fbbf24"
        emissiveHex="#f59e0b"
      />
      <GemAccent
        position={[3.8, -1.8, -1.0]}
        colorHex="#3b82f6"
        emissiveHex="#2563eb"
      />
      <GemAccent
        position={[1.0, -2.8, -0.5]}
        colorHex="#10b981"
        emissiveHex="#059669"
      />
    </Canvas>
  );
}
