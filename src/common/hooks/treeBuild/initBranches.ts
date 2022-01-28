import treeCapacity from "./treeCapacity";

export default function initBranches(length: number) {
  const capacity = treeCapacity(length);
  const dest = new Array<number>(capacity);
  return dest;
}