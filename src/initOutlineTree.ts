import { GroupLayerInfo } from "./common/GroupLayerInfo";
import doSummarize, { PropertyCount } from "./common/hooks/doSummarize";
import initMembers from "./initMembers";
import { LayerProps } from "./LayerProps";
import { LayerReference } from "./LayerReference";
import { SegmentTree } from "./SegmentTree";

export default function initOutlineTree(
  layers: GroupLayerInfo[], 
  inputs: LayerReference[]
) {
  // initialises all layer props count
  const states = inputs.map(input => {
    const layer = layers[input.index]
    const [, leaves] = doSummarize(layer.viz.schema, layer.viz.state);
    const props = initMembers();
    props.fill(leaves);
    return {
      index: input.index,
      props
    };
  })

  const view = new SegmentTree<LayerProps>((a) => {
    return (!!a && a.props.branches.length > 0)
      ? a.props.branches[0]
      : 0;
  })
  view.fill(states);
  return view;
}