import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer, Float } from "@react-three/drei";
import type { Group } from "three";

type Props = { mouseX: number; mouseY: number };

/**
 * 3D face sculpture rendered as binary ASCII characters.
 * The geometry is real WebGL — AsciiRenderer reprojects the rendered
 * frame into ' 01' glyphs, giving the digital-binary face look.
 */
function FaceSculpture({ mouseX, mouseY }: Props) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = mouseX * 0.7;
    const targetX = -mouseY * 0.45;
    // Smooth exponential follow — frame-rate independent
    const lerp = 1 - Math.pow(0.001, delta);
    group.current.rotation.y += (targetY - group.current.rotation.y) * lerp;
    group.current.rotation.x += (targetX - group.current.rotation.x) * lerp;
  });

  // Single bright material — AsciiRenderer reads luminance to pick glyphs
  const skin = <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />;

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <Float speed={1.0} rotationIntensity={0.06} floatIntensity={0.3}>
        {/* Cranium */}
        <mesh position={[0, 0.55, 0]} scale={[0.95, 1.15, 1.05]}>
          <sphereGeometry args={[1, 64, 64]} />
          {skin}
        </mesh>
        {/* Jaw */}
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
        {/* Eye sockets — dark to read as space in ascii */}
        <mesh position={[-0.3, 0.5, 0.85]} scale={[0.15, 0.08, 0.06]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[0.3, 0.5, 0.85]} scale={[0.15, 0.08, 0.06]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Lips */}
        <mesh position={[0, -0.05, 0.95]} scale={[0.22, 0.05, 0.1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      </Float>
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
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 4]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-3, 1, 2]} intensity={0.8} color="#ffffff" />

      <FaceSculpture mouseX={mouseX} mouseY={mouseY} />

      {/* Binary-glyph reprojection — primary blue on transparent bg */}
      <AsciiRenderer
        characters=" 01"
        invert
        fgColor="#3b82f6"
        bgColor="transparent"
        resolution={0.18}
      />
    </Canvas>
  );
};

export default Hero3DModel;
