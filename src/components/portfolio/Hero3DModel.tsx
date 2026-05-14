import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF, useAnimations } from "@react-three/drei";
import { Box3, Group, MathUtils, Vector3 } from "three";

type Props = { mouseX: number; mouseY: number; typing: boolean };

const MODEL_URL = "/models/polywork_scene.glb";
useGLTF.preload(MODEL_URL);

function PolyworkScene({ mouseX, mouseY, typing }: Props) {
  const group = useRef<Group>(null);
  const innerRef = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, mixer } = useAnimations(animations, innerRef);

  // Center and scale the loaded scene to a known size
  const { centeredScene, fitScale } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    cloned.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const target = 2.6;
    return { centeredScene: cloned, fitScale: target / maxDim };
  }, [scene]);

  // Play all animations on mount
  useEffect(() => {
    const names = Object.keys(actions);
    names.forEach((n) => {
      const action = actions[n];
      if (!action) return;
      action.reset().fadeIn(0.4).play();
    });
    return () => {
      names.forEach((n) => actions[n]?.fadeOut(0.2).stop());
    };
  }, [actions]);

  // Pause/resume mixer based on `typing`
  useEffect(() => {
    if (!mixer) return;
    mixer.timeScale = typing ? 1 : 0;
  }, [typing, mixer]);

  // Cursor tracking
  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = mouseX * 0.5;
    const targetX = -mouseY * 0.18;
    const lerp = 1 - Math.pow(0.001, delta);
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, targetY, lerp);
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, targetX, lerp);
  });

  return (
    <group ref={group} position={[0, -0.4, 0]} scale={fitScale}>
      <group ref={innerRef}>
        <primitive object={centeredScene} />
      </group>
    </group>
  );
}

const Hero3DModel = ({ mouseX, mouseY, typing }: Props) => {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.4} color="#ffffff" castShadow />
        <directionalLight position={[-4, 2, 2]} intensity={0.7} color="#a5b4fc" />
        <directionalLight position={[0, 3, -3]} intensity={0.4} color="#fbbf24" />
        <Environment preset="city" />
        <PolyworkScene mouseX={mouseX} mouseY={mouseY} typing={typing} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.45} scale={6} blur={2.6} far={3} />
      </Canvas>
    </div>
  );
};

export default Hero3DModel;
