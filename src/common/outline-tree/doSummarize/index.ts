import { GroupPropertySchema } from "../GroupPropertySchema";
import { GroupPropertyState } from "../GroupPropertyState";
import { PropertyCount } from "./PropertyCount";
import summarize from "./summarize"

export default function doSummarize(
  is3DLayer: boolean,
  schema: GroupPropertySchema,
  state: GroupPropertyState
): PropertyCount[] {
  // let count = 0;
  // const totals = new Array<number>(schema.groups.length)
  // const storeTotal = (index: number, value: number) => {
  //   totals[index] = value;
  //   count += 1;
  //   return value;
  // } 

  const leaves: Array<PropertyCount> = []
  const buildLeaves = (index: number, count: number) => {
    leaves.push([index, count])
  }

  summarize(is3DLayer, schema, state, 0, buildLeaves);
  return leaves;
}