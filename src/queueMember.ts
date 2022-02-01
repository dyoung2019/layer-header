import getLeftNode from "./common/hooks/getLeftNode";
import getRightNode from "./common/hooks/getRightNode";
import pushLeftMove from "./common/hooks/pushLeftMove";
import pushRightMove from "./common/hooks/pushRightMove";
import type { SegmentTree } from "./SegmentTree";
// import TreeStack from "./TreeStack";

function getLinks(index: number) {
  const leftNode = getLeftNode(index);
  const rightNode = getRightNode(index);

  return [leftNode, rightNode];
}

function getValues<TItem>(
  tree: SegmentTree<TItem>, 
  parent: number, 
  left: number, 
  right: number
): [boolean, number]  {
  const parentValue = tree.getNodeCount(parent);
  const lhsValue = tree.getNodeCount(left);
  const rhsValue = tree.getNodeCount(right);

  // console.log('gv', parentValue, lhsValue, rhsValue)
  const isInvalid = parentValue !== (lhsValue + rhsValue);
  return [isInvalid, lhsValue];
}

export function queueMember<TItem>(
  stack: any[],
  tree: SegmentTree<TItem>, 
  minimumValue: number,
  parent: number,
  offset: number
  ) {
  const [left, right] = getLinks(parent);
  // console.log('li', parent, left, right)
  const [isInvalid, lhsValue] = getValues(tree, parent, left, right);

  if (isInvalid)
    return 'error oops'
  
  pushRightMove(stack, right, offset, lhsValue);
  
  const kMin = minimumValue - offset;
  if (lhsValue >= kMin) {
    pushLeftMove(stack, left, offset);
  }
}