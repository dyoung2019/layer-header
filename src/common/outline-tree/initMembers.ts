import type { PropertyCount } from "./doSummarize";
import { SegmentTree } from "./segment-tree/SegmentTree";

export default function initMembers() {
  return new SegmentTree<PropertyCount>((l) => l[1]);
}