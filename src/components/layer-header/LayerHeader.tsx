import { mergeProps } from "solid-js"
import { GroupLayerInfo, LayerInfoMember } from "../../common/GroupLayerInfo";
import { LayerPropertyFlags } from "../../common/LayerPropertyFlags";
import "./LayerHeader.css";

export default function (props: {
  layer: GroupLayerInfo,
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
      {CustomCheckbox("videoOn", props.layer.videoOn)}
      {CustomCheckbox("audioOn", props.layer.audioOn)}
      {CustomCheckbox("soloOn", props.layer.soloOn)}
      {CustomCheckbox("isLocked", props.layer.isLocked)}
      <div className="label-color-box" style={getLabelColor()}>-</div>
      <p style={getSelectedColor(props.isSelected)}>{props.layer.index}</p>
      <p style={getSelectedColor(props.isSelected)}>{props.layer.name}</p>
      {CustomCheckbox("isShy", props.layer.isShy)}
      {CustomCheckbox("collapseTransforms", props.layer.collapseTransforms)}
      {/* frameBlending, motionBlur, isAdjustmentLayer */}
      {CustomCheckbox("is3DLayer", props.layer.is3DLayer)}
    </header>
  )
}