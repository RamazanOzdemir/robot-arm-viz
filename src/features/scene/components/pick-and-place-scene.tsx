import { BOX_POSITIONS } from "@/constants/positions";
import type { AnimationPhase } from "@/types/animation";
import { lerp } from "@/utility";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import type { Group, Mesh } from "three";

interface PickAndPlaceSceneProps {
  phase: AnimationPhase;
  gripperRef: RefObject<Group | null>;
}

export default function PickAndPlaceScene({
  phase,
  gripperRef,
}: PickAndPlaceSceneProps) {
  const meshRef = useRef<Mesh>(null);
  const currentPosRef = useRef<[number, number, number]>([0.8, 0.1, 0.5]);
  const { scene } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;

    if (phase === "lift" || phase === "transport") {
      currentPosRef.current = [-1.8, 0.4, 1.5];
      return;
    }

    const target = BOX_POSITIONS[phase] ?? currentPosRef.current;

    // smooth follow — 0.08 controls speed, lower = heavier feel
    currentPosRef.current = [
      lerp(currentPosRef.current[0], target[0], 0.08),
      lerp(currentPosRef.current[1], target[1], 0.08),
      lerp(currentPosRef.current[2], target[2], 0.08),
    ];

    meshRef.current.position.set(...currentPosRef.current);
  });

  useEffect(() => {
    if (!meshRef.current || !gripperRef.current) return;

    if (phase === "lift") {
      gripperRef.current.attach(meshRef.current);
    }

    if (phase === "release") {
      scene.attach(meshRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <>
      {/* Box */}
      <mesh ref={meshRef} position={[1.8, 0.1, 1.5]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#f4a261" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Pick zone marker */}
      <mesh position={[1.8, 0.001, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.25, 0.25]} />
        <meshStandardMaterial color="#e76f51" opacity={0.5} transparent />
      </mesh>

      {/* Place zone marker */}
      <mesh position={[-1.8, 0.001, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.25, 0.25]} />
        <meshStandardMaterial color="#2a9d8f" opacity={0.5} transparent />
      </mesh>
    </>
  );
}
