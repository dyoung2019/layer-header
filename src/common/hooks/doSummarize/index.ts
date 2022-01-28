import summarize from "./summarize"

type PropertyCount = [index: number, count: number];

export default function doSummarize(
  nodes: LayerPropertyNode[],
  flags: LayerPropertyState[]
): [number[], PropertyCount[]] {
  let count = 0;
  const totals = new Array<number>(nodes.length)
  const storeTotal = (index: number, value: number) => {
    totals[index] = value;
    count += 1;
    return value;
  } 

  const leaves: Array<PropertyCount> = []
  const buildLeaves = (index: number, count: number) => {
    leaves.push([index, count])
  }

  summarize(totals, nodes, flags, 0, storeTotal, buildLeaves);
  return [totals, leaves]
}