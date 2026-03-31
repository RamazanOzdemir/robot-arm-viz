import type { AnimationPhase } from "@/types/animation";
import type { JointAngles } from "@/types/robot";

// Target joint angles for each animation phase
export const KEYFRAMES: Record<AnimationPhase, JointAngles> = {
  idle: { base: 0, upper: 0, lower: 0, gripper: 100 },
  reach: { base: -40, upper: -55, lower: -76, gripper: 100 },
  grasp: { base: -40, upper: -55, lower: -76, gripper: 0 },
  lift: { base: -40, upper: -26, lower: -77, gripper: 0 },
  transport: { base: -140, upper: -45, lower: -82, gripper: 0 },
  release: { base: -140, upper: -45, lower: -82, gripper: 100 },
  return: { base: 0, upper: 0, lower: 0, gripper: 100 },
};

// Duration in seconds for each phase
export const PHASE_DURATION: Record<AnimationPhase, number> = {
  idle: 0,
  reach: 1.5,
  grasp: 0.5,
  lift: 1.0,
  transport: 1.5,
  release: 0.5,
  return: 1.5,
};

export const PHASE_ORDER: AnimationPhase[] = [
  "reach",
  "grasp",
  "lift",
  "transport",
  "release",
  "return",
  "idle",
];

export const PHASE_COLORS: Record<AnimationPhase, string> = {
  idle: "bg-muted text-white",
  reach: "bg-teal text-white",
  grasp: "bg-teal text-white",
  lift: "bg-accent text-white",
  transport: "bg-accent text-white",
  release: "bg-teal text-white",
  return: "bg-muted text-white",
};

export const JOINT_BAR_COLORS: Record<keyof JointAngles, string> = {
  base: "bg-accent",
  upper: "bg-teal",
  lower: "bg-teal",
  gripper: "bg-muted",
};
