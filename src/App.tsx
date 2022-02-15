import { createEffect, createMemo, createSignal, For, onMount, Show, Switch } from 'solid-js';
import { createStore } from 'solid-js/store';
import { LayerGroupInfo } from './common/outline-tree/LayerGroupInfo';
import { GroupPropertySchema } from './common/outline-tree/GroupPropertySchema';
import { LayerPropertyFlags } from './common/outline-tree/LayerPropertyFlags';
import Outline from './components/outline/Outline';
import fetchRecords from './common/outline-tree/fetchRecords';
import initOutlineTree from './common/outline-tree/initOutlineTree';
import { LayerReference } from './common/outline-tree/LayerReference';
import { SegmentTree } from './common/outline-tree/segment-tree/SegmentTree';
import treeUpdate from './common/treeUpdate/treeUpdate';
import { LayerPropertyKeys } from './common/outline-tree/LayerPropertyKeys';
import { RowType } from './common/outline-tree/RowType';
import PropertyRecord from './common/outline-tree/PropertyRecord';
import { OutlineTree } from './common/outline-tree/OutlineTree';

export default function () {
  const [schema] = createSignal<GroupPropertySchema>({
    groups: [
      {
        name: "0",
        type: RowType.Branch,
        depth: 0,
        maximum: 1,
        minimum: 1,
        queries: [1, 2]
      },
      {
        name: "1",
        type: RowType.Branch,
        maximum: 1,
        depth: 1,
        minimum: 1,
        queries: [3, 4, 5]
      },
      {
        name: "2",
        type: RowType.Branch,
        maximum: 7,
        depth: 1,
        minimum: 1,
        queries: [6, 7, 8]
      },
      {
        name: "3",
        type: RowType.Position,
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "4",
        type: RowType.Rotation,
        maximum: 1,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "5",
        type: RowType.Scale,
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "6",
        type: RowType.Branch,
        maximum: 5,
        depth: 2,
        minimum: 1,
        queries: [9, 10]
      },
      {
        name: "7",
        type: RowType.Skew,
        maximum: 3,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "8",
        type: RowType.Position,
        maximum: 5,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "evening gowns",
        type: RowType.Position,
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "sun dresses",
        type: RowType.Anchor,
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
    ]
  });

  const [state, setState] = createStore({
    layers: [
      {
        index: 1,
        name: "Solid Layer 1",
        videoOn: true,
        audioOn: false,
        soloOn: false,
        isLocked: false,
        collapseTransforms: true,
        isShy: false,
        is3DLayer: false,
        labelColor: 'green',
        viz: {
          singleFlag: LayerPropertyFlags.None,
          selectedFlags: LayerPropertyFlags.None,
          schema: schema(),
          state: {
            nodes: [
              {
                isExpanded: true, // 0
              },
              {
                isExpanded: false, // 1
              },
              {
                isExpanded: true, // 2
              },
              {
                isExpanded: false, // 3
              },
              {
                isExpanded: false, // 4
              },
              {
                isExpanded: false, // 5
              },
              {
                isExpanded: false, // 6
              },
              {
                isExpanded: false, // 7
              },
              {
                isExpanded: false, // 8
              },
              {
                isExpanded: false, // 9
              },
              {
                isExpanded: false, // 10
              },

            ],
          }
        },
      },
      {
        index: 2,
        name: "Solid Layer 2",
        videoOn: true,
        audioOn: false,
        soloOn: false,
        isLocked: false,
        collapseTransforms: true,
        isShy: false,
        is3DLayer: false,
        labelColor: 'pink',
        viz: {
          singleFlag: LayerPropertyFlags.None,
          selectedFlags: LayerPropertyFlags.None,
          schema: schema(),
          state: {
            nodes: [
              {
                isExpanded: true, // 0
              },
              {
                isExpanded: false, // 1
              },
              {
                isExpanded: true, // 2
              },
              {
                isExpanded: false, // 3
              },
              {
                isExpanded: false, // 4
              },
              {
                isExpanded: false, // 5
              },
              {
                isExpanded: false, // 6
              },
              {
                isExpanded: false, // 7
              },
              {
                isExpanded: false, // 8
              },
              {
                isExpanded: false, // 9
              },
              {
                isExpanded: false, // 10
              },

            ],
          }
        }
      },
      {
        index: 3,
        name: "Solid Layer 3",
        videoOn: true,
        audioOn: false,
        soloOn: false,
        isLocked: false,
        collapseTransforms: true,
        isShy: false,
        is3DLayer: false,
        labelColor: 'pink',
        viz: {
          singleFlag: LayerPropertyFlags.None,
          selectedFlags: LayerPropertyFlags.None,
          schema: schema(),
          state: {
            nodes: [
              {
                isExpanded: true, // 0
              },
              {
                isExpanded: false, // 1
              },
              {
                isExpanded: true, // 2
              },
              {
                isExpanded: false, // 3
              },
              {
                isExpanded: false, // 4
              },
              {
                isExpanded: false, // 5
              },
              {
                isExpanded: false, // 6
              },
              {
                isExpanded: false, // 7
              },
              {
                isExpanded: false, // 8
              },
              {
                isExpanded: false, // 9
              },
              {
                isExpanded: false, // 10
              },

            ],
          }
        }
      },
    ]
  })

  // const [totals] = createSignal([1]);
  const [k] = createSignal<number>(0);
  const [size] = createSignal<number>(30);

  const [repo, setRepo] = createStore({
    layers: [
      {
        index: 3,
        name: "Solid Layer 4",
        videoOn: true,
        audioOn: false,
        soloOn: false,
        isLocked: false,
        collapseTransforms: true,
        isShy: false,
        is3DLayer: true,
        labelColor: 'pink',
        viz: {
          singleFlag: LayerPropertyFlags.None,
          selectedFlags: LayerPropertyFlags.None,
          schema: {
            groups: [
              {
                name: "header",
                type: RowType.Branch,
                depth: 0,
                maximum: 1,
                minimum: 1,
                queries: [1]
              },
              {
                name: "transform",
                type: RowType.Branch,
                depth: 1,
                maximum: 3,
                minimum: 1,
                queries: [2, 3, 4]
              },   
              {
                name: "position",
                type: RowType.Position,
                depth: 2,
                maximum: 3,
                minimum: 1,
                queries: []
              },
              {
                name: "rotation",
                type: RowType.Rotation,
                depth: 2,
                maximum: 3,
                minimum: 1,
                queries: []
              },
              {
                name: "scale",
                type: RowType.Scale,
                depth: 2,
                maximum: 1,
                minimum: 1,
                queries: []
              },           
            ]
          },
          state: {
            nodes: [
              {
                isExpanded: true, // 0
                separate: false,
              },
              {
                isExpanded: true, // 1
                separate: false,
              },
              {
                isExpanded: true, // 2
                separate: true,
              },
              {
                isExpanded: true, // 3
                separate: false,
              },
              {
                isExpanded: true, // 4
                separate: false,
              },
            ]
          }
        }
      },   
    ],
  })

  // onMount(() => {
  //   const states = [1, 2, 2, 4, 3]
  //   const view = new SegmentTree<number>((a:number) => a);
  //   view.fill(states);

  //   console.log('view.branches', view.branches);
  //   console.log('view.leaves', view.leaves);

  //   const getParent = (i: number) => {
  //     return ((i + 1) >> 1) - 1;
  //   } 

  //   const toTreeIndex = (i: number) => {
  //     return view.branches.length + i;
  //   }

  //   const getLeftChild = (p: number) => {
  //     return ((p + 1) << 1) - 1;
  //   }

  //   const ceiling = view.branches.length + view.leaves.length;
  //   const getNodeValue = (i: number) => {
  //     return (i <= ceiling) 
  //         ? view.getNodeCount(i)
  //         : 0;
  //   }

  //   const setNodeValue = (i: number, value: number) => {
  //     const noOfBranches = view.branches.length;
  //     if (i < noOfBranches) {
  //       view.branches[i] = value;
  //     } else {
  //       view.leaves[i - noOfBranches] = value;
  //     }
  //   }

  //   const pickUpdate = (i: number, value: number) => {
  //     const output: Record<number, number> = {};
  //     output[toTreeIndex(i)] = value;

  //     // leaf index -> tree index
  //     let lastValue = value
  //     let current = toTreeIndex(i);
  //     do {
  //       const parent = getParent(current);
  //       // const oldCount = view.getNodeCount(parent);
  //       const left = getLeftChild(parent);
  //       const right = left + 1;
  //       // const lastChild = lastValue;

  //       const leftMatched: boolean = left === current;
  //       const leftValue: number = leftMatched
  //           ? lastValue
  //           : getNodeValue(left);
  //       const rightValue: number = leftMatched
  //           ? getNodeValue(right)
  //           : lastValue;

  //       const newCount = leftValue + rightValue;
  //       lastValue = newCount;

  //       output[parent] = newCount;
  //       // console.log('update', parent, newCount);
  //       // setNodeValue(parent, newCount);
  //       current = parent;
  //     } while (current > 0);
  //     // divide by 2
  //     return output;
  //   }

  //   const leafValue = 0;
  //   const leafIndex = 2;

  //   const module = treeUpdate(view, leafIndex, leafValue);
  //   const original = pickUpdate(leafIndex, leafValue);
  //   console.log('module', module);
  //   console.log('original', original);
  //   // console.log('view.leaves', view.leaves);
  // })

  const [inputs] = createSignal<LayerReference[]>([
    // { index: 2, },
    { index: 0, },
    // { index: 1, },
  ]);

  const outline = createMemo(() => initOutlineTree(repo.layers, inputs()));

  const [selectedId, setSelectedId] = createSignal<number>(-1)

  const handleLayerChange = (index: number, field: LayerPropertyKeys, value: any) => {
    console.log(field, value)
    setRepo('layers', index, field, value);
  }

  const rows = createMemo(() => fetchRecords(outline(), repo.layers, k(), size()));

  // const [rows, setRows] = createSignal<PropertyRecord[]>([]);

  // createEffect(() => {
  //   setOutline(initOutlineTree(repo.layers, inputs()));
  // })

  // createEffect(() => {
  //   console.log(repo.layers)
  //   setRows(fetchRecords(outline(), repo.layers, k(), size()));
  // })

  return (
    <div>
      <Outline
        rows={rows()}
        layers={repo.layers}
        selectedId={selectedId} 
        setSelectedId={setSelectedId}
        onLayerChange={handleLayerChange}
      />

      {/* <For each={rows()}>
        {
          (l) => <div>{JSON.stringify(l)}</div>
        }
      </For> */}
      {/* /* <For each={rows()}>
        {(l) =>
          <Show when={}></Show>
      //         (s,i) => <div>
      //           <input id={"slot" + i} type="checkbox" checked={s} onChange={() => setRepo('slots', i(), !s)}></input>
      //           <label for="i">slot{i} - {'xyz'.slice(0, dims())}</label>
      //           <Show when={s}>
      //             <For each={'xyz'.slice(0, dims()).split('')}>
      //               {l => <div>Pos {l}</div>}
      //             </For>
      //           </Show>
      //         </div>
      //       }
      // </For>
      </For>
      */}
    </div>
  )
}