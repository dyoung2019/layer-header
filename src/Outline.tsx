import { createSelector, createSignal, For } from "solid-js";
import LayerHeader from "./LayerHeader";
import { LayerInfo } from "./LayerInfo";

export default function(props: {
  layers: LayerInfo[]
}) {
  const [selectedId, setSelectedId] = createSignal<number>(-1)
  const isSelected = createSelector(selectedId);

  return (
    <ul>
      <For each={props.layers}>
        {(layer) => <li onclick={() => setSelectedId(layer.index)}>
          <LayerHeader layer={layer} isSelected={isSelected(layer.index)}></LayerHeader>
        </li>}
      </For>
    </ul>
  );
}