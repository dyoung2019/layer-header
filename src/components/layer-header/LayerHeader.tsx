import { mergeProps } from "solid-js"
import { LayerGroupInfo, LayerInfoMember } from "../../common/outline-tree/LayerGroupInfo";
import { LayerPropertyFlags } from "../../common/outline-tree/LayerPropertyFlags";
import "./LayerHeader.css";

export default function (props: {
  layer: LayerGroupInfo,
  isSelected: boolean,
  onClicked: () => void,
  onValueChanged: (member: LayerInfoMember, value: any) => void
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
    isSelected: false,
    onValueChanged: () => { }
  }, props);

  const CustomCheckbox = (
    member: LayerInfoMember,
    isChecked: boolean
  ) => {

    const handleChange = (e: any, m: LayerInfoMember) => {
      const target = e.currentTarget;
      props.onValueChanged(m, target.checked || false);
    }

    return (
      <input className="layer-header-checkbox"
        type="checkbox"
        name={member}
        id={member}
        title={member}
        checked={isChecked}
        onChange={(e) => handleChange(e, member)} />
    )
  }

  const getLabelColor = () => {
    return `background-color: ${props.layer.labelColor};`
  }

  const getSelectedColor = (active: boolean) => {
    return `background-color: ${active ? 'red' : 'none'}`
  }

  return (
    <header className="layer-header" onClick={props.onClicked}>
      {CustomCheckbox("videoOn", props.layer.videoOn)}<span>Video On?</span>
      {CustomCheckbox("audioOn", props.layer.audioOn)}<span>Audio On?</span>
      {CustomCheckbox("soloOn", props.layer.soloOn)}<span>Solo On?</span>
      {CustomCheckbox("isLocked", props.layer.isLocked)}<span>Is Locked?</span>
      <div className="label-color-box" style={getLabelColor()}>-</div>
      <p style={getSelectedColor(props.isSelected)}>{props.layer.index}</p>
      <p style={getSelectedColor(props.isSelected)}>{props.layer.name} {props.layer.is3DLayer ? '3D' : '2D'}</p>
      {CustomCheckbox("isShy", props.layer.isShy)}<span>Is Shy?</span>
      {CustomCheckbox("collapseTransforms", props.layer.collapseTransforms)}<span>Collapse Transforms?</span>
      {/* frameBlending, motionBlur, isAdjustmentLayer */}
      {CustomCheckbox("is3DLayer", props.layer.is3DLayer)}<span>Is 3D Layer?</span>
    </header>
  )
}