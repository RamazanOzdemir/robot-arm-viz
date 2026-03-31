import {
  JOINT_BAR_COLORS,
  PHASE_COLORS,
  PHASE_ORDER,
} from "@/constants/keyframes";
import type { AnimationPhase } from "@/types/animation";
import type { JointAngles } from "@/types/robot";
import { JointBar } from "./joint-bar";
import { cn } from "@/utility";

interface TelemetryPanelProps {
  phase: AnimationPhase;
  joints: JointAngles;
  cycleTime: number;
  fps: number;
}

export default function TelemetryPanel({
  phase,
  joints,
  cycleTime,
  fps,
}: TelemetryPanelProps) {
  const phaseIndex = PHASE_ORDER.indexOf(phase);
  const phaseDisplay = phase === "idle" ? "—" : `${phaseIndex + 1} / 6`;

  return (
    <div className="absolute bottom-5 left-5 w-[200px] bg-bg-panel rounded-xl p-4 font-mono text-[#e0e0e0]">
      {/* header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-muted tracking-widest">
          TELEMETRY
        </span>
        <span className="flex items-center gap-1 text-[10px] text-teal">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          LIVE
        </span>
      </div>

      {/* phase */}
      <div className="bg-bg-card rounded-lg px-3 py-2 mb-2">
        <div className="text-[10px] text-muted mb-1.5">PHASE</div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-[10px] px-2 py-0.5 rounded tracking-wider",
              PHASE_COLORS[phase],
            )}
          >
            {phase.toUpperCase()}
          </span>
          <span className="text-[10px] text-muted">{phaseDisplay}</span>
        </div>
      </div>

      {/* joints */}
      <div className="bg-bg-card rounded-lg px-3 py-2 mb-2">
        <div className="text-[10px] text-muted mb-2">JOINT ANGLES</div>
        {(Object.keys(joints) as (keyof JointAngles)[]).map((key) => (
          <JointBar
            key={key}
            label={key}
            value={joints[key]}
            colorClass={JOINT_BAR_COLORS[key]}
            max={key == "gripper" ? 100 : 180}
            min={key == "gripper" ? 0 : -180}
          />
        ))}
      </div>

      {/* metrics */}
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
    </div>
  );
}
