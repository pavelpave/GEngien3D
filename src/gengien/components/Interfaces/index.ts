export interface ICanvasProps {
  fullscreen?: boolean;
  enableShadows?: boolean;
  enableVR: boolean;
  enableQuadCamera?: boolean;
  quadData?: {} | null;
  debug?: boolean;
  gammaFactor?: number;
}
