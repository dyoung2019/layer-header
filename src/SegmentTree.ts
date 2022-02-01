import treeBuild from "./common/hooks/treeBuild";

export class SegmentTree<TItem> {
  public branches: number[];
  public leaves: TItem[];
  private getLeafCount: (i: TItem) => number;

  constructor(counter: (i: TItem) => number) {
    this.branches = [];
    this.leaves = [];
    this.getLeafCount = counter;
  }

  public fill = (inputs: TItem[]) => {
    this.leaves = inputs;
    this.branches = treeBuild(this.leaves, this.getLeafCount);
  }

  // methods
  public isLeafNode = (index: number): boolean => {
    return index >= this.branches.length;
  }

  public getLeafLevel = (): number => {
    return this.branches.length;
  }

  public getLeaf(index: number) {
    return index - this.branches.length;
  }

  public getLeafByIndex = (index: number) => {
    return this.isLeafNode(index)
      ? this.leaves[this.getLeaf(index)]
      : null;
  }

  public getNodeCount = (index: number): number =>  {
    return this.isLeafNode(index)
    ? this.getLeafCount(this.leaves[this.getLeaf(index)])
    : this.branches[index];
  }

  public isEmpty = (): boolean =>  {
    return this.leaves.length === 0;
  }

  public getOutsideIndex = (): number => {
    const lastValue = this.branches.length - 1 + this.leaves.length - 1;
    return lastValue + 1;
  }
}
