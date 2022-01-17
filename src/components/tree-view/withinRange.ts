export default function withinRange(
  minimumValue: number,
  o: number,
  v: number
) {
  const kMin = minimumValue - o;
  const kMax = v;
  return kMin <= kMax
}