import type { RefObject } from "react";
import type { JointAngles, Metric } from "./robot";

export type AnimationPhase =
  | "idle"
  | "reach"
  | "grasp"
  | "lift"
  | "transport"
  | "release"
  | "return";

export interface AnimationState {
  phase: AnimationPhase;
  progress: number;
}

// ─────────────────────────────────────────────────────────────────
// AnimationBridge — ref bundle shared between the two hooks.
// The outer controller owns the state; the inner hook (inside Canvas)
// writes back via these refs so useFrame never runs outside Canvas.
// ─────────────────────────────────────────────────────────────────
export interface AnimationBridge {
  startSignal: RefObject<(() => void) | null>;
  onJointsChange: RefObject<(j: JointAngles) => void>;
  onPhaseChange: RefObject<(p: AnimationPhase) => void>;
  onRunningChange: RefObject<(r: boolean) => void>;
  onMetricChange: RefObject<(m: Partial<Metric>) => void>;
}
