import getLeftNode from "../../common/getLeftNode";
import getRightNode from "../../common/getRightNode";
import pushLeftMove from "../../common/pushLeftMove";
import pushRightMove from "../../common/pushRightMove";

export default function pushChildren<TSegment>(
  stack: any[], 
  tree: TSegment, 
  minimumValue: number,
  i: number, 
  o: number,
  getTotal: (s: TSegment, i: number) => number
) : any | undefined {
  const leftNode = getLeftNode(i);

  const lhsValue = getTotal(tree, leftNode);

  const rightNode = getRightNode(i);
  const rhsValue = getTotal(tree, rightNode);

  const parentValue = getTotal(tree, i);

  if (parentValue !== (lhsValue + rhsValue))
    return 'error'
  
  pushRightMove(stack, rightNode, o, lhsValue);
  
  const kMin = minimumValue - o;
  if (lhsValue >= kMin) {
    pushLeftMove(stack, leftNode, o);
  }

  // return undefined
}