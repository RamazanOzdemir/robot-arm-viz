import type { AnimationPhase } from "@/types/animation";

// World-space box positions for each animation phase
export const BOX_POSITIONS: Partial<
  Record<AnimationPhase, [number, number, number]>
> = {
  idle: [1.8, 0.1, 1.5],
  reach: [1.8, 0.1, 1.5],
  grasp: [1.8, 0.1, 1.5],
  lift: [1.8, 0.8, 1.5],
  transport: [-1.8, 0.8, 1.5],
  release: [-1.8, 0.1, 1.5],
  return: [-1.8, 0.1, 1.5],
};
