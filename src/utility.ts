import type { JointAngles } from "./types/robot";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const deg = (d: number) => (d * Math.PI) / 180;

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpJoints(
  from: JointAngles,
  to: JointAngles,
  t: number,
): JointAngles {
  // smooth t with smoothstep — linear lerp feels mechanical, smoothstep feels organic
  const s = t * t * (3 - 2 * t);
  return {
    base: lerp(from.base, to.base, s),
    upper: lerp(from.upper, to.upper, s),
    lower: lerp(from.lower, to.lower, s),
    gripper: lerp(from.gripper, to.gripper, s),
  };
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
