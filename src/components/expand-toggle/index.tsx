import { Show } from "solid-js";
import PropertyRecord from "../../common/outline-tree/PropertyRecord";

export default function ExpandToggle(props: {
  row: PropertyRecord,
  onExpand: (row: PropertyRecord) => void
}) {
  return (
    <Show when={props.row.isBranch}>
      <button onClick={() => props.onExpand(props.row) }>{">".repeat(props.row.depth + 1)}</button>
    </Show>
  );
} 