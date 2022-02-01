import getFirstIndexOutsideTree from "./getFirstIndexOutsideTree";
import hasMovesLeftOn from "../../common/hooks/hasMovesLeftOn";
import isLeafNode from "./isLeafNode";
import peekOn from "../../common/hooks/peekOn";
import pushChildren from "./pushChildren";
import pushFirstMoveOn from "../../common/hooks/pushFirstMoveOn";
import roundToNextPowerOf2 from "../../common/hooks/roundToNextPowerOf2";
import withinRange from "../../common/hooks/withinRange";

export default function treeQuery<TArray>(
  tree: TArray,
  size: number,
  k: number,
  getTotal: (s: TArray, i: number) => number
) {
  if (size === 0) {
    return 0;
  }

  const callStack: any[] = [];
  
  const minimumValue = k + 1;

  const leafLevel = roundToNextPowerOf2(size);

  let validIndexFound = null;
  
  pushFirstMoveOn(callStack);
  while (hasMovesLeftOn(callStack)) {
    const [index, offset] = peekOn(callStack);

    if (withinRange(minimumValue, offset, getTotal(tree, index))) {
      if (isLeafNode(index, leafLevel)) {
        return [index, minimumValue - offset - 1];
      }

      const error = pushChildren(callStack, tree, minimumValue, index, offset, getTotal);
      if (!!error) {
        return [-1, 0, 'error found']
      }

      validIndexFound = index;
    } else {
      callStack.pop();
    }
  }

  if (validIndexFound !== null) {
    return [validIndexFound, 0];
  } else {
    return [getFirstIndexOutsideTree(leafLevel, size), 0];
  }
}
