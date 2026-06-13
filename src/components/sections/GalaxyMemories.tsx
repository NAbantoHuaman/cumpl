"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { memories, type Memory } from "@/data/memories";
import { X } from "lucide-react";

/* ─── 3D Memory Star ─── */
function MemoryStar({
  memory,
  position,
  onSelect,
}: {
  memory: Memory;
  position: [number, number, number];
  onSelect: (m: Memory) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    const scale = hovered ? 1.6 : 1 + Math.sin(t * 2 + position[0]) * 0.1;
    meshRef.current.scale.setScalar(scale);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * 2.5);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={position}>
        {/* Core sphere */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onSelect(memory)}
        >
          <icosahedronGeometry args={[0.3, 2]} />
          <meshStandardMaterial
            color={memory.color}
            emissive={memory.color}
            emissiveIntensity={hovered ? 1.5 : 0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color={memory.color}
            transparent
            opacity={hovered ? 0.2 : 0.08}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Point light */}
        <pointLight
          color={memory.color}
          intensity={hovered ? 3 : 0.8}
          distance={5}
          decay={2}
        />

        {/* Label on hover */}
        {hovered && (
          <Html center distanceFactor={8}>
            <div className="glass rounded-xl px-4 py-2 text-center whitespace-nowrap pointer-events-none select-none">
              <p className="text-pearl-white text-sm font-serif">{memory.title}</p>
              <p className="text-rose-pastel/60 text-xs">{memory.date}</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

/* ─── Background Dust Particles ─── */
function DustParticles() {
  const count = 500;
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#FFB6C1"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Auto-Rotating Scene ─── */
function AutoRotate() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.05) * 2;
    camera.position.y = Math.cos(t * 0.03) * 1;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─── Main Component ─── */
export default function GalaxyMemories() {
  const [selected, setSelected] = useState<Memory | null>(null);

  const starPositions: [number, number, number][] = useMemo(
    () => [
      [-4, 2, -3],
      [3, 3, -2],
      [-2, -2, -4],
      [4, -1, -3],
      [0, 3.5, -5],
      [-3, -3, -2],
      [2, -3, -4],
    ],
    []
  );

  const handleSelect = useCallback((m: Memory) => {
    setSelected(m);
  }, []);

  return (
    <section className="relative w-full h-screen" id="galaxy">
      {/* Section Header */}
      <motion.div
        className="absolute top-8 md:top-12 left-0 right-0 z-20 text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-5xl font-serif text-pearl-white text-glow-purple mb-2">
          Galaxia de Recuerdos
        </h2>
        <p className="text-rose-pastel/50 text-sm md:text-base font-light">
          Toca una estrella para revivir un momento mágico
        </p>
      </motion.div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        className="!cursor-none"
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#FFB6C1" />
        <pointLight position={[-10, -5, 5]} intensity={0.3} color="#A855F7" />

        <Stars
          radius={80}
          depth={60}
          count={3000}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />

        <DustParticles />
        <AutoRotate />

        {memories.map((memory, i) => (
          <MemoryStar
            key={memory.id}
            memory={memory}
            position={starPositions[i] || [0, 0, -3]}
            onSelect={handleSelect}
          />
        ))}

        {/* Fog for depth */}
        <fog attach="fog" args={["#050510", 8, 30]} />
      </Canvas>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Card */}
            <motion.div
              className="relative glass-strong rounded-3xl p-8 md:p-12 max-w-lg w-full z-10 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
            >
              {/* Decorative glow */}
              <div
                className="absolute top-0 left-0 w-40 h-40 rounded-full blur-[60px] opacity-30"
                style={{ background: selected.color }}
              />
              <div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20"
                style={{ background: selected.color }}
              />

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-pearl-white/50 hover:text-pearl-white transition-colors"
                data-cursor-hover
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo */}
              <div
                className="w-full aspect-video rounded-2xl mb-6 overflow-hidden relative"
                style={{
                  background: `linear-gradient(135deg, ${selected.color}40, #2D0A4E60)`,
                }}
              >
                {selected.imagePath ? (
                  <img
                    src={selected.imagePath}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl opacity-50">📸</span>
                  </div>
                )}
              </div>

              {/* Date badge */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-light tracking-widest uppercase mb-3"
                style={{
                  background: `${selected.color}20`,
                  color: selected.color,
                  border: `1px solid ${selected.color}30`,
                }}
              >
                {selected.date}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-serif text-pearl-white mb-3">
                {selected.title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
