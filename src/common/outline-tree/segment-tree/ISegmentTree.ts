export interface ISegmentTree<TItem> {
  branches: number[];
  leaves: Array<TItem>;
  getLeafCount: (i: TItem) => number;
}