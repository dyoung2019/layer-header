import { PropertyCount } from "./doSummarize/PropertyCount";
import { ISegmentTree } from "./segment-tree/ISegmentTree";

export interface LayerProps {
  index: number,
  props: ISegmentTree<PropertyCount>;
}