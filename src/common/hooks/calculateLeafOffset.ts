import roundToNextPowerOf2 from "./roundToNextPowerOf2";

export default function calculateLeafOffset(len: number) {
  const branchLevel = len >> 1; // divide by 2
  return roundToNextPowerOf2(branchLevel)
}