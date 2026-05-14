import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Environment } from "@react-three/drei";
import type { Group, Mesh } from "three";

type Props = { mouseX: number; mouseY: number };

function Sculpture({ mouseX, mouseY }: Props) {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  // Smooth follow toward target rotation derived from cursor
  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = mouseX * 0.6;
    const targetX = -mouseY * 0.4;
    const lerp = 1 - Math.pow(0.001, delta);
    group.current.rotation.y += (targetY - group.current.rotation.y) * lerp;
    group.current.rotation.x += (targetX - group.current.rotation.x) * lerp;
    if (core.current) {
      core.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* Core organic distorted form */}
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
        <Icosahedron ref={core} args={[1.4, 6]}>
          <MeshDistortMaterial
            color="#3b82f6"
            roughness={0.15}
            metalness={0.85}
            distort={0.42}
            speed={1.6}
            envMapIntensity={1.2}
          />
        </Icosahedron>

        {/* Wireframe shell — gives the low-poly 3D-model feel */}
        <Icosahedron args={[1.62, 1]}>
          <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.35} />
        </Icosahedron>

        {/* Inner glow core */}
        <Icosahedron args={[0.6, 3]}>
          <meshBasicMaterial color="#f97316" transparent opacity={0.55} />
        </Icosahedron>
      </Float>

      {/* Orbiting accent ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 200]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 200]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

const Hero3DModel = ({ mouseX, mouseY }: Props) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#60a5fa" />
      <directionalLight position={[-5, -2, 3]} intensity={1.0} color="#f97316" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#ffffff" />
      <Environment preset="city" />
      <Sculpture mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
};

export default Hero3DModel;
