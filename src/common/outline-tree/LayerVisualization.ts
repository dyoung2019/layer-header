import { GroupPropertyState } from "./GroupPropertyState";
import { GroupPropertySchema } from "./GroupPropertySchema";
import { LayerPropertyFlags } from "./LayerPropertyFlags";

export interface LayerVisualization {
  singleFlag: LayerPropertyFlags;
  selectedFlags: LayerPropertyFlags;
  schema: GroupPropertySchema;
  state: GroupPropertyState;
}