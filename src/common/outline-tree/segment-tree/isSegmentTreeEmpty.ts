import { ISegmentTree } from "./ISegmentTree";

export default function isSegmentTreeEmpty<TItem>(tree: ISegmentTree<TItem>) : boolean {
  return tree.leaves.length === 0;
}