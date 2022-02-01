import { createMemo, createSignal, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { GroupPropertySchema } from './common/GroupPropertySchema';
import { LayerPropertyFlags } from './common/LayerPropertyFlags';
import fetchRecords from './fetchRecords';
import initOutlineTree from './initOutlineTree';
import { LayerReference } from './LayerReference';

export default function () {
  const [schema] = createSignal<GroupPropertySchema>({
    groups: [
      {
        name: "0",
        depth: 0,
        maximum: 1,
        minimum: 1,
        queries: [1, 2]
      },
      {
        name: "1",
        maximum: 1,
        depth: 1,
        minimum: 1,
        queries: [3, 4, 5]
      },
      {
        name: "2",
        maximum: 7,
        depth: 1,
        minimum: 1,
        queries: [6, 7, 8]
      },
      {
        name: "3",
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "4",
        maximum: 1,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "5",
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "6",
        maximum: 5,
        depth: 2,
        minimum: 1,
        queries: [9, 10]
      },
      {
        name: "7",
        maximum: 3,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "8",
        maximum: 5,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "evening gowns",
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "sun dresses",
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

  const [inputs] = createSignal<LayerReference[]>([
    { index: 0, },
    { index: 1, },
    { index: 2, },
  ]);

  const rows = createMemo(() => {
    const outline = initOutlineTree(state.layers, inputs());
    // console.log('outline', outline)

    const records = fetchRecords(outline, state.layers, k(), size());
    // console.log('records', records)

    // console.log('rows.totals', totals)
    // console.log('records', records)
    // console.log('rows.leaves', leaves)
    // console.log('rows.hierarchy', branches)
    // console.log('rows.vOffset', vOffset)
    // console.log('rows.result', result)
    // return records;
    return records;
  })

  return (
    <div>
      <For each={rows()}>
        {(l) => <div>{l}</div>}
      </For>
    </div>
  )
}