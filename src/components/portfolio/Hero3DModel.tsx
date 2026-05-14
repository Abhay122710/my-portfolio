import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import type { Group, Mesh } from "three";

type Props = { mouseX: number; mouseY: number };

/**
 * Stylized 3D face sculpture built from primitives — no external model.
 * Mannequin / Greek-bust aesthetic with chrome material.
 */
function FaceSculpture({ mouseX, mouseY }: Props) {
  const group = useRef<Group>(null);
  const eyesL = useRef<Mesh>(null);
  const eyesR = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = mouseX * 0.7;
    const targetX = -mouseY * 0.45;
    const lerp = 1 - Math.pow(0.001, delta);
    group.current.rotation.y += (targetY - group.current.rotation.y) * lerp;
    group.current.rotation.x += (targetX - group.current.rotation.x) * lerp;
  });

  const skin = (
    <meshStandardMaterial
      color="#cfd6e0"
      roughness={0.25}
      metalness={0.85}
      envMapIntensity={1.4}
    />
  );

  const dark = (
    <meshStandardMaterial color="#0a0a14" roughness={0.4} metalness={0.6} />
  );

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.35}>
        {/* Cranium — slightly elongated egg shape */}
        <mesh position={[0, 0.55, 0]} scale={[0.95, 1.15, 1.05]}>
          <sphereGeometry args={[1, 64, 64]} />
          {skin}
        </mesh>

        {/* Jaw / chin — second sphere offset down + back */}
        <mesh position={[0, -0.05, 0.05]} scale={[0.78, 0.7, 0.85]}>
          <sphereGeometry args={[1, 64, 64]} />
          {skin}
        </mesh>

        {/* Brow ridge */}
        <mesh position={[0, 0.62, 0.78]} rotation={[0.1, 0, 0]} scale={[0.55, 0.08, 0.18]}>
          <sphereGeometry args={[1, 32, 32]} />
          {skin}
        </mesh>

        {/* Nose bridge */}
        <mesh position={[0, 0.4, 0.92]} rotation={[0.15, 0, 0]} scale={[0.08, 0.32, 0.15]}>
          <sphereGeometry args={[1, 32, 32]} />
          {skin}
        </mesh>

        {/* Nose tip */}
        <mesh position={[0, 0.18, 1.02]} scale={[0.13, 0.12, 0.18]}>
          <sphereGeometry args={[1, 32, 32]} />
          {skin}
        </mesh>

        {/* Cheekbones */}
        <mesh position={[-0.45, 0.25, 0.7]} scale={[0.22, 0.16, 0.22]}>
          <sphereGeometry args={[1, 32, 32]} />
          {skin}
        </mesh>
        <mesh position={[0.45, 0.25, 0.7]} scale={[0.22, 0.16, 0.22]}>
          <sphereGeometry args={[1, 32, 32]} />
          {skin}
        </mesh>

        {/* Eye sockets — dark recessed */}
        <mesh ref={eyesL} position={[-0.3, 0.5, 0.82]} scale={[0.16, 0.1, 0.08]}>
          <sphereGeometry args={[1, 32, 32]} />
          {dark}
        </mesh>
        <mesh ref={eyesR} position={[0.3, 0.5, 0.82]} scale={[0.16, 0.1, 0.08]}>
          <sphereGeometry args={[1, 32, 32]} />
          {dark}
        </mesh>

        {/* Lips */}
        <mesh position={[0, -0.05, 0.95]} scale={[0.22, 0.05, 0.1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#9ba2ad" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, -0.85, -0.05]} scale={[1, 1, 1]}>
          <cylinderGeometry args={[0.32, 0.42, 0.6, 32]} />
          {skin}
        </mesh>

        {/* Shoulders / bust base */}
        <mesh position={[0, -1.25, -0.05]}>
          <cylinderGeometry args={[0.7, 0.95, 0.35, 32]} />
          {skin}
        </mesh>

        {/* Pedestal */}
        <mesh position={[0, -1.55, -0.05]}>
          <cylinderGeometry args={[0.55, 0.55, 0.18, 32]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.5} />
        </mesh>
      </Float>

      <ContactShadows
        position={[0, -1.65, 0]}
        opacity={0.5}
        scale={4}
        blur={2.5}
        far={3}
      />
    </group>
  );
}

const Hero3DModel = ({ mouseX, mouseY }: Props) => {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.6], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.3} />
      {/* Blue rim from left */}
      <directionalLight position={[-4, 2, 3]} intensity={2.2} color="#3b82f6" />
      {/* Orange rim from right */}
      <directionalLight position={[4, 1, 2]} intensity={1.8} color="#f97316" />
      {/* Top fill */}
      <directionalLight position={[0, 4, 2]} intensity={0.6} color="#ffffff" />
      <Environment preset="studio" />
      <FaceSculpture mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
};

export default Hero3DModel;
