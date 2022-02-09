import { Accessor, createSelector, createSignal, For, Match, Show, Switch } from "solid-js";
import LayerHeader from "../layer-header/LayerHeader";
import { LayerGroupInfo } from "../../common/outline-tree/LayerGroupInfo";
import { LayerPropertyKeys } from "../../common/outline-tree/LayerPropertyKeys";

export default function (props: {
  rows: any[],
  layers: LayerGroupInfo[],
  selectedId: Accessor<number>,
  setSelectedId: (i: number) => void,
  onLayerChange: (index: number, field: LayerPropertyKeys, value: any) => void
}) {
  const isSelected = createSelector(props.selectedId);

  const getLayer = (i: number) => {
    return props.layers[i]
  }

  return (
    <For each={props.rows}>
      {
        (l, i) => <Switch fallback={<h1>Big Farts</h1>}>
          <Match when={l.depth === 0}>
            <LayerHeader layer={getLayer(l.layerIndex)} isSelected={isSelected(l.layerIndex)}
              onValueChanged={(m, v) => props.onLayerChange(i(), m, v)}
              onClicked={() => props.setSelectedId(l.layerIndex)} />
          </Match>
          <Match when={l.depth > 0}>
            <div>
              <Show when={l.subIndex === 0}><button>Separate?</button></Show><span>{JSON.stringify(l)} </span>
            </div>
          </Match>
        </Switch>
      }
    </For>
    // {/*
    //  <For each={props.layers}>
    // //   {(layer, i) =>
    // //     <LayerHeader layer={layer} isSelected={isSelected(layer.index)}
    // //       onValueChanged={(m, v) => props.onLayerChange(i(), m, v)}
    // //       onClicked={() => props.setSelectedId(layer.index)} />
    // //   }
    // // </For>
    // */
    // }
  );
}