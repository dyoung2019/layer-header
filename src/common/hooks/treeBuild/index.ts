import sumBranches from "./sumBranches";
import addSourcePairs from "./addSourcePairs";
import initRanges from "./initRanges";
import initBranches from "./initBranches";

export default function treeBuild<TItem>(
  source: TItem[],
  getCount: (item: TItem) => number
) {
  const output = initBranches(source.length);

  const [
    [leftLeaf, rightLeaf],
    ...branches
  ] = initRanges(output.length);

  addSourcePairs(output, source, leftLeaf, rightLeaf, getCount);

  sumBranches(output, branches);
  // console.log('dest', dest)
  return output;
}