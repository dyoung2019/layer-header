export default function sumBranches(dst: any[], ranges: any[]) {
  ranges.forEach(branch => {
    const [bstart, bend] = branch;

    // console.log('offset', offset, span);
    for (let i = bstart; i < bend; i += 1) {
      const leftIndex = (i * 2) + 1;
      // const rightIndex = leftIndex + 1;
      const leftValue = dst[leftIndex];
      const rightValue = dst[leftIndex + 1];
      const total = leftValue +  rightValue;
      // console.log(`branches[${i}]: ${total} = ${leftIndex}, ${rightIndex}`)
      dst[i] = total;
    }
  })
}