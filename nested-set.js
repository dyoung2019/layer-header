
// based on the queries/arguments passed to sort
// contains all possible properties ?
// shapes can contain infinite groups so no
// good start
const expandAll = [
  {
    name: "clothes",
    left: 1,
    right: 22,
    depth: 0,
  },
  {
    name: "mens",
    left: 2,
    right: 9,
    depth: 1,
  },
  {
    name: "womens",
    left: 10,
    right: 21,
    depth: 1,
  },
  {
    name: "suits",
    left: 3,
    right: 8,
    depth: 2,
  },
  {
    name: "slacks",
    left: 4,
    right: 5,
    depth: 3,
  },
  {
    name: "jackets",
    left: 6,
    right: 7,
    depth: 3,
  },
  {
    name: "dresses",
    left: 11,
    right: 16,
    depth: 2,
  },
  {
    name: "skirts",
    left: 17,
    right: 18,
    depth: 2,
  },
  {
    name: "blouses",
    left: 19,
    right: 20,
    depth: 2,
  },
  {
    name: "evening gowns",
    left: 12,
    right: 13,
    depth: 3,
  },
  {
    name: "sun dresses",
    left: 14,
    right: 15,
    depth: 3,
  },
]

// visible properties
// if parent is expanded show all children collapsed
// but need to store every expanded child

const vprops = {
  0: true,
  1: false
}

// specific flags on layer

let is3DLayer = false

// specific flag on each property?
const separateDims = {
  0: true
}

// leaf count can change, 
// so should use count on branches

// what about segment tree rules

// 1. build list of all leaf properties using layer default
// unless clone
// 2. build branch list based on properties 
// HOW?
// 3. update tree when 
//1. user changed layer from 2D to 3D and back
// add or toggle orientation & RotationX/Y/Z
//1. user select position to split into separate dimensions
// add or toggle position X/Y/Z
// remove position
// is it available for all vectors (such as anchor point)
//1. user deletes a shape item from shape layer
//1. user click expand on or collapse tree
//1. user add a shape item to layer
//1. user add or remove a mask
//1. user add or remove effect for layer

const tree = [
  {
    // index: 0,
    name: "clothes",
    depth: 0,
    left: 0,
    right: 20,
    // total: 22,
    // isExpanded: true,
    collapse: {
      total: 1
    },
    queries: [
      1,
      2,
    ]
  },
  {
    // index: 1,
    name: "mens",
    left: 1,
    right: 8,
    depth: 1,
    // total: 8,
    // isExpanded: true,
    collapse: {
      total: 1
    },
    queries: [
      3,
      4,
      5,
    ]
  },
  {
    // index: 2,
    name: "womens",
    left: 9,
    right: 21,
    depth: 1,
    // total: 13,
    // isExpanded: true,
    collapse: {
      total: 1
    },
    queries: [
      6,
      7,
      8
    ]
  },
  {
    // index: 3,
    name: "suits",
    left: 3,
    right: 8,
    depth: 2,
    // total: 5,
    // isExpanded: false,
    collapse: {
      total: 1
    },
    queries: []
  },
  {
    // index: 4,
    name: "slacks",
    left: 4,
    right: 5,
    depth: 3,
    // total: 1,
    // isExpanded: false,
    collapse: {
      total: 1
    },
    queries: []
  },
  {
    // index: 5,
    name: "jackets",
    left: 6,
    right: 7,
    depth: 3,
    // total: 1,
    // isExpanded: false,
    collapse: {
      total: 1
    },
    queries: []
  },
  {
    // index: 6,
    name: "dresses",
    left: 11,
    right: 16,
    depth: 2,
    // total: 4,
    // isExpanded: true,
    collapse: {
      total: 1
    },
    queries: [
      9,
      10,
    ]
  },
  {
    // index: 7,
    name: "skirts",
    left: 17,
    right: 18,
    depth: 2,
    // total: 1,
    // isExpanded: false,
    collapse: {
      total: 1
    },
    queries: []
  },
  {
    // index: 8,
    name: "blouses",
    left: 19,
    right: 19,
    depth: 2,
    // total: 1,
    // isExpanded: false,
    collapse: {
      total: 1
    },
    queries: []
  },
  {
    // index: 9,
    name: "evening gowns",
    left: 12,
    right: 13,
    depth: 3,
    // total: 1,
    // isExpanded: false,
    collapse: {
      total: 1
    },
    queries: []
  },
  {
    // index: 10,
    name: "sun dresses",
    left: 14,
    right: 15,
    depth: 3,
    // total: 1,
    // isExpanded: false,
    collapse: {
      total: 1
    },
    queries: []
  },
]



const opened = new Array(tree.length).fill(true)
// const values = new Array(tree.length)
const summarize = (totals, schema, flags, index) => {
  const node = schema[index]
  // console.log('index', index)
  // console.log(node.name)

  if (node.left === node.right) {
    // console.log('single')
    const domain = (node.right - node.left + 1)
    totals[index]= domain
    return domain
  }

  const hasChildren = node.queries.length > 0
  if (flags[index] && hasChildren) {
    // queries for children
    // parent first
    let total = 1
    for (let i = 0; i < node.queries.length; i += 1) {
      const j = node.queries[i]
      total += summarize(totals, schema, flags, j)
    }
    // console.log('total', node.depth, total)
    // node.total = total
    totals[index] = total
    // console.log('sumz')
    return total
  } else if (!flags[index] && hasChildren) {
    totals[index] = node.collapse.total
    // node.total = node.collapse.total
  } else {
    // console.log('colls')
    const domain = (node.right - node.left + 1)
    totals[index] = domain
    return domain
  }
}

const doSummarize = (schema, isExpanded) => {
  const totals = new Array(schema.length)
  summarize(totals, schema, isExpanded, 0)
  return totals
}

const vPropQuery = (vTree, size, k) => {


  if (size === 0) {
    return 0;
  }

  const callStack = []
  const peek = () => {
    return callStack[callStack.length - 1]
  }

  const hasMoves = () => {
    return callStack.length > 0
  }

  const popOff = () => {
    callStack.pop();
  }

  const minimumValue = k + 1
  const withinRange = (o, v) => {
    console.log('withinRange',minimumValue, o, v)
    const kMin = minimumValue - o;
    const kMax = v;
    return kMin <= kMax
  }

  const getTotal = (i) => {
    // console.log('getTotal', i)
    return vTree[i].total
  }

  const isLeafNode = (i) => {
    return vTree[i].queries.length === 0
  }

  const pushQueries = (i, o) => {
    const sumQueries = () => {
      const children = vTree[i].queries
      const result = []
      let total = 0

      children.forEach(a => {
        result.push(total)
        total += vTree[a].total
      })

      return [total, result]
    }


    // check if that sum is same as parent
    const lhs = getTotal(i)
    const [total, sums] = sumQueries()

    const rhs = total + 1
    if (lhs !== rhs) {
      return `domain validation (${lhs} !== ${rhs})`
    }

    const kMin = minimumValue - o


    for (let j = sums.length - 1; j > 0; j -= 1) {
      const rhsIndex = vTree[i].queries[j]
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

    const node = vTree[index]

    // console.log('node', node)
    const total = node.total
    if (withinRange(offset, total)) {
      if (isLeafNode(index)) {
        return [index, minimumValue - offset - 1]
      }

      const error = pushQueries(index, offset)
      if (!!error) {
        return [-1, 0, error]
      }

      validIndexFound = index
    } else {
      popOff()
    }

    console.log('cs', callStack)
  }

  if (validIndexFound !== null) {
    return [validIndexFound, 0];
  } else {
    return [size + 1, 0];
  }
}

const totals = doSummarize(tree, opened)

console.log('totals', totals)
// console.log('values', values)
// tree[0].isExpanded = true

// const result1 = summarize(tree, 0, 0)
// console.log('expanded', result1)

// const result2 = vPropQuery(tree, 22, 2)
// console.log('expanded', result2)