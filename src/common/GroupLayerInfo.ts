import { GroupPropertySchema } from "./GroupPropertySchema";
import { GroupPropertyState } from "./GroupPropertyState";
import { LayerPropertyFlags } from "./LayerPropertyFlags";
import { PropertyInfo } from "./PropertyInfo";

export interface GroupLayerInfo {
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

  // properties: PropertyInfo[];
  // nodes: any[];
  viz: {
    singleFlag: LayerPropertyFlags;
    selectedFlags: LayerPropertyFlags;
    schema: GroupPropertySchema,
    state: GroupPropertyState,
  }
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
  // "properties" | 
  "viz";