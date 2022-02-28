import { ISegmentTree } from "./ISegmentTree";

export default function isLeafNodeIndex<TItem>(tree: ISegmentTree<TItem>, index: number) : boolean {
  return index >= tree.branches.length;
}