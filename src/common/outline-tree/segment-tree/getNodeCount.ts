import isLeafNode from "./isLeafNode";
import type { SegmentTree } from "./SegmentTree";

export default function getNodeCount<TItem>(
  tree: SegmentTree<TItem>,
  i: number,
  getLeafCount: (i: TItem) => number) {
  // console.log('getTotal', i)
  return (isLeafNode(tree, i))
    ? getLeafCount(tree.leaves[tree.branches.length - i])
    : tree.branches[i];
}
