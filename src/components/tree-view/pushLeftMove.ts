import pushMoveOn from "./pushMoveOn";

export default function pushLeftMove(
  stack: any[],
  lhsIndex: number,
  o: number) {
  pushMoveOn(stack, lhsIndex, o);
}