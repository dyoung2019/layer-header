import getLeafIndexOfSegmentTree from "./getLeafIndexOfSegmentTree";
import { ISegmentTree } from "./ISegmentTree";
import isLeafNodeIndex from "./isLeafNodeIndex";

export default function getLeafOfSegmentTree<TItem>(tree: ISegmentTree<TItem>, index: number): TItem| null {
  return isLeafNodeIndex(tree, index)
    ? tree.leaves[getLeafIndexOfSegmentTree(tree, index)]
    : null;
}