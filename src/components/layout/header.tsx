export function Header() {
  return (
    <div className="absolute top-5 right-5 text-white font-mono text-right">
      <p className="text-[22px] font-bold text-teal">gauss.arm</p>
      <p className="text-[12px] text-subtle mt-1">
        Interactive Robot Arm Visualizer
      </p>
      <p className="text-[11px] text-muted mt-0.5">
        built with React · Three.js · R3F
      </p>
    </div>
  );
}
