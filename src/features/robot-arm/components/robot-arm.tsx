import type { JointAngles } from "@/types/robot";
import { deg } from "@/utility";
import { useRef, type RefObject } from "react";
import type { Group } from "three";
import { ArmSegment } from "./arm-segment";
import { Base } from "./base";
import { Gripper } from "./gripper";
import { Joint } from "./joint";

export interface RobotArmProps {
  joints: JointAngles;
  gripperRef: RefObject<Group | null>;
}
export default function RobotArm({ joints, gripperRef }: RobotArmProps) {
  const baseRef = useRef<Group>(null);
  return (
    <group
      ref={baseRef}
      position={[0, 0, 0]}
      rotation={[0, deg(joints.base), 0]}
    >
      {/* Base platform */}
      <Base />

      {/* Base joint */}
      <group position={[0, 0.2, 0]}>
        <Joint color="#e76f51" />
      </group>

      {/* Upper arm */}
      <group position={[0, 0.2, 0]} rotation={[0, 0, deg(joints.upper)]}>
        <ArmSegment length={1.5} color="#e63946">
          {/* Lower arm */}
          <group rotation={[0, 0, deg(joints.lower)]}>
            <ArmSegment length={1.2} color="#457b9d">
              {/* Gripper */}
              <Gripper spread={joints.gripper} gripperRef={gripperRef} />
            </ArmSegment>
          </group>
        </ArmSegment>
      </group>
    </group>
  );
}
