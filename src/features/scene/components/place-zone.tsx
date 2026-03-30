export function PlaceZone() {
  return (
    <mesh position={[-1.8, 0.001, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.25, 0.25]} />
      <meshStandardMaterial color="#2a9d8f" opacity={0.5} transparent />
    </mesh>
  );
}
