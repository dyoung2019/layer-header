export default function calculateParentNode(i: number) {
  return ((i + 1) >> 1) - 1;
}