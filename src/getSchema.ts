import { createSignal } from "solid-js";
import type { GroupPropertySchema } from "./common/outline-tree/GroupPropertySchema";
import { RowType } from "./common/outline-tree/RowType";

export default function getSchema() {
  const [schema] = createSignal<GroupPropertySchema>({
    groups: [
      {
        name: "0",
        type: RowType.Branch,
        depth: 0,
        maximum: 1,
        minimum: 1,
        queries: [1, 2]
      },
      {
        name: "1",
        type: RowType.Branch,
        maximum: 1,
        depth: 1,
        minimum: 1,
        queries: [3, 4, 5]
      },
      {
        name: "2",
        type: RowType.Branch,
        maximum: 7,
        depth: 1,
        minimum: 1,
        queries: [6, 7, 8]
      },
      {
        name: "3",
        type: RowType.Position,
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "4",
        type: RowType.Rotation,
        maximum: 1,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "5",
        type: RowType.Scale,
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "6",
        type: RowType.Branch,
        maximum: 5,
        depth: 2,
        minimum: 1,
        queries: [9, 10]
      },
      {
        name: "7",
        type: RowType.Skew,
        maximum: 3,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "8",
        type: RowType.Position,
        maximum: 5,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "evening gowns",
        type: RowType.Position,
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
      {
        name: "sun dresses",
        type: RowType.Anchor,
        maximum: 2,
        depth: 2,
        minimum: 1,
        queries: []
      },
    ]
  });

  return {
    schema
  }
}