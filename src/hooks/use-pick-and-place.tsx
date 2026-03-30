import { KEYFRAMES } from "@/constants/keyframes";
import type { AnimationBridge, AnimationPhase } from "@/types/animation";
import type { JointAngles } from "@/types/robot";
import { useCallback, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────
// usePickAndPlaceController — lives OUTSIDE Canvas
// Owns UI-facing state. Exposes start() for the button.
// Pass bridge down to RobotScene so the inner hook can connect.
// ─────────────────────────────────────────────────────────────────
export function usePickAndPlaceController() {
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [isRunning, setIsRunning] = useState(false);
  const [joints, setJoints] = useState<JointAngles>(KEYFRAMES.idle);

  const startSignal = useRef<(() => void) | null>(null);
  const onJointsChange = useRef<(j: JointAngles) => void>((j) => setJoints(j));
  const onPhaseChange = useRef<(p: AnimationPhase) => void>((p) => setPhase(p));
  const onRunningChange = useRef<(r: boolean) => void>((r) => setIsRunning(r));

  // Button calls this — delegates into the inner hook via ref
  const start = useCallback(() => {
    startSignal.current?.();
  }, []);

  const bridge: AnimationBridge = {
    startSignal,
    onJointsChange,
    onPhaseChange,
    onRunningChange,
  };

  return { phase, isRunning, joints, start, bridge };
}
