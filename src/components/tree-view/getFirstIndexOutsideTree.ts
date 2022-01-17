export default function getFirstIndexOutsideTree(
  level: number,
  size: number
) {
  const lastValue = level - 1 + size - 1;
  return lastValue + 1;
}