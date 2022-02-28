import { LayerVisualization } from "../../common/outline-tree/LayerVisualization";
import PropertyRecord from "../../common/outline-tree/PropertyRecord";

export default function handleExpansion(
  r: PropertyRecord,
  onVisualChange: (
    record: PropertyRecord, 
    update: (change: LayerVisualization) => void
  ) => void
) {
  const toggleExpansion = (viz: LayerVisualization) => {
    const dest = viz.state.nodes[r.propIndex]
    dest.isExpanded = !dest.isExpanded;
  }
  // console.log('handleExpansion')
  onVisualChange(r, toggleExpansion);
}