import { BranchInfo } from "../../BranchInfo";
import { SegmentTree } from "./SegmentTree";

const getLayerCount = (b: BranchInfo): number => {
  return b.total;
}

export default function initLayerTree() {
  return new SegmentTree<BranchInfo>(getLayerCount);
} 