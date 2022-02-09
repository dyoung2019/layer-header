import getLeftNode from "../getLeftNode";
import { SegmentTree } from "../outline-tree/segment-tree/SegmentTree";
import calculateParentNode from "../getParentNode";

function toTreeIndex<TData>(view: SegmentTree<TData>, i: number) {
  return view.getLeafLevel() + i;
}

function setNodeValue<TData>(
    view: SegmentTree<TData>,
    i: number, 
    value: number,
    setLeafValue: (d: TData, v: number) => void
  ) {
  const noOfBranches = view.branches.length;
  if (i < noOfBranches) {
    view.branches[i] = value;
  } else {
    setLeafValue(view.leaves[i - noOfBranches], value);
  }
}

export default function treeUpdate<TData>(view: SegmentTree<TData>, i: number, value: number) {
  const output: Record<number, number> = {};
  
  // leaf index -> tree index
  let lastValue = value
  let currentNode = toTreeIndex(view, i);
  output[currentNode] = value;
  do {
    const parentNode = calculateParentNode(currentNode);
    // const oldCount = view.getNodeCount(parent);
    const leftNode = getLeftNode(parentNode);
    const rightNode = leftNode + 1;
    // const lastChild = lastValue;

    // const leftMatched: boolean = leftNode === currentNode;
    const otherValue: number = (leftNode === currentNode)
      ? (view.getNodeCount(rightNode) || 0)
      : (view.getNodeCount(leftNode) || 0);
    // const rightValue: number = leftMatched
    //   ? (view.getNodeCount(rightNode) || 0)
    //   : lastValue;
    // console.log('left', left, leftValue);
    // console.log('right', right, rightValue);
    // const newCount = leftValue + rightValue;
    lastValue += otherValue;
    
    output[parentNode] = lastValue;

    // setNodeValue(parent, newCount);
    currentNode = parentNode;
  } while (currentNode > 0);
  // divide by 2
  return output;
}