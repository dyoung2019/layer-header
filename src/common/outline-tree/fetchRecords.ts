import { LayerGroupInfo } from "./LayerGroupInfo";
import { LayerProps } from "./LayerProps";
import memberQuery from "./memberQuery";
import { OutlineTree } from "./OutlineTree";
import PropertyRecord from "./PropertyRecord";

function getTreeOffset(info: LayerProps, k: number): number {
  const query = memberQuery(info.props, k);
  return (!!query) ? info.props.getLeafIndex(query[0]) : 0;
}

export default function fetchRecords(
  outline: OutlineTree,
  layers: LayerGroupInfo[],
  // size: number,
  rowIndex: number,
  rowHeight: number
): PropertyRecord[] {
  // top-level query on layers first
  const topLevel = memberQuery(outline, rowIndex);

  if (!topLevel)
    return [];
 
  // console.log('topLevel', topLevel)
  const [layerPosition, k] = topLevel;

  // const isEndOfRecords = () => {
  //   return (layerPosition === -1 || outline.getOutsideIndex() === layerPosition);
  // }

  // if (isEndOfRecords()) {
  //   console.log('isEndOfRecords')
  //   return [];
  // }

  // const info = outline.getLeafByIndex(layerPosition)
  // console.log('info', info)
  // if (!info) 
  //   return [];

  


  // // query on 
  // const query = memberQuery(info.props, k);
  
  // if (!query) 
  //   return [];

  // // const layer = layers[info.index];

  // console.log('query', query)

  const output: PropertyRecord[] = []
  // // // console.log('answer', answer)
  // const [index, offset] = query

  // const isEndOfLayer = () => {
  //   return (index === -1 || info.props.getOutsideIndex() === index);
  // }

  // if (isEndOfLayer()) {
  //   return [];
  // }

  if (layerPosition !== -1) {
    let count = 0;

    let li = outline.getLeafIndex(layerPosition);

    let first = true;
    const segmentSize = outline.leaves.length;

    // console.log('segmentSize', li, segmentSize, count, rowHeight)
    while (li < segmentSize && count < rowHeight) {
      const segment = outline.leaves[li];

      if (!segment) {
        console.log('ERROR: not a layer')
        break;
      }

      const layerIndex = segment.index;
      const propLimit = segment.props.branches[0]
  //     const propLimit = segment?.total;

      if (layerIndex === undefined) {
        console.log('ERROR: not a leaf level')
        break;
      }



      const left = (first) ? k : 0;
      const diff = Math.min(propLimit - left, propLimit, rowHeight - count);
      // console.log('propLimit', diff, propLimit, left, rowHeight, count)

      // loop thru
      if (diff > 0) {
        let drawn = 0;
        const info = outline.leaves[li]
        let lp: number = (first)
          ? getTreeOffset(info, k)
          : 0;

        const propsLength = info.props.leaves.length;
        // console.log('j', lp, propsLength)
        for (; lp < propsLength && drawn < diff; lp += 1) {
          const layer = layers[info.index];
          
          // const visible = layer.vtree[j];

          const [propIndex, propCount] = info.props.leaves[lp]
          const group = layer.viz.schema.groups[propIndex]
          // if (visible === 1) {
          //   const propIndex = j - layer.vtreeOffset;

          for (let lsi = 0; lsi < propCount && drawn < diff; lsi += 1) {
            const prop: PropertyRecord = {
              layerIndex: layerIndex,
              layerOrdinal: li,
              depth: group.depth,
              // name: layer.name,
              group: group.name,
              propIndex,
              subIndex: lsi,
            };
            //`${"=".repeat(group.depth * 2)}${group.depth === 0 ? `[${layer.name}]` : ''} Prop ${propIndex}.${lsi} - (${lp})`;
            // console.log('p', prop)
            output.push(prop);
            drawn += 1
          }
        }
      }
      first = false;
      // console.log('diff', diff)
      count += diff;
      li += 1;
    }
  }
  // console.log('done')
  // const output: any[] = [];
  // for (let i = rowIndex; i < rowIndex + rowHeight; i += 1) {
  //   output.push(i);
  // }
  return output;
}