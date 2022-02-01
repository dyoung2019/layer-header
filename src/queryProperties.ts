export default function queryProperties<TLeaf>(
  branches: number[],
  leaves: TLeaf[],
  k: number,
  getLeafTotal: (i: TLeaf) => number
) {

  const size = leaves.length;
  if (size === 0) {
    return [];
  }

  const callStack: any[] = [];
  const peek = () => {
    return callStack[callStack.length - 1];
  }

  const hasMoves = () => {
    return callStack.length > 0;
  }

  const popOff = () => {
    callStack.pop();
  }

  const minimumValue = k + 1
  const withinRange = (o: number, v: number) => {
    // console.log('withinRange', minimumValue, o, v)
    const kMin = minimumValue - o;
    const kMax = v;
    return kMin <= kMax
  }

  const isLeafNode = (i: number): boolean => {
    return branches.length >= i
  }

  const getTotal = (i: number) => {
    // console.log('getTotal', i)
    return (isLeafNode(i))
      ? branches.length - getLeafTotal(leaves[i])
      : branches[i];
  }

  const pushQueries = (i: number, o: number)  =>  {
    const sumQueries = (): [a: number, b:number[]] => {
      const children = schema[i].queries;
      const result: any[] = [];
      let total: number = 0;

      children.forEach((a: any) => {
        result.push(total)
        total += getTotal(a)
      })

      return [total, result];
    }


    // check if that sum is same as parent
    const lhs = getTotal(i)
    const [total, sums] = sumQueries();
    console.log('total', total)
    console.log('total', sums)
    
    const rhs = total + 1;
    console.log('lhs', lhs)
    console.log('rhs', rhs)
    if (lhs !== rhs) {
      return [`domain validation (${lhs} !== ${rhs})`, 'A']
    }

    const kMin = minimumValue - o


    for (let j = sums.length - 1; j > 0; j -= 1) {
      const rhsIndex = schema[i].queries[j]
      const lhsOffset = sums[j]

      console.log('kMin', kMin, lhsOffset)
      if (lhsOffset >= kMin) {
        callStack.push([rhsIndex, lhsOffset + o])
      }
      // add in reverse
    }
  }

  let validIndexFound = null

  callStack.push([0, 0])
  while (hasMoves()) {
    const [index, offset] = peek()
    console.log('index', index, offset)

    // console.log('node', node)
    const total = getTotal(index)
    if (withinRange(offset, total)) {
      if (isLeafNode(index)) {
        return [index, minimumValue - offset - 1, 'B'];
        // return ['B']
      }

      const error = pushQueries(index, offset)
      if (!!error) {
        return [-1, 0, error, 'C'];
        // return ['C']; 
      }

      validIndexFound = index;
    } else {
      popOff();
    }

    // console.log('cs', callStack)
  }

  if (validIndexFound !== null) {
    return [validIndexFound, 0, 'D'];
    // return ['D'];
  } else {
    return [size + 1, 0, 'E'];
    // return ['E'];
  }
}