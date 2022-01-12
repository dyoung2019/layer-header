import { createSignal, mergeProps } from "solid-js"
import { LayerInfo } from "./LayerInfo";
import { LayerPropertyFlags } from "./LayerPropertyFlags";
import "./LayerHeader.css";

export default function(props: {
  layer: LayerInfo,
  isSelected: boolean
}) {
  props = mergeProps({
    layer: {
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
      singleFlag: LayerPropertyFlags.None,
      selectedFlags: LayerPropertyFlags.None,
      properties: [],
    },
    isSelected: false
  }, props);

  const getLabelColor = () => {
    return `background-color: ${props.layer.labelColor};`
  }

  const getSelectedColor = (active: boolean) => {
    return `background-color: ${active ? 'red' : 'none'}`
  }

  return (
    <header className="layer-header">
      <input className="layer-header-checkbox" type="checkbox" name="videoOn" id="videoOn" title="videoOn" checked={props.layer.videoOn}/>
      <input className="layer-header-checkbox" type="checkbox" name="audioOn" id="audioOn" title="audioOn" checked={props.layer.audioOn}/>
      <input className="layer-header-checkbox" type="checkbox" name="soloOn" id="soloOn" title="soloOn" checked={props.layer.soloOn}/>
      <input className="layer-header-checkbox" type="checkbox" name="isLocked" id="isLocked" title="isLocked" checked={props.layer.isLocked}/> 
      <div className="label-color-box" style={getLabelColor()}>RED</div> 
      <p style={getSelectedColor(props.isSelected)}>{props.layer.index}</p>
      <p style={getSelectedColor(props.isSelected)}>{props.layer.name}</p>
      <input className="layer-header-checkbox" type="checkbox" name="isShy" id="isShy" title="isShy" checked={props.layer.isShy}/>  
      <input className="layer-header-checkbox" type="checkbox" name="collapseTransforms" id="collapseTransforms" title="collapseTransforms" checked={props.layer.collapseTransforms}/>  
      <input className="layer-header-checkbox" type="checkbox" name="frameBlending" id="frameBlending" title="frameBlending"/>  
      <input className="layer-header-checkbox" type="checkbox" name="motionBlur" id="motionBlur" title="motionBlur"/>  
      <input className="layer-header-checkbox" type="checkbox" name="isAdjustmentLayer" id="isAdjustmentLayer" title="isAdjustmentLayer"/>  
      <input className="layer-header-checkbox" type="checkbox" name="is3DLayer" id="is3DLayer" title="Is 3d" checked={props.layer.is3DLayer}/>
    </header>
  )
}