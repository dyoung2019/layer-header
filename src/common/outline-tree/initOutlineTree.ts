import { LayerGroupInfo } from "./LayerGroupInfo";
import doSummarize from "./doSummarize";
import initMembers from "./initMembers";
import { LayerProps } from "./LayerProps";
import { LayerReference } from "./LayerReference";
import { ISegmentTree } from "./segment-tree/ISegmentTree";
import type { OutlineTree } from "./OutlineTree";
import fillSegmentTree from "./segment-tree/fillSegmentTree";
import initSegmentTree from "./segment-tree/initSegmentTree";

export default function initOutlineTree(
  groups: LayerGroupInfo[], 
  references: LayerReference[]
): OutlineTree {
  // initialises all layer props count
  const states = references.map(input => {
    const layer = groups[input.index]
    const leaves = doSummarize(layer.is3DLayer, layer.viz.schema, layer.viz.state);
    // console.log('leaves', leaves)
    const props = initMembers();
    fillSegmentTree(props, leaves);
    console.log('props', props)
    return {
      index: input.index,
      props
    };
  })
  // console.log('states', states)

  const view = initSegmentTree<LayerProps>((a) => {
    return (!!a && a.props.branches.length > 0)
      ? a.props.branches[0]
      : 0;
  })
  fillSegmentTree(view, states);
  return view;
}