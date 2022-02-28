import getLeafIndexOfSegmentTree from "./getLeafIndexOfSegmentTree";
import { ISegmentTree } from "./ISegmentTree";
import isLeafNodeIndex from "./isLeafNodeIndex";

export default function getNodeCountOfSegmentTree<TItem>(tree: ISegmentTree<TItem>, index: number): number {
  return isLeafNodeIndex(tree, index)
    ? tree.getLeafCount(tree.leaves[getLeafIndexOfSegmentTree(tree, index)])
    : tree.branches[index];
}