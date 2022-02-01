import peekOn from "./common/hooks/peekOn";
import pushLeftMove from "./common/hooks/pushLeftMove";
import pushRightMove from "./common/hooks/pushRightMove";

type TreeFrame = [index: number, offset: number];

// export default class TreeStack {
//   stack: TreeFrame[];
//   constructor() {
//     this.stack = [];
//   }

//   public init() {
//     this.stack = [];
//     this.stack.push([0, 0]);
//   }

//   public hasMoves() {
//     return this.stack.length >= 0;
//   }

//   public pushRight(index: number, offset: number, left: number) {
//     pushRightMove(this.stack, index, offset, left);
//   }

//   public pushLeft(index: number, offset:number) {
//     pushLeftMove(this.stack, index, offset);
//   }

//   public peek() {
//     return this.stack[this.stack.length - 1];
//   }

//   public pop() {
//     return this.stack.pop();
//   }
// }