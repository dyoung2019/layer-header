import peekOn from "./common/peekOn";
import pushLeftMove from "./common/pushLeftMove";
import pushRightMove from "./common/pushRightMove";

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