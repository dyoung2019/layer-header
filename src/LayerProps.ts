import { PropertyCount } from "./common/hooks/doSummarize";
import { SegmentTree } from "./SegmentTree";

export interface LayerProps {
  index: number,
  props: SegmentTree<PropertyCount>;
}