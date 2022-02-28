import { LayerVisualization } from "../../common/outline-tree/LayerVisualization";
import PropertyRecord from "../../common/outline-tree/PropertyRecord";

export default function handleDimensions(
  r: PropertyRecord, 
  onVisualChange: (record: PropertyRecord, update: (change: LayerVisualization) => void) => void
) {
  const toggleSeparate = (viz: LayerVisualization) => {
    const dest = viz.state.nodes[r.propIndex]
    dest.separate = !dest.separate;
  }
  // console.log('handleDims')
  onVisualChange(r, toggleSeparate);
}
