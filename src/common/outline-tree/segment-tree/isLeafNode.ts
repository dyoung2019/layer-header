import type { SegmentTree } from "./SegmentTree";

export default function isLeafNode<TItem>(tree: SegmentTree<TItem>, i: number): boolean {
  return tree.branches.length >= i
}