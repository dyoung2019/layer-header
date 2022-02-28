import { ISegmentTree } from "./ISegmentTree";

export default function getLeafIndexOfSegmentTree<TItem>(tree: ISegmentTree<TItem>, index: number): number {
  return index - tree.branches.length;
} 