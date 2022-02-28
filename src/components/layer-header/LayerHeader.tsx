import { LayerGroupInfo } from "../../common/outline-tree/LayerGroupInfo";
import { LayerPropertyKeys } from "../../common/outline-tree/LayerPropertyKeys";
import CustomCheckbox from "../custom-checkbox";
import "./LayerHeader.css";

export default function (props: {
  layer: LayerGroupInfo,
  isSelected: boolean,
  onClicked: () => void,
  onExpansion: () => void,
  onValueChanged: (member: LayerPropertyKeys, value: any) => void
}) {

  const getLabelColor = () => {
    return `background-color: ${props.layer.labelColor};`
  }

  const getSelectedColor = (active: boolean) => {
    return `background-color: ${active ? 'red' : 'none'}`
  }

  return (
    <header className="layer-header" onClick={props.onClicked}>
      <button onClick={() => props.onExpansion()}>JUMP</button>
      <CustomCheckbox member="videoOn" 
        isChecked={props.layer.videoOn} 
        onValueChanged={props.onValueChanged} />
      <span>Video On?</span>
      <CustomCheckbox member="audioOn" 
        isChecked={props.layer.audioOn} 
        onValueChanged={props.onValueChanged} />
      <span>Audio On?</span>
      <CustomCheckbox member="soloOn" 
        isChecked={props.layer.soloOn} 
        onValueChanged={props.onValueChanged} />
      <span>Solo On?</span>
      <CustomCheckbox member="isLocked" 
        isChecked={props.layer.isLocked} 
        onValueChanged={props.onValueChanged} />
      <span>Is Locked?</span>
      <div className="label-color-box" style={getLabelColor()}>-</div>
      <p style={getSelectedColor(props.isSelected)}>{props.layer.index}</p>
      <p style={getSelectedColor(props.isSelected)}>{props.layer.name} {props.layer.is3DLayer ? '3D' : '2D'}</p>
      <CustomCheckbox member="isShy" 
        isChecked={props.layer.isShy} 
        onValueChanged={props.onValueChanged} />
      <span>Is Shy?</span>
      <CustomCheckbox member="collapseTransforms" 
        isChecked={props.layer.collapseTransforms} 
        onValueChanged={props.onValueChanged} />
      <span>Collapse Transforms?</span>
      {/* frameBlending, motionBlur, isAdjustmentLayer */}
      <CustomCheckbox member="is3DLayer" 
        isChecked={props.layer.is3DLayer} 
        onValueChanged={props.onValueChanged} />
      <span>Is 3D Layer?</span>
    </header>
  )
}