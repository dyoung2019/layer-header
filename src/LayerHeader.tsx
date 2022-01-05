import { createSignal } from "solid-js"
import { LayerInfo } from "./LayerInfo";
import { LayerPropertyFlags } from "./LayerPropertyFlags";
import "./LayerHeader.css";

export default function() {
  const [noOfSolids] = createSignal();
  const [layer] = createSignal<LayerInfo>({
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
  })

  const getLabelColor = () => {
    return `background-color: ${layer().labelColor};`
  }

  return (
    <header className="layer-header">
      <input className="layer-header-checkbox" type="checkbox" name="videoOn" id="videoOn" title="videoOn" checked={layer().videoOn}/>
      <input className="layer-header-checkbox" type="checkbox" name="audioOn" id="audioOn" title="audioOn" checked={layer().audioOn}/>
      <input className="layer-header-checkbox" type="checkbox" name="soloOn" id="soloOn" title="soloOn" checked={layer().soloOn}/>
      <input className="layer-header-checkbox" type="checkbox" name="isLocked" id="isLocked" title="isLocked" checked={layer().isLocked}/>
      <div className="label-color-box" style={getLabelColor()}>RED</div>
      <p>{layer().index}</p>
      <p>{layer().name}</p>
      <input className="layer-header-checkbox" type="checkbox" name="isShy" id="isShy" title="isShy" checked={layer().isShy}/>  
      <input className="layer-header-checkbox" type="checkbox" name="collapseTransforms" id="collapseTransforms" title="collapseTransforms" checked={layer().collapseTransforms}/>  
      <input className="layer-header-checkbox" type="checkbox" name="frameBlending" id="frameBlending" title="frameBlending"/>  
      <input className="layer-header-checkbox" type="checkbox" name="motionBlur" id="motionBlur" title="motionBlur"/>  
      <input className="layer-header-checkbox" type="checkbox" name="isAdjustmentLayer" id="isAdjustmentLayer" title="isAdjustmentLayer"/>  
      <input className="layer-header-checkbox" type="checkbox" name="is3DLayer" id="is3DLayer" title="Is 3d" checked={layer().is3DLayer}/>  
    </header>
  )
}