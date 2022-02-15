import { RowType } from "./RowType";

export interface GroupPropertyNode {
  type: RowType
  name: string;
  depth: number;
  maximum: number;
  queries: number[];
  minimum: number;
}
