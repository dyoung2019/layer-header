import getLeftNode from "../../getLeftNode";
import getRightNode from "../../getRightNode";
import pushLeftMove from "../../pushLeftMove";
import pushRightMove from "../../pushRightMove";
import getNodeCountOfSegmentTree from "./getNodeCountOfSegmentTree";
import { ISegmentTree } from "./ISegmentTree";
// import type { SegmentTree } from "./SegmentTree";
// import TreeStack from "./TreeStack";

function getLinks(index: number) {
  const leftNode = getLeftNode(index);
  const rightNode = getRightNode(index);

  return [leftNode, rightNode];
}

function getValues<TItem>(
  tree: ISegmentTree<TItem>, 
  parent: number, 
  left: number, 
  right: number
): [boolean, number]  {
  const parentValue = getNodeCountOfSegmentTree(tree, parent);
  const lhsValue = getNodeCountOfSegmentTree(tree, left);
  const rhsValue = getNodeCountOfSegmentTree(tree, right);

  // console.log('gv', parentValue, lhsValue, rhsValue)
  const isInvalid = parentValue !== (lhsValue + rhsValue);
  return [isInvalid, lhsValue];
}

export function queueMember<TItem>(
  stack: any[],
  tree: ISegmentTree<TItem>, 
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