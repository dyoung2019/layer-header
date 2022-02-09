import { PropertyCount } from "./doSummarize";
import { SegmentTree } from "./segment-tree/SegmentTree";

export interface LayerProps {
  index: number,
  props: SegmentTree<PropertyCount>;
}