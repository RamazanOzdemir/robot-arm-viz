interface MetricsProps {
  cycleTime: number;
  fps: number;
}

export function Metrics({ cycleTime, fps }: MetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-bg-card rounded-lg px-3 py-2">
        <div className="text-[10px] text-muted mb-1">CYCLE</div>
        <div className="text-lg font-medium">
          {cycleTime.toFixed(1)}
          <span className="text-[10px] text-muted ml-0.5">s</span>
        </div>
      </div>
      <div className="bg-bg-card rounded-lg px-3 py-2">
        <div className="text-[10px] text-muted mb-1">FPS</div>
        <div className="text-lg font-medium">
          {Math.round(fps)}
          <span className="text-[10px] text-muted ml-0.5">hz</span>
        </div>
      </div>
    </div>
  );
}
