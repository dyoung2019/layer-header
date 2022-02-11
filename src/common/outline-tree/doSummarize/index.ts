import { GroupPropertySchema } from "../GroupPropertySchema";
import { GroupPropertyState } from "../GroupPropertyState";
import { PropertyCount } from "./PropertyCount";
import summarize from "./summarize"

export default function doSummarize(
  schema: GroupPropertySchema,
  state: GroupPropertyState
): [number[], PropertyCount[]] {
  let count = 0;
  const totals = new Array<number>(schema.groups.length)
  const storeTotal = (index: number, value: number) => {
    totals[index] = value;
    count += 1;
    return value;
  } 

  const leaves: Array<PropertyCount> = []
  const buildLeaves = (index: number, count: number) => {
    leaves.push([index, count])
  }

  summarize(totals, schema, state, 0, storeTotal, buildLeaves);
  return [totals, leaves]
}