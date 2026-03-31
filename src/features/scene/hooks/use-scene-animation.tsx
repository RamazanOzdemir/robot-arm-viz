import { KEYFRAMES, PHASE_DURATION, PHASE_ORDER } from "@/constants/keyframes";
import type { AnimationBridge, AnimationPhase } from "@/types/animation";
import type { JointAngles } from "@/types/robot";
import { lerpJoints } from "@/utility";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export function useSceneAnimation(bridge: AnimationBridge) {
  const startSignalRef = bridge.startSignal;
  const onJointsChangeRef = bridge.onJointsChange;
  const onPhaseChangeRef = bridge.onPhaseChange;
  const onRunningChangeRef = bridge.onRunningChange;
  const onMetricChange = bridge.onMetricChange;

  const phaseRef = useRef<AnimationPhase>("idle");
  const phaseTimeRef = useRef(0); // elapsed time within the current phase
  const isRunningRef = useRef(false);
  const fromJointsRef = useRef<JointAngles>(KEYFRAMES.idle);
  const fps = useRef(0);
  const lastMetricUpdate = useRef(0);

  // Register start in an effect (not during render). Bridge refs are stable; [] avoids react-hooks/refs on dep list.
  useEffect(() => {
    startSignalRef.current = () => {
      phaseRef.current = "reach";
      phaseTimeRef.current = 0;
      isRunningRef.current = true;
      fromJointsRef.current = KEYFRAMES.idle;
      onPhaseChangeRef.current("reach");
      onRunningChangeRef.current(true);
    };
    return () => {
      startSignalRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bridge ref objects are stable for the app lifetime
  }, []);

  useFrame(({ clock }, delta) => {
    if (!isRunningRef.current) return;

    const currentPhase = phaseRef.current;
    if (currentPhase === "idle") return;

    const duration = PHASE_DURATION[currentPhase];
    phaseTimeRef.current += delta;

    const now = clock.elapsedTime;

    // bootstrap fps with the first frame — skips the smoothing window
    // so the display doesn't start at 0 for the first second
    if (fps.current === 0) {
      fps.current = 1 / delta;
      lastMetricUpdate.current = now;
    }

    // throttle state updates to once per second using exponential moving average
    // 0.9 / 0.1 weights keep the value stable without lagging behind real changes
    if (now - lastMetricUpdate.current > 1) {
      fps.current = fps.current * 0.9 + (1 / delta) * 0.1;
      onMetricChange.current({
        fps: fps.current,
      });

      lastMetricUpdate.current = now;
    }

    // normalized progress 0-1 within current phase
    const t = Math.min(phaseTimeRef.current / duration, 1);

    // update joint angles
    onJointsChangeRef.current(
      lerpJoints(fromJointsRef.current, KEYFRAMES[currentPhase], t),
    );

    // check if phase is complete
    if (t >= 1) {
      const nextPhaseIndex = PHASE_ORDER.indexOf(currentPhase) + 1;
      const nextPhase = PHASE_ORDER[nextPhaseIndex];

      if (nextPhase === "idle") {
        // animation finished
        isRunningRef.current = false;
        phaseRef.current = "idle";
        onPhaseChangeRef.current("idle");
        onRunningChangeRef.current(false);
        return;
      }

      // advance to next phase
      fromJointsRef.current = KEYFRAMES[currentPhase];
      phaseRef.current = nextPhase;
      phaseTimeRef.current = 0;
      onPhaseChangeRef.current(nextPhase);
    }
  });
}
