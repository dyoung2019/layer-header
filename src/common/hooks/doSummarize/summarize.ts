import getRowHeight from "./getRowHeight";

const hasChildren = (node: LayerPropertyNode): boolean => {
  return node.queries.length > 0;
}

const collateChildren = (
  parent: LayerPropertyNode,
  totals: number[],
  nodes: LayerPropertyNode[],
  flags: LayerPropertyState[],
  storeTotal: (i: number, v: number) => number,
  buildLeaves: (i: number, c: number) => void
) => {
  let total = 1;
  for (let i = 0; i < parent.queries.length; i += 1) {
    const child = parent.queries[i]
    total += summarize(totals, nodes, flags, child, storeTotal, buildLeaves)
  }
  return total;
}

// build leaves table i.e. go thru in-fix recursion
export default function summarize(
  totals: number[],
  nodes: LayerPropertyNode[],
  flags: LayerPropertyState[],
  index: number,
  storeTotal: (i: number, v: number) => number,
  buildLeaves: (i: number, c: number) => void
): number {
  const parent = nodes[index];

  // if (parent.left === parent.right) {
  //   return storeTotal(index, getRowHeight(parent));
  // }

  if (hasChildren(parent)) {
    if (flags[index].isExpanded) {
      buildLeaves(index, 1);
      const total = collateChildren(parent, totals, nodes, flags, storeTotal, buildLeaves);
      return storeTotal(index, total);
    } else {
      const cost = parent.minimum
      buildLeaves(index, cost)
      return storeTotal(index, cost);
    }
  } else {
    const cost = getRowHeight(parent);
    buildLeaves(index, cost)
    return storeTotal(index, cost);
  }
}