/**
 * compute the next highest power of 2 of 32-bit
 * https://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
 * @param v integer
 * @returns number
 */
export default function roundToNextPowerOf2(v: number) {
  v--;
  v |= v >> 1;
  v |= v >> 2;
  v |= v >> 4;
  v |= v >> 8;
  v |= v >> 16;
  v++;

  return v
}