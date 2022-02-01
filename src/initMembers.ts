import type { PropertyCount } from "./common/hooks/doSummarize";
import { SegmentTree } from "./SegmentTree";

export default function initMembers() {
  return new SegmentTree<PropertyCount>((l) => l[1]);
}