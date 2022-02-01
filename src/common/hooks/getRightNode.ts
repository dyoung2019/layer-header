import getLeftNode from "./getLeftNode";

export default function getRightNode(index: number) {
  return getLeftNode(index) + 1;
}