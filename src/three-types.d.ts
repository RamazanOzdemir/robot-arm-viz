import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    type IntrinsicElements = React.JSX.IntrinsicElements & ThreeElements;
  }
}
