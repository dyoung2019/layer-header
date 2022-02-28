import { GroupPropertyState } from "../../common/outline-tree/GroupPropertyState";
import { LayerPropertyState } from "../../common/outline-tree/LayerPropertyState";
import { LayerVisualization } from "../../common/outline-tree/LayerVisualization";

export default function cloneVizualization(src: LayerVisualization): LayerVisualization {
  const cloneValues = (src: GroupPropertyState): GroupPropertyState => {
    return {
      nodes: src.nodes.map((n: LayerPropertyState) => {
        return {isExpanded: n.isExpanded, separate: n.separate}
      }),
    };
  }

  return {
    singleFlag: src.singleFlag,
    selectedFlags: src.selectedFlags,
    schema: src.schema, // static
    state: cloneValues(src.state), // should clone
  }
}