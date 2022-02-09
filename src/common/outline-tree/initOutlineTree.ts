import { LayerGroupInfo } from "./LayerGroupInfo";
import doSummarize from "./doSummarize";
import initMembers from "./initMembers";
import { LayerProps } from "./LayerProps";
import { LayerReference } from "./LayerReference";
import { SegmentTree } from "./segment-tree/SegmentTree";
import type { OutlineTree } from "./OutlineTree";

export default function initOutlineTree(
  groups: LayerGroupInfo[], 
  references: LayerReference[]
): OutlineTree {
  // initialises all layer props count
  const states = references.map(input => {
    const layer = groups[input.index]
    const [, leaves] = doSummarize(layer.viz.schema, layer.viz.state);
    // console.log('leaves', leaves)
    const props = initMembers();
    props.fill(leaves);
    // console.log('props', props)
    return {
      index: input.index,
      props
    };
  })
  // console.log('states', states)

  const view = new SegmentTree<LayerProps>((a) => {
    return (!!a && a.props.branches.length > 0)
      ? a.props.branches[0]
      : 0;
  })
  view.fill(states);
  return view;
}