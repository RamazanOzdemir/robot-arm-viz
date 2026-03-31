// ─────────────────────────────────────────────────────────────────
// RobotScene — lives INSIDE Canvas
// Safe to call useFrame here. Receives bridge + current state as props.

import { OrbitControls, Grid } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import { RobotArm } from "./features/robot-arm/components";
import { PickAndPlaceScene } from "./features/scene/components";
import { useSceneAnimation } from "./features/scene/hooks/use-scene-animation";
import type { AnimationBridge, AnimationPhase } from "./types/animation";
import type { JointAngles } from "./types/robot";

// ─────────────────────────────────────────────────────────────────
interface RobotSceneProps {
  bridge: AnimationBridge;
  joints: JointAngles;
  phase: AnimationPhase;
}

export default function RobotScene({ bridge, joints, phase }: RobotSceneProps) {
  // useFrame lives here — inside Canvas ✓
  useSceneAnimation(bridge);
  const gripperRef = useRef<Group>(null);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />
      <Grid infiniteGrid fadeDistance={30} />
      <RobotArm joints={joints} gripperRef={gripperRef} />
      <PickAndPlaceScene phase={phase} gripperRef={gripperRef} />
    </>
  );
}
