
import { PropertyCount } from "./doSummarize/PropertyCount";
import initSegmentTree from "./segment-tree/initSegmentTree";
import { ISegmentTree } from "./segment-tree/ISegmentTree";

export default function initMembers(): ISegmentTree<PropertyCount> {
  return initSegmentTree<PropertyCount>(member => (!!member) ? member[1] : 0);
}