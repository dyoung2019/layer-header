import { LayerPropertyFlags } from "./LayerPropertyFlags";
import { PropertyInfo } from "./PropertyInfo";

export interface LayerInfo {
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
  singleFlag: LayerPropertyFlags;
  selectedFlags: LayerPropertyFlags;
  properties: PropertyInfo[]; // static
}

export type LayerInfoMember =
  "index" |
  "name" |
  "videoOn" |
  "audioOn" | 
  "soloOn" | 
  "isLocked" |
  "collapseTransforms" | 
  "isShy" |
  "is3DLayer" |
  "labelColor" |
  "singleFlag" |
  "selectedFlags" |
  "properties";