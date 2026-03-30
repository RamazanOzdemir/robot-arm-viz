# robot-arm-viz

An interactive 3D robot arm visualizer built as a portfolio project to demonstrate React Three Fiber, animation systems, and clean frontend architecture.

The focus is not visual polish, but:

- architectural clarity
- explicit design decisions
- clean separation between React state and Three.js render loop
- maintainable and modular component structure

## Overview

This project simulates a pick-and-place robot arm operation in 3D. The arm moves through a sequence of animation phases — reach, grasp, lift, transport, release, return — picking up a box from one position and placing it at another.

Rather than focusing on physics or realism, the project emphasizes:

- readable and maintainable code
- explicit data flow between React and the WebGL canvas
- ref-based bridge pattern to avoid stale closures across render boundaries
- modular feature-based project structure

## What this project IS

- A 3D robot arm built with React Three Fiber and Three.js
- Phase-based animation system with smoothstep interpolation
- Inverse kinematics research and manual keyframe calibration
- Box attachment via Three.js `attach()` / `detach()` during grasp and release
- Clean bridge pattern between React state and the R3F render loop
- Feature-based project structure with clear separation of concerns

## What this project is NOT

- A physics simulation — no collision detection or rigid body dynamics
- A production robot control system
- A full IK solver — keyframes are analytically derived and manually calibrated

## Architecture

The core challenge of this project is that **React and Three.js run on separate cycles**. React re-renders on state changes; Three.js renders every frame via `requestAnimationFrame`. Keeping them in sync without stale closures requires a deliberate bridging strategy.

### Bridge Pattern

```
React (outside Canvas)          Three.js (inside Canvas)
──────────────────────          ────────────────────────
usePickAndPlace                 useSceneAnimation
  └── phase (state)               └── useFrame (60fps)
  └── joints (state)                    │
  └── bridge (refs)  ◄──────────────────┘
        └── onJointsChange.current()
        └── onPhaseChange.current()
        └── startSignal.current()
```

State lives outside the Canvas. The render loop lives inside. `useRef` acts as the shared mutable container — its reference never changes across renders, so `useFrame` always reads the latest value without stale closures.

### Animation System

The animation is divided into discrete phases:

```
idle → reach → grasp → lift → transport → release → return → idle
```

Each phase has a duration and a target set of joint angles (keyframes). Progress within each phase is normalized to `t ∈ [0, 1]` using `delta` accumulation, then eased with smoothstep:

```typescript
const s = t * t * (3 - 2 * t); // smoothstep — ease in/out
```

Linear interpolation between keyframes produces organic-feeling joint movement.

### Box Attachment

During the `lift` phase, the box mesh is attached to the gripper group using Three.js `attach()`, which re-parents the object while preserving its world transform. On `release`, it is returned to the scene root via `scene.attach()`.

```
grasp  →  gripperRef.attach(boxMesh)   // box follows gripper
release →  scene.attach(boxMesh)        // box stays at target
```

## Project Structure

```
src/
├── features/
│   ├── robot-arm/
│   │   └── components/       # RobotArm, ArmSegment, Gripper, Joint, Base
│   └── scene/
│       ├── components/       # PickAndPlaceScene, Box, PickZone, PlaceZone
│       └── hooks/
│           └── use-scene-animation.ts   # useFrame lives here
├── hooks/
│   └── use-pick-and-place.ts            # React state, bridge owner
├── constants/
│   ├── keyframes.ts                     # Joint angle targets per phase
│   └── positions.ts                     # Box world positions per phase
├── types/
│   ├── animation.ts                     # AnimationPhase
│   └── robot.ts                         # JointAngles
├── components/
│   └── layout/                          # Header, StatusBar
└── Scene.tsx                            # Canvas orchestrator
```

## Tech Stack

- React 19
- TypeScript
- React Three Fiber v9
- Three.js
- @react-three/drei
- Tailwind CSS v4
- Vite

## Design Decisions & Trade-offs

### Kinematic Animation vs Physics

The arm uses **kinematic animation** — joint angles are driven directly by interpolated keyframes, not by a physics engine. This mirrors how real industrial robot arms are controlled: servo motors target specific angles, physics is not simulated.

### Manual Keyframe Calibration

Joint angles were derived analytically using a 2-link IK formulation, then calibrated by measuring gripper world position at runtime via `getWorldPosition()`. The coordinate system (Z-axis rotation for upper/lower joints, Y-axis for base) required careful offset handling.

### Ref-based Bridge vs Context

React Context would re-render the entire subtree on every joint update (60fps). `useRef` avoids this entirely — updates flow directly to Three.js without triggering React's reconciler.

### Feature-based Structure

The project follows a feature-based folder structure rather than a type-based one (`/components`, `/hooks`, `/utils`). Each feature owns its components, hooks, and logic. `robot-arm` and `scene` are separate features; `Scene.tsx` orchestrates them at the top level.

## Running the Project

```bash
npm install
npm run dev
```

The visualizer will be available at `http://localhost:5173`.

Press **Pick & Place** to run the pick-and-place animation sequence.
