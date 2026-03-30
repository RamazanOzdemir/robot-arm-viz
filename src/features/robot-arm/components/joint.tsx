export interface JointProps {
  color?: string;
}

export function Joint({ color = "#f4a261" }: JointProps) {
  return (
    <mesh>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </mesh>
  );
}
