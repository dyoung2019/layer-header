export default function withinRange(
  minimumValue: number,
  o: number,
  v: number
) {
  // console.log(`kMin(${minimumValue}-${o}) <= kMax(${v}) `)
  const kMin = minimumValue - o;
  const kMax = v;
  return kMin <= kMax
}