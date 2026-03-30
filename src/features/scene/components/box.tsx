import type { RefObject } from "react";
import type { Mesh } from "three";

interface BoxProps {
  ref: RefObject<Mesh>;
}
export function Box({ ref }: BoxProps) {
  return (
    <mesh ref={ref} position={[1.8, 0.1, 1.5]}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color="#f4a261" metalness={0.1} roughness={0.8} />
    </mesh>
  );
}
