export default function isLeafNode(value: number, level: number) {
  const firstLeaf = level - 1;
  return (value >= firstLeaf);
}