import pushMoveOn from "./pushMoveOn";

export default function pushRightMove(
  stack: any[],
  rightNode: number, 
  o: number, 
  lhs: number) {
  // const rightNode = getRightNode(i);
  pushMoveOn(stack, rightNode, o + lhs);
}