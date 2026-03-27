import type { PropsWithChildren } from "react";
import { Joint } from "./joint";

export interface ArgSegmentProps extends PropsWithChildren {
  length: number;
  color: string;
}

export function ArmSegment({ length, color, children }: ArgSegmentProps) {
  return (
    <group>
      <mesh position={[0, length / 2, 0]}>
        <boxGeometry args={[0.25, length, 0.25]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} />
      </mesh>
      <group position={[0, length, 0]}>
        <Joint />
        {children}
      </group>
    </group>
  );
}
