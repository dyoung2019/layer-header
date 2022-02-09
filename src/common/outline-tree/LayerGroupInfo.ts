import { LayerVisualization } from "./LayerVisualization";

export interface LayerGroupInfo {
  // id: any;
  index: number;
  name: string;
  // isNameSet: boolean;
  videoOn: boolean;
  audioOn: boolean;
  soloOn: boolean;
  isLocked: boolean;
  collapseTransforms: boolean;
  isShy: boolean;
  is3DLayer: boolean;
  labelColor: string;
  viz: LayerVisualization;
}