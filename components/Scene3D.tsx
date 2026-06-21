"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createParticlePositions(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 4 * (0.6 + Math.random() * 0.4);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;
  const positions = useMemo(() => createParticlePositions(count), [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0008;
    const { mouse } = state;
    pointsRef.current.rotation.x +=
      (mouse.y * 0.2 - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.y +=
      (mouse.x * 0.2 - pointsRef.current.rotation.y) * 0.02 * 0;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#C9A84C"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function GeometricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.05;
    meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={2.2}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

function Ring() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x += 0.0015;
    ringRef.current.rotation.z += 0.001;
  });
  return (
    <mesh ref={ringRef} scale={2.8}>
      <torusGeometry args={[1, 0.01, 16, 100]} />
      <meshBasicMaterial color="#E8C96B" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ fov: 75, position: [0, 0, 3] }}
      gl={{ alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#C9A84C" intensity={1} />
      <pointLight position={[-5, -5, -5]} color="#9A7A2E" intensity={0.6} />
      <ParticleField />
      <GeometricMesh />
      <Ring />
    </Canvas>
  );
}
