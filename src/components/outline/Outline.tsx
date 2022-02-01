import { Accessor, createSelector, createSignal, For } from "solid-js";
import LayerHeader from "../layer-header/LayerHeader";
import { GroupLayerInfo, LayerInfoMember } from "../../common/GroupLayerInfo";

export default function (props: {
  layers: GroupLayerInfo[],
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