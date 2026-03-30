export interface BaseProps {
  color?: string;
}

export function Base({ color = "#333" }: BaseProps) {
  return (
    <mesh position={[0, 0.1, 0]}>
      <cylinderGeometry args={[0.6, 0.7, 0.2, 32]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
    </mesh>
  );
}
