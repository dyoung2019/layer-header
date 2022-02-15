import { RowType } from "./common/outline-tree/RowType";

export function getNoOfSubProperties(
  is3DLayer: boolean, 
  rowType: RowType,
  isExpanded: boolean
) {
  if (isExpanded) {
    switch(rowType) {
      case RowType.Position:
      case RowType.Scale:
      case RowType.Anchor:
        return (is3DLayer) ? 3 : 2;
      case RowType.Rotation:
        return (is3DLayer) ? 4 : 1; 
      case RowType.Skew:
          return 2;                     
      default:
        return 1;
    }
  } else {
    return 1;
  }
}