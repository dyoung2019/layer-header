import { Show } from "solid-js";
import PropertyRecord from "../../common/outline-tree/PropertyRecord";

export default function ContextMenu(props: {
  row: PropertyRecord,
  onSeparate: (row: PropertyRecord) => void
}) {
  return (
    <Show when={!props.row.isBranch && props.row.subIndex === 0}>
      <button onClick={() => props.onSeparate(props.row)}>Separate?</button>
    </Show>
  )
}