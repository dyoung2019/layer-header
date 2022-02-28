import { ISegmentTree } from "./ISegmentTree";

export default function getIndexOutsideOfSegmentTree<TItem>(tree: ISegmentTree<TItem>) {
  const lastValue = tree.branches.length - 1 + tree.leaves.length - 1;
  return lastValue + 1;
}