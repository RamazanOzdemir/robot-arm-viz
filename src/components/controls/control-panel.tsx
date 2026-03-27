import type { Dispatch, SetStateAction } from "react";
import type { JointAngles } from "../../types/robot";

export interface ControlPanelProps {
  joints: JointAngles;
  onChange: Dispatch<SetStateAction<JointAngles>>;
}

export default function ControlPanel({
  joints,
  onChange,
}: Readonly<ControlPanelProps>) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: "20px 24px",
        color: "white",
        fontFamily: "monospace",
        minWidth: 260,
      }}
    >
      <h3 style={{ margin: "0 0 16px 0", color: "#2a9d8f" }}>Joint Controls</h3>

      {Object.entries(joints).map(([joint, value]) => (
        <div key={joint} style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <label style={{ textTransform: "capitalize", color: "#aaa" }}>
              {joint}
            </label>
            <span style={{ color: "#2a9d8f" }}>
              {joint === "gripper" ? `${value}%` : `${value}°`}
            </span>
          </div>
          <input
            type="range"
            min={joint === "gripper" ? 0 : -180}
            max={joint === "gripper" ? 100 : 180}
            value={value}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                [joint]: Number(e.target.value),
              }))
            }
            style={{ width: "100%", accentColor: "#2a9d8f" }}
          />
        </div>
      ))}
    </div>
  );
}
