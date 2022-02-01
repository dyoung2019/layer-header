// zero-index based
export default function getLeftNode(index: number) {
  return ((index + 1) << 1) - 1;
}