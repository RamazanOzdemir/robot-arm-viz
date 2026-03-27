export function Header() {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        color: "white",
        fontFamily: "monospace",
        textAlign: "right",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: "bold", color: "#2a9d8f" }}>
        gauss.arm
      </div>
      <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>
        Interactive Robot Arm Visualizer
      </div>
      <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
        built with React · Three.js · R3F
      </div>
    </div>
  );
}
