import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { MathUtils } from "three";

type Props = { mouseX: number; mouseY: number; typing: boolean };

/* ---------- Materials ---------- */
const skinColor = "#f1c9a5";
const hairColor = "#1a1a22";
const shirtColor = "#f59e0b";
const chairColor = "#3b6ff0";
const chairDark = "#2950c8";
const laptopColor = "#e8edf5";
const laptopDark = "#cfd6e2";
const pantsColor = "#274bb8";
const shoeColor = "#1c2e6b";
const glassColor = "#0f1226";

function CharacterAtDesk({ mouseX, mouseY, typing }: Props) {
  const root = useRef<Group>(null);
  const head = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const leftHand = useRef<Mesh>(null);
  const rightHand = useRef<Mesh>(null);
  const torso = useRef<Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    // Smooth subtle whole-body sway following cursor
    if (root.current) {
      const targetY = mouseX * 0.25;
      const lerp = 1 - Math.pow(0.001, delta);
      root.current.rotation.y = MathUtils.lerp(root.current.rotation.y, targetY, lerp);
    }
    // Head tracks cursor more
    if (head.current) {
      const ty = mouseX * 0.45;
      const tx = -mouseY * 0.25;
      const lerp = 1 - Math.pow(0.001, delta);
      head.current.rotation.y = MathUtils.lerp(head.current.rotation.y, ty, lerp);
      head.current.rotation.x = MathUtils.lerp(head.current.rotation.x, tx, lerp);
    }

    // Typing animation — fingers tap, arms bob slightly. Stops when typing=false.
    const targetAmp = typing ? 1 : 0;
    const amp = MathUtils.damp(
      (leftHand.current?.userData.amp as number) ?? 0,
      targetAmp,
      4,
      delta,
    );
    if (leftHand.current) leftHand.current.userData.amp = amp;

    if (leftHand.current && rightHand.current) {
      const fast = t * 14;
      leftHand.current.position.y = -0.02 + Math.sin(fast) * 0.05 * amp;
      rightHand.current.position.y = -0.02 + Math.sin(fast + 1.7) * 0.05 * amp;
      leftHand.current.rotation.x = -0.3 + Math.sin(fast) * 0.2 * amp;
      rightHand.current.rotation.x = -0.3 + Math.sin(fast + 1.7) * 0.2 * amp;
    }
    if (leftArm.current && rightArm.current) {
      const slow = t * 2.2;
      leftArm.current.rotation.x = -1.2 + Math.sin(slow) * 0.04 * amp;
      rightArm.current.rotation.x = -1.2 + Math.sin(slow + 1.2) * 0.04 * amp;
    }
    // Subtle breathing
    if (torso.current) {
      torso.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
    }
  });

  return (
    <group ref={root} position={[0, -1.05, 0]}>
      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.15}>
        {/* ---------- Chair ---------- */}
        <mesh position={[0, 0.05, -0.15]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.25, 1.2]} />
          <meshStandardMaterial color={chairColor} roughness={0.55} />
        </mesh>
        {/* Chair backrest */}
        <mesh position={[0, 0.95, -0.7]} castShadow>
          <boxGeometry args={[1.6, 1.6, 0.2]} />
          <meshStandardMaterial color={chairColor} roughness={0.55} />
        </mesh>
        {/* Armrests */}
        <mesh position={[-0.85, 0.55, -0.15]} castShadow>
          <boxGeometry args={[0.18, 0.6, 1.0]} />
          <meshStandardMaterial color={chairDark} roughness={0.6} />
        </mesh>
        <mesh position={[0.85, 0.55, -0.15]} castShadow>
          <boxGeometry args={[0.18, 0.6, 1.0]} />
          <meshStandardMaterial color={chairDark} roughness={0.6} />
        </mesh>

        {/* ---------- Legs (crossed) ---------- */}
        <mesh position={[-0.25, 0.32, 0.45]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.32, 0.22, 1.0]} />
          <meshStandardMaterial color={pantsColor} roughness={0.6} />
        </mesh>
        <mesh position={[0.25, 0.42, 0.55]} rotation={[0, 0, -0.4]} castShadow>
          <boxGeometry args={[0.32, 0.22, 0.95]} />
          <meshStandardMaterial color={pantsColor} roughness={0.6} />
        </mesh>
        {/* Shoes */}
        <mesh position={[-0.55, 0.27, 0.92]} castShadow>
          <boxGeometry args={[0.22, 0.16, 0.32]} />
          <meshStandardMaterial color={shoeColor} roughness={0.5} />
        </mesh>
        <mesh position={[0.5, 0.36, 0.95]} rotation={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[0.22, 0.16, 0.32]} />
          <meshStandardMaterial color={shoeColor} roughness={0.5} />
        </mesh>

        {/* ---------- Torso ---------- */}
        <group ref={torso}>
          <mesh position={[0, 0.85, 0]} castShadow>
            <boxGeometry args={[0.85, 0.95, 0.55]} />
            <meshStandardMaterial color={shirtColor} roughness={0.6} />
          </mesh>
          {/* Neck */}
          <mesh position={[0, 1.4, 0.02]} castShadow>
            <cylinderGeometry args={[0.13, 0.15, 0.18, 24]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
        </group>

        {/* ---------- Head ---------- */}
        <group ref={head} position={[0, 1.7, 0.02]}>
          {/* Head sphere */}
          <mesh castShadow>
            <sphereGeometry args={[0.36, 48, 48]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>
          {/* Hair cap */}
          <mesh position={[0, 0.12, -0.02]} scale={[1.02, 0.7, 1.02]} castShadow>
            <sphereGeometry args={[0.36, 48, 48]} />
            <meshStandardMaterial color={hairColor} roughness={0.9} />
          </mesh>
          {/* Hair fringe */}
          <mesh position={[0, 0.18, 0.27]} rotation={[0.3, 0, 0]} scale={[0.9, 0.25, 0.45]} castShadow>
            <sphereGeometry args={[0.36, 32, 32]} />
            <meshStandardMaterial color={hairColor} roughness={0.9} />
          </mesh>
          {/* Glasses frames */}
          <mesh position={[-0.13, 0.02, 0.32]}>
            <torusGeometry args={[0.085, 0.014, 16, 32]} />
            <meshStandardMaterial color={glassColor} roughness={0.3} metalness={0.4} />
          </mesh>
          <mesh position={[0.13, 0.02, 0.32]}>
            <torusGeometry args={[0.085, 0.014, 16, 32]} />
            <meshStandardMaterial color={glassColor} roughness={0.3} metalness={0.4} />
          </mesh>
          {/* Glasses bridge */}
          <mesh position={[0, 0.02, 0.33]}>
            <boxGeometry args={[0.06, 0.012, 0.012]} />
            <meshStandardMaterial color={glassColor} metalness={0.4} />
          </mesh>
          {/* Eyes (behind lenses) */}
          <mesh position={[-0.13, 0.02, 0.3]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="#0a0a14" />
          </mesh>
          <mesh position={[0.13, 0.02, 0.3]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="#0a0a14" />
          </mesh>
          {/* Smile */}
          <mesh position={[0, -0.13, 0.32]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.05, 0.012, 12, 24, Math.PI]} />
            <meshStandardMaterial color="#7a3a2a" />
          </mesh>
          {/* Headphones */}
          <mesh position={[0, 0.18, -0.05]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.34, 0.04, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#c084fc" roughness={0.4} />
          </mesh>
          {/* Ear cups */}
          <mesh position={[-0.36, 0.02, 0]}>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshStandardMaterial color="#a855f7" roughness={0.4} />
          </mesh>
          <mesh position={[0.36, 0.02, 0]}>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshStandardMaterial color="#a855f7" roughness={0.4} />
          </mesh>
        </group>

        {/* ---------- Arms ---------- */}
        <group ref={leftArm} position={[-0.5, 1.25, 0.05]}>
          <mesh position={[0, -0.3, 0.18]} rotation={[0, 0, 0]} castShadow>
            <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
            <meshStandardMaterial color={shirtColor} roughness={0.6} />
          </mesh>
          {/* Hand */}
          <mesh ref={leftHand} position={[0, -0.7, 0.55]} castShadow>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
        </group>
        <group ref={rightArm} position={[0.5, 1.25, 0.05]}>
          <mesh position={[0, -0.3, 0.18]} rotation={[0, 0, 0]} castShadow>
            <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
            <meshStandardMaterial color={shirtColor} roughness={0.6} />
          </mesh>
          <mesh ref={rightHand} position={[0, -0.7, 0.55]} castShadow>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
        </group>

        {/* ---------- Laptop on lap ---------- */}
        {/* Base */}
        <mesh position={[0, 0.78, 0.55]} rotation={[-0.05, 0, 0]} castShadow>
          <boxGeometry args={[0.95, 0.04, 0.65]} />
          <meshStandardMaterial color={laptopDark} roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 1.08, 0.27]} rotation={[-1.25, 0, 0]} castShadow>
          <boxGeometry args={[0.95, 0.65, 0.04]} />
          <meshStandardMaterial color={laptopColor} roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 1.08, 0.29]} rotation={[-1.25, 0, 0]}>
          <planeGeometry args={[0.85, 0.55]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#a5d8ff"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={6} blur={2.6} far={3} />
    </group>
  );
}

const Hero3DModel = ({ mouseX, mouseY, typing }: Props) => {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 1.2, 4.2], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-4, 2, 2]} intensity={0.8} color="#a5b4fc" />
        <directionalLight position={[0, 3, -3]} intensity={0.4} color="#fbbf24" />
        <Environment preset="city" />
        <CharacterAtDesk mouseX={mouseX} mouseY={mouseY} typing={typing} />
      </Canvas>
    </div>
  );
};

export default Hero3DModel;
