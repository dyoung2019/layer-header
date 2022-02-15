import { GroupPropertySchema } from "../GroupPropertySchema";
import { GroupPropertyState } from "../GroupPropertyState";
import { GroupPropertyNode } from "../GroupPropertyNode";
import getRowHeight from "./getRowHeight";
import { getNoOfSubProperties } from "../../../getNoOfSubProperties";

const hasChildren = (node: GroupPropertyNode): boolean => {
  return node.queries.length > 0;
}

const collateChildren = (
  is3DLayer: boolean,
  parent: GroupPropertyNode,
  schema: GroupPropertySchema,
  state: GroupPropertyState,
  // storeTotal: (i: number, v: number) => number,
  buildLeaves: (i: number, c: number) => void
) => {
  let total = 1;
  for (let i = 0; i < parent.queries.length; i += 1) {
    const child = parent.queries[i]
    total += summarize(is3DLayer, schema, state, child, buildLeaves)
  }
  return total;
}

// build leaves table i.e. go thru in-fix recursion
export default function summarize(
  is3DLayer: boolean,
  schema: GroupPropertySchema,
  state: GroupPropertyState,
  index: number,
  // storeTotal: (i: number, v: number) => number,
  buildLeaves: (i: number, c: number) => void
): number {
  const parent = schema.groups[index];

  // if (parent.left === parent.right) {
  //   return storeTotal(index, getRowHeight(parent));
  // }

  if (hasChildren(parent)) {
    if (state.nodes[index].isExpanded) {
      buildLeaves(index, 1);
      const total = collateChildren(is3DLayer, parent, schema, state, buildLeaves);
      return total;
    } else {
      const cost = parent.minimum;
      buildLeaves(index, cost);
      return cost;
    }
  } else {
    const node = state.nodes[index];
    const cost = parent.minimum;
    const noOfSubProperties = getNoOfSubProperties(is3DLayer, parent.type, node.isExpanded)
    const fullHeight = cost * noOfSubProperties;
    buildLeaves(index, fullHeight)
    return fullHeight;
  }
}