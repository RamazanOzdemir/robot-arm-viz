import { useFrame } from "@react-three/fiber";
import { type RefObject } from "react";
import { Group, Vector3 } from "three";

export interface GripperProps {
  spread: number;
  gripperRef: RefObject<Group | null>;
}

export function Gripper({ spread, gripperRef }: GripperProps) {
  const offset = spread * 0.003; // max ~0.3 units apart
  useFrame(() => {
    if (gripperRef.current) {
      const pos = new Vector3();
      gripperRef.current.getWorldPosition(pos);
    }
  });
  return (
    <group ref={gripperRef}>
      {/* Left finger - moves left */}
      <mesh position={[-0.15 - offset, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#e9c46a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Right finger - moves right */}
      <mesh position={[0.15 + offset, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#e9c46a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Palm */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.38, 0.08, 0.15]} />
        <meshStandardMaterial color="#e9c46a" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}
