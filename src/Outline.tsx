import { Accessor, createSelector, createSignal, For } from "solid-js";
import LayerHeader from "./LayerHeader";
import { LayerInfo, LayerInfoMember } from "./LayerInfo";

export default function (props: {
  layers: LayerInfo[],
  selectedId: Accessor<number>,
  setSelectedId: (i: number) => void,
  onLayerChange: (index: number, field: LayerInfoMember, value: any) => void
}) {
  const isSelected = createSelector(props.selectedId);

  return (
    <For each={props.layers}>
      {(layer, i) =>
        <LayerHeader layer={layer} isSelected={isSelected(layer.index)}
          onValueChanged={(m, v) => props.onLayerChange(i(), m, v)}
          onClicked={() => props.setSelectedId(layer.index)} />
      }
    </For>
  );
}