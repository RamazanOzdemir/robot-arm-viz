export function StatusBar() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        color: "#555",
        fontFamily: "monospace",
        fontSize: 11,
        textAlign: "center",
      }}
    >
      drag to orbit · scroll to zoom · sliders to control joints
    </div>
  );
}
