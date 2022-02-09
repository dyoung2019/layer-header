import hasMovesLeftOn from "../hasMovesLeftOn";
import peekOn from "../peekOn";
import pushFirstMoveOn from "../pushFirstMoveOn";
import withinRange from "../hooks/withinRange";
import { queueMember } from "./segment-tree/queueMember";
import type { SegmentTree } from "./segment-tree/SegmentTree";

const getSubIndex = (minimumValue: number, offset: number) => {
  return minimumValue - offset - 1;
}

export default function memberQuery<TItem>(
  members: SegmentTree<TItem>,
  k: number
) {
  if (members.isEmpty()) {
    return 0;
  }

  const callStack: any[] = [];
  
  const minimumValue = k + 1;

  // const leafLevel = members.getLeafLevel();

  let validIndexFound = null;
  
  // console.log(callStack)
  pushFirstMoveOn(callStack);
  while (hasMovesLeftOn(callStack)) {
    const [index, offset] = peekOn(callStack);
    
    const count = members.getNodeCount(index)
    // console.log(index, offset, count)

    if (withinRange(minimumValue, offset, count)) {
      if (members.isLeafNode(index)) {
        return [index, getSubIndex(minimumValue, offset)];
      }

      const error = queueMember(
        callStack, 
        members, 
        minimumValue, 
        index, 
        offset);
      if (!!error) {
        return [-1, 0, error]
      }

      validIndexFound = index;
    } else {
      callStack.pop();
    }
    // console.log('callStack', callStack)
  }

  if (validIndexFound !== null) {
    return [validIndexFound, 0];
  } else {
    return [members.getOutsideIndex(), 0];
  }
}
