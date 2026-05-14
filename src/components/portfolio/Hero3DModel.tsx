import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

type Props = { mouseX: number; mouseY: number };

function FaceSculpture({ mouseX, mouseY }: Props) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = mouseX * 0.7;
    const targetX = -mouseY * 0.4;
    const lerp = 1 - Math.pow(0.001, delta);
    group.current.rotation.y += (targetY - group.current.rotation.y) * lerp;
    group.current.rotation.x += (targetX - group.current.rotation.x) * lerp;
  });

  const skin = (
    <meshPhysicalMaterial
      color="#1a3a8a"
      roughness={0.32}
      metalness={0.7}
      clearcoat={0.6}
      clearcoatRoughness={0.25}
      sheen={0.5}
      sheenColor="#3b82f6"
      envMapIntensity={1.4}
      emissive="#0a1a3f"
      emissiveIntensity={0.35}
    />
  );

  const dark = <meshStandardMaterial color="#02030a" roughness={0.5} metalness={0.3} />;

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <Float speed={1.0} rotationIntensity={0.05} floatIntensity={0.25}>
        {/* Cranium */}
        <mesh position={[0, 0.55, 0]} scale={[0.95, 1.15, 1.05]}>
          <sphereGeometry args={[1, 96, 96]} />
          {skin}
        </mesh>
        {/* Jaw / chin */}
        <mesh position={[0, -0.05, 0.05]} scale={[0.78, 0.72, 0.85]}>
          <sphereGeometry args={[1, 96, 96]} />
          {skin}
        </mesh>
        {/* Brow ridge */}
        <mesh position={[0, 0.62, 0.78]} rotation={[0.1, 0, 0]} scale={[0.55, 0.08, 0.18]}>
          <sphereGeometry args={[1, 48, 48]} />
          {skin}
        </mesh>
        {/* Nose bridge */}
        <mesh position={[0, 0.4, 0.92]} rotation={[0.15, 0, 0]} scale={[0.08, 0.32, 0.15]}>
          <sphereGeometry args={[1, 48, 48]} />
          {skin}
        </mesh>
        {/* Nose tip */}
        <mesh position={[0, 0.18, 1.02]} scale={[0.13, 0.12, 0.18]}>
          <sphereGeometry args={[1, 48, 48]} />
          {skin}
        </mesh>
        {/* Cheekbones */}
        <mesh position={[-0.45, 0.25, 0.7]} scale={[0.22, 0.16, 0.22]}>
          <sphereGeometry args={[1, 48, 48]} />
          {skin}
        </mesh>
        <mesh position={[0.45, 0.25, 0.7]} scale={[0.22, 0.16, 0.22]}>
          <sphereGeometry args={[1, 48, 48]} />
          {skin}
        </mesh>
        {/* Eye sockets */}
        <mesh position={[-0.3, 0.5, 0.85]} scale={[0.16, 0.09, 0.07]}>
          <sphereGeometry args={[1, 48, 48]} />
          {dark}
        </mesh>
        <mesh position={[0.3, 0.5, 0.85]} scale={[0.16, 0.09, 0.07]}>
          <sphereGeometry args={[1, 48, 48]} />
          {dark}
        </mesh>
        {/* Lips */}
        <mesh position={[0, -0.05, 0.95]} scale={[0.22, 0.05, 0.1]}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color="#0a1640" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, -0.85, -0.05]}>
          <cylinderGeometry args={[0.32, 0.42, 0.6, 48]} />
          {skin}
        </mesh>
        {/* Bust base */}
        <mesh position={[0, -1.25, -0.05]}>
          <cylinderGeometry args={[0.7, 0.95, 0.35, 48]} />
          {skin}
        </mesh>
      </Float>

      <ContactShadows position={[0, -1.55, 0]} opacity={0.55} scale={4} blur={2.4} far={3} />
    </group>
  );
}

/** HTML layer of scattered binary digits behind the face */
const BinaryBackdrop = () => {
  const rows = useMemo(() => {
    const out: { id: number; top: number; left: number; text: string; opacity: number; size: number }[] = [];
    let id = 0;
    for (let r = 0; r < 22; r++) {
      const top = (r / 22) * 100;
      // Build a row of 0/1 with random gaps
      let text = "";
      const len = 80 + Math.floor(Math.random() * 40);
      for (let c = 0; c < len; c++) {
        const roll = Math.random();
        if (roll < 0.18) text += " ";
        else if (roll < 0.6) text += "0";
        else text += "1";
      }
      out.push({
        id: id++,
        top,
        left: Math.random() * -10,
        text,
        opacity: 0.25 + Math.random() * 0.35,
        size: 11 + Math.floor(Math.random() * 4),
      });
    }
    return out;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none font-mono whitespace-nowrap">
      {rows.map((r) => (
        <div
          key={r.id}
          style={{
            position: "absolute",
            top: `${r.top}%`,
            left: `${r.left}%`,
            opacity: r.opacity,
            color: "#3b82f6",
            fontSize: `${r.size}px`,
            letterSpacing: "0.18em",
            textShadow: "0 0 8px color-mix(in oklab, #3b82f6 60%, transparent)",
          }}
        >
          {r.text}
        </div>
      ))}
    </div>
  );
};

const Hero3DModel = ({ mouseX, mouseY }: Props) => {
  return (
    <div className="relative w-full h-full">
      <BinaryBackdrop />
      <Canvas
        camera={{ position: [0, 0.2, 3.6], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[-4, 2, 3]} intensity={2.4} color="#3b82f6" />
        <directionalLight position={[4, 1, 2]} intensity={1.6} color="#f97316" />
        <directionalLight position={[0, 4, 2]} intensity={0.7} color="#ffffff" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#60a5fa" />
        <Environment preset="studio" />
        <FaceSculpture mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
};

export default Hero3DModel;
