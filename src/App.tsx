import { createMemo, createSignal, For } from 'solid-js';
import paging from './pageLayerProperties';
import doSummarize from './common/hooks/doSummarize';
import treeBuild from './common/hooks/treeBuild';
import calculateLeafOffset from './common/hooks/calculateLeafOffset';

export default function () {
  const [schema] = createSignal<LayerPropertyNode[]>([
    {
      name: "0",
      depth: 0,
      maximum: 1,
      minimum: 1,
      queries: [1, 2]
    }, 
    {
      name: "1",
      maximum: 1,
      depth: 1,
      minimum: 1,
      queries: [3, 4, 5]
    },
    {
      name: "2",
      maximum: 7,
      depth: 1,
      minimum: 1,
      queries: [6, 7, 8]
    },
    {
      name: "3",
      maximum: 2,
      depth: 2,
      minimum: 1,     
      queries: [] 
    },
    {
      name: "4",
      maximum: 1,
      depth: 2,
      minimum: 1,     
      queries: [] 
    },
    {
      name: "5",
      maximum: 2,
      depth: 2,
      minimum: 1,     
      queries: [] 
    },
    {
      name: "6",
      maximum: 5,
      depth: 2,
      minimum: 1,     
      queries: [9, 10] 
    },    
    {
      name: "7",
      maximum: 3,
      depth: 2,
      minimum: 1,     
      queries: [] 
    },      
    {
      name: "8",
      maximum: 5,
      depth: 2,
      minimum: 1,     
      queries: [] 
    },  
    {
      name: "evening gowns",
      maximum: 2,
      depth: 2,
      minimum: 1,     
      queries: [] 
    },  
    {
      name: "sun dresses",
      maximum: 2,
      depth: 2,
      minimum: 1,     
      queries: [] 
    }, 
  ]);

  const [flags] = createSignal([
    {
      isExpanded: true, // 0
    },
    {
      isExpanded: false, // 1
    },    
    {
      isExpanded: true, // 2
    },  
    {
      isExpanded: false, // 3
    }, 
    {
      isExpanded: false, // 4
    },    
    {
      isExpanded: false, // 5
    },
    {
      isExpanded: false, // 6
    },    
    {
      isExpanded: false, // 7
    },  
    {
      isExpanded: false, // 8
    }, 
    {
      isExpanded: false, // 9
    },    
    {
      isExpanded: false, // 10
    },    
  ])

  // const [totals] = createSignal([1]);
  const [k] = createSignal<number>(0);

  const rows = createMemo(() => {
    const [totals, leaves] = doSummarize(schema(), flags());
    const inputs = [1, 1, 1, 1, 3, 5]
    const hierarchy = treeBuild(inputs, (v:any) => {
      console.log(v)
      return v
    })
    const vOffset = calculateLeafOffset(leaves.length)
    const result =  paging(schema(), totals, k());
    console.log('rows.totals', totals)
    console.log('rows.leaves', leaves)
    console.log('rows.hierarchy', hierarchy)
    console.log('rows.vOffset', vOffset)
    console.log('rows.result', result)
    return result;
  })

  return (
    <div>
      <For each={rows()}>
        {(l) => <div>{l}</div>}
      </For>
    </div>
  )
}