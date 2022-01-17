import getVTreeTotal from "./getVTreeTotal";
import treeQuery from "./treeQuery";

export default function getVTreeOffset(l: any, x: number): number {
  const view = treeQuery<number[]>(l.vtree, l.props.length, x, getVTreeTotal);
  return (!!view) ? view[0] : l.vOffset
}