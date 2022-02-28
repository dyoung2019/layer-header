import { LayerPropertyKeys } from "../../common/outline-tree/LayerPropertyKeys";

export default function CustomCheckbox (
  props: {
    member: LayerPropertyKeys,
    isChecked: boolean,
    onValueChanged: (key: LayerPropertyKeys, value: boolean) => void
  }
) {

  const handleChange = (e: any, m: LayerPropertyKeys) => {
    const target = e.currentTarget;
    props.onValueChanged(m, target.checked || false);
  }

  return (
    <input className="layer-header-checkbox"
      type="checkbox"
      name={props.member}
      id={props.member}
      title={props.member}
      checked={props.isChecked}
      onChange={(e) => handleChange(e, props.member)} />
  )
}