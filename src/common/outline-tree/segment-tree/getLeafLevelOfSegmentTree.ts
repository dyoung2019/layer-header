import { ISegmentTree } from "./ISegmentTree";

export default function getLeafLevelOfSegmentTree<TItem>(tree: ISegmentTree<TItem>) {
  return tree.branches.length;
}