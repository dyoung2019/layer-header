import treeBuild from "../../treeBuild";
import { ISegmentTree } from "./ISegmentTree";

export default function fillSegmentTree<TItem>(tree: ISegmentTree<TItem>, inputs: Array<TItem>) {
  tree.leaves = inputs;
  tree.branches = treeBuild(tree.leaves, tree.getLeafCount);
}