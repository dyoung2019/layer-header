import { createMemo, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { LayerPropertyFlags } from './common/outline-tree/LayerPropertyFlags';
import Outline from './components/outline';
import fetchRecords from './common/outline-tree/fetchRecords';
import initOutlineTree from './common/outline-tree/initOutlineTree';
import { LayerReference } from './common/outline-tree/LayerReference';
import { LayerPropertyKeys } from './common/outline-tree/LayerPropertyKeys';
import { RowType } from './common/outline-tree/RowType';

export default function () {
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
                isExpanded: false, // 1
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

  const [inputs] = createSignal<LayerReference[]>([
    // { index: 2, },
    { index: 0, },
    // { index: 1, },
  ]);

  const handleRefresh = () => {
    // update branch
  }

  const outline = createMemo(() => initOutlineTree(repo.layers, inputs()));

  const [selectedId, setSelectedId] = createSignal<number>(-1)

  const handleLayerChange = (index: number, field: LayerPropertyKeys, value: any) => {
    setRepo('layers', index, field, value);
  }

  const rows = createMemo(() => fetchRecords(outline(), repo.layers, k(), size()));

  return (
    <Outline
      rows={rows()}
      layers={repo.layers}
      selectedId={selectedId} 
      setSelectedId={setSelectedId}
      onLayerChange={handleLayerChange}
      onRefresh={handleRefresh}
      />
    );
}