import { Accessor, createEffect, createSelector, For, Match, Show, Switch } from "solid-js";
import LayerHeader from "../layer-header/LayerHeader";
import { LayerGroupInfo } from "../../common/outline-tree/LayerGroupInfo";
import { LayerPropertyKeys } from "../../common/outline-tree/LayerPropertyKeys";
import PropertyRecord from "../../common/outline-tree/PropertyRecord";
import type { LayerVisualization } from "../../common/outline-tree/LayerVisualization";
import cloneVizualization from "./cloneVizualization";
import ExpandToggle from "../expand-toggle";
import ContextMenu from "../context-menu";
import handleExpansion from "./handleExpansion";
import handleDimensions from "./handleDimensions";

export default function (props: {
  rows: PropertyRecord[],
  layers: LayerGroupInfo[],
  selectedId: Accessor<number>,
  setSelectedId: (i: number) => void,
  onLayerChange: (index: number, field: LayerPropertyKeys, value: any) => void,
  onRefresh: () => void,
}) {
  const isSelected = createSelector(props.selectedId);

  const getLayer = (i: number) => {
    return props.layers[i]
  }

  const handleVisualChange = (r: PropertyRecord, mutate: (state: LayerVisualization) => void) => {
    const currentLayer = props.layers[r.layerIndex];
    const change = cloneVizualization(currentLayer.viz)
    mutate(change);
    props.onLayerChange(r.layerIndex, 'viz', change)
  }

  const handleJump = (index: number) => {
    const layer = props.layers[index];
    // top 
    console.log('index', index)
    console.log('layer', layer)
    console.log('layer.viz', layer.viz)
    const subNode = layer.viz.state.nodes[index];
    if (!!subNode) {
      const change = cloneVizualization(layer.viz);
      change.state.nodes[0] = {
        isExpanded: !subNode.isExpanded,
        separate: subNode.isExpanded,
      }
      console.log('found', change)
      // update branch first

      props.onLayerChange(index, 'viz', change);
    }
  }

  // createEffect(() => {
  //   console.log(props.rows);
  // })

  return (
    <div>
      <div>Count: {props.rows.length}</div>
      <For each={props.rows} fallback={<div>OOPS</div>}>
        {(l, i) =>
          <div>
            <Switch>
              <Match when={l.depth === 0}>
                <LayerHeader 
                  onExpansion={() => handleJump(l.layerIndex)}
                  layer={getLayer(l.layerIndex)} 
                  isSelected={isSelected(l.layerIndex)}
                  onValueChanged={(m, v) => props.onLayerChange(i(), m, v)}
                  onClicked={() => props.setSelectedId(l.layerIndex)} 
                  />
              </Match>
              <Match when={l.depth != 0}>
                <div>
                  <ExpandToggle row={l} onExpand={() => handleExpansion(l, handleVisualChange)}></ExpandToggle>
                  <ContextMenu row={l} onSeparate={() => handleDimensions(l, handleVisualChange)}></ContextMenu>
                  <span>{JSON.stringify(l)} </span>
                </div>
              </Match>
            </Switch>
          </div>
        }
      </For>
    </div>


  );
}