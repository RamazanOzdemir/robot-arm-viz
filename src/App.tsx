import { Canvas } from "@react-three/fiber";
import { Header } from "./components/layout/header";
import { StatusBar } from "./components/layout/status-bar";

import "./App.css";
import RobotScene from "./Scene";
import { usePickAndPlaceController } from "./hooks/use-pick-and-place";
import { cn } from "./utility";

// ─────────────────────────────────────────────────────────────────
// App — lives OUTSIDE Canvas
// Owns UI state via controller hook. Passes bridge into Canvas.
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const { phase, isRunning, joints, start, bridge } =
    usePickAndPlaceController();

  return (
    <div className="w-screen h-screen bg-bg-dark relative">
      <Header />

      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <RobotScene bridge={bridge} joints={joints} phase={phase} />
      </Canvas>

      {/* Animation control button */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <button
          className={cn(
            "px-7 py-2.5 text-[15px] rounded-lg border-none text-white",
            isRunning
              ? "bg-muted cursor-not-allowed"
              : "bg-accent cursor-pointer",
          )}
          onClick={start}
          disabled={isRunning}
        >
          {isRunning ? `${phase}...` : "▶ Pick & Place"}
        </button>
      </div>

      <StatusBar />
    </div>
  );
}
