import type { SegmentTree } from "./SegmentTree";

export default function getFirstIndexOutsideTree<TItem>(tree: SegmentTree<TItem>) {
  const lastValue = tree.branches.length - 1 + tree.leaves.length - 1;
  return lastValue + 1;
}