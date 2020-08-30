import { Vector3, Vector4 } from "three";
import { type } from "os";

export type QuadCamera = {
  leftUpCamera: {
    position: [];
    rotation: [];
  };
  rightUpCamera: {
    position: [];
    rotation: [];
  };
  leftLowerCamera: {
    position: [];
    rotation: [];
  };
  rightLowerCamera: {
    position: [];
    rotation: [];
  };
};
export type TextboxProps = any & React.HTMLAttributes<HTMLDivElement>;

export type Position = [] | Vector3 | object | any
export type Rotation = [] | Vector3 | object | any
export type Quaternion = [] | Vector4 | object | Vector3 | any
export type Scale = [] | Vector3 | object | any