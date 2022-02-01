import { GroupPropertySchema } from "../../GroupPropertySchema";
import { GroupPropertyState } from "../../GroupPropertyState";
import getRowHeight from "./getRowHeight";

const hasChildren = (node: GroupPropertyNode): boolean => {
  return node.queries.length > 0;
}

const collateChildren = (
  parent: GroupPropertyNode,
  totals: number[],
  schema: GroupPropertySchema,
  state: GroupPropertyState,
  storeTotal: (i: number, v: number) => number,
  buildLeaves: (i: number, c: number) => void
) => {
  let total = 1;
  for (let i = 0; i < parent.queries.length; i += 1) {
    const child = parent.queries[i]
    total += summarize(totals, schema, state, child, storeTotal, buildLeaves)
  }
  return total;
}

// build leaves table i.e. go thru in-fix recursion
export default function summarize(
  totals: number[],
  schema: GroupPropertySchema,
  state: GroupPropertyState,
  index: number,
  storeTotal: (i: number, v: number) => number,
  buildLeaves: (i: number, c: number) => void
): number {
  const parent = schema.groups[index];

  // if (parent.left === parent.right) {
  //   return storeTotal(index, getRowHeight(parent));
  // }

  if (hasChildren(parent)) {
    if (state.nodes[index].isExpanded) {
      buildLeaves(index, 1);
      const total = collateChildren(parent, totals, schema, state, storeTotal, buildLeaves);
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