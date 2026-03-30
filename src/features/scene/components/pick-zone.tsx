export function PickZone() {
  return (
    <mesh position={[1.8, 0.001, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.25, 0.25]} />
      <meshStandardMaterial color="#e76f51" opacity={0.5} transparent />
    </mesh>
  );
}
