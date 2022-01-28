export default function addSourcePairs<TItem>(
  dst: number[],
  src: TItem[], 
  left: number,
  right: number,
  getCount: (item: TItem) => number
) {
  const noOfSamples = src.length;
  // console.log('firstStep', firstStep)
  //sample and put pairs into dest
  // const [start, end] = pairs;
  for (let i = left, leftIndex = 0; i < right; i += 1) {
    // const leftIndex = sampleIndex;
    const rightIndex = leftIndex + 1;
    const leftValue = (leftIndex < noOfSamples) 
      ? getCount(src[leftIndex])
      : 0;
    const rightValue = (rightIndex < noOfSamples) 
      ? getCount(src[rightIndex])
      : 0;
    // console.log('l + r', left, right)
    // const sum = leftValue + rightValue;
    // store in first 
    // console.log('leaves', offset + 2 * j, sum)
    dst[i] = leftValue + rightValue;
    leftIndex += 2;
  }
}