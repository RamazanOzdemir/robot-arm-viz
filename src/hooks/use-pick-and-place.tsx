import { KEYFRAMES } from "@/constants/keyframes";
import type { AnimationBridge, AnimationPhase } from "@/types/animation";
import type { JointAngles, Metric } from "@/types/robot";
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
  const [metric, setMetric] = useState<Metric>({
    cycle: 0,
    fps: 0,
  });
  const cycleStartRef = useRef<number>(0);
  const startSignal = useRef<(() => void) | null>(null);
  const onJointsChange = useRef<(j: JointAngles) => void>((j) => setJoints(j));
  const onPhaseChange = useRef<(p: AnimationPhase) => void>((p) => setPhase(p));
  const onRunningChange = useRef<(r: boolean) => void>((r) => {
    if (!r) {
      const cycle = (performance.now() - cycleStartRef.current) / 1000;
      setMetric((prev) => ({
        ...prev,
        cycle,
      }));
    }
    setIsRunning(r);
  });
  const onMetricChange = useRef<(m: Partial<Metric>) => void>((m) =>
    setMetric((prev) => ({ ...prev, ...m })),
  );

  // Button calls this — delegates into the inner hook via ref
  const start = useCallback(() => {
    setMetric({ cycle: 0, fps: 0 });
    cycleStartRef.current = performance.now();
    startSignal.current?.();
  }, []);

  const bridge: AnimationBridge = {
    startSignal,
    onJointsChange,
    onPhaseChange,
    onRunningChange,
    onMetricChange,
  };

  return { phase, isRunning, joints, start, bridge, metric };
}
