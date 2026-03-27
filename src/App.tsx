import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { useState } from "react";
import RobotArm from "./components/robot-arm";
import ControlPanel from "./components/controls/control-panel";
import type { JointAngles } from "./types/robot";
import { Header } from "./components/layout/header";
import { StatusBar } from "./components/layout/status-bar";

import "./App.css";

export default function App() {
  const [joints, setJoints] = useState<JointAngles>({
    base: 0,
    upper: 0,
    lower: 0,
    gripper: 0, // 0 = closed, 100 = fully open
  });

  return (
    <div className="container">
      {/* Header */}
      <Header />
      {/* 3D Scene */}
      <Canvas camera={{ position: [3, 3, 3], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls />
        <Grid infiniteGrid fadeDistance={30} />
        <RobotArm joints={joints} />
      </Canvas>

      {/* Control Panel */}
      <ControlPanel joints={joints} onChange={setJoints} />

      {/* Bottom status bar */}
      <StatusBar />
    </div>
  );
}
