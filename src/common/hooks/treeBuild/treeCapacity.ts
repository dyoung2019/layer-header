export default function treeCapacity(length: number): number {
  if (length === 1) return 1;
  // if (length === 1) return 1;

  const g = Math.ceil(Math.log2(length))
  const h = 1 << g
  return h - 1
}