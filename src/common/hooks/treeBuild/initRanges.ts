export default function initRanges(len: number) {
  const output = []

  let offset = len;
  do {
    const span = (offset + 1) >> 1
    offset = offset - span
    output.push([offset, offset + span])
  } while (offset > 0)

  return output
}