import { createMemo, createSignal, For } from "solid-js"
import fetchRows from "./fetchRows";
import getVTreeOffset from "./getVTreeOffset";
import treeQuery from "./treeQuery";

export default function () {
  const [rowIndex, setRowIndex] = createSignal<number>(1);
  const [size] = createSignal(4);
  const [rowHeight] = createSignal(5)
  const [segments] = createSignal<BranchInfo[]>([
    { total: 6 },
    { total: 3 },
    { total: 3 },
    // LEAVES
    { total: 2, index: 0 },
    { total: 1, index: 1 },
    { total: 0, index: 2 },
    { total: 3, index: 3 }
  ]);
  const [layers] = createSignal<LayerInfo[]>([
    { props: ['A', 'B', 'C', 'D'], vtree: [2, 0, 2, 0, 0, 1, 1], vtreeOffset: 3 },
    { props: ['E', 'F', 'G', 'H'], vtree: [1, 1, 0, 0, 1, 0, 0], vtreeOffset: 3 },
    { props: ['I', 'J', 'K', 'L'], vtree: [0, 0, 0, 0, 0, 0, 0], vtreeOffset: 3 },
    { props: ['M', 'N', 'O', 'P'], vtree: [3, 1, 2, 1, 0, 1, 1], vtreeOffset: 3 },
  ]);

  const rows = createMemo(() => {
    return fetchRows(layers(), segments(), size(), rowIndex(), rowHeight());
  })

  let inputRef: HTMLInputElement | undefined;
  const handleRowChange = (e: any) => {
    if (!!inputRef) {
      setRowIndex(Number(inputRef.value));
    }
  }

  return (
    <div>
      <label htmlFor="rowIndex">Row Index:</label>
      <input ref={inputRef} id="rowIndex"
        type="number"
        value={rowIndex()}
        placeholder="row index?"
      />
      <button onClick={handleRowChange}>Update</button>
      <For each={rows()} fallback={<div>Loading...</div>}>
        {(item) => <div>{JSON.stringify(item)}</div>}
      </For>
    </div>
  )
}