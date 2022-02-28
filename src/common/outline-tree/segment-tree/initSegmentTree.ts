import type { ISegmentTree } from "./ISegmentTree";

export default function initSegmentTree<TItem>(counter: (i: TItem) => number): ISegmentTree<TItem> {
  return {
    branches: [],
    leaves: [],
    getLeafCount: counter,
  }
}