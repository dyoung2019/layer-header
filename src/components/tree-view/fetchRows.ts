import { BranchInfo } from "../../common/BranchInfo";
import getBranchTotal from "./getBranchTotal";
import getVTreeOffset from "./getVTreeOffset";
import treeQuery from "./treeQuery";

export default function fetchRows(
  layers: LayerInfo[],
  segments: BranchInfo[], 
  size: number,
  rowIndex: number,
  rowHeight: number
) {
  const answer = treeQuery<BranchInfo[]>(segments, size, rowIndex, getBranchTotal);

  if (!answer)
    return [];

  const output: any[] = []
  // console.log('answer', answer)
  const [index, offset] = answer

  if (index !== -1) {
    let count = 0;

    let i = index;

    let first = true;
    const segmentSize = segments.length;

    while (i < segmentSize && count < rowHeight) {
      const segment = segments[i];

      const layerIndex = segment?.index;
      const propLimit = segment?.total;

      if (layerIndex === undefined) {
        console.log('ERROR: not a leaf level')
        break;
      }

      const layer = layers[layerIndex];

      const left = (first) ? offset : 0;
      
      const diff = Math.min(propLimit - left, propLimit, rowHeight - count);

      // loop thru
      if (diff > 0) {
        let drawn = 0;
        let k = (first)
          ? getVTreeOffset(layer, offset)
          : layer.vtreeOffset;

        for (; k < layer.vtree.length && drawn < diff; k += 1) {
          const visible = layer.vtree[k];

          if (visible === 1) {
            const propIndex = k - layer.vtreeOffset;
            const prop = layer.props[propIndex];
            output.push(prop);

            drawn += 1
          }
        }
      }
      first = false;

      count += diff;
      i += 1;
    }
  }

  return output;
}