import hotkeys from 'hotkeys-js';
import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js';
import { LayerPropertyFlags } from './LayerPropertyFlags';

export default function(props: {
    mailbox: TMailbox<string>
  }
) {
  const [seq] = createSignal(['a', 't', 'p', 'r', 's', 'l', 'f', 'm', 'e', 'u']);
  const key = createMemo(() => seq().join(','));
  // mailbox > history (i.e. layer view)
  const [taskMap, setTaskMap] = createSignal<{[k: string]: () => void}>({
    'a': () => {
      // console.log('Anchor')s
      props.mailbox.send('Anchor', 'Reset');
    },
    't': () => {
      // console.log('Opacity')
      props.mailbox.send('Opacity', 'Reset');
    },   
    'p': () => {
      props.mailbox.send('Position', 'Reset')
    },   
    'r': () => {
      props.mailbox.send('Rotation', 'Reset')
    },   
    's': () => {
      props.mailbox.send('Scale', 'Reset')
    },     
    'l': () => {
      props.mailbox.send('AudioLevels', 'Reset')
    },  
    'ff': () => {
      props.mailbox.send('Missing Effects', 'Reset')
    },     
    'e': () => {
      props.mailbox.send('Effects', 'Reset')
    },   
    'm': () => {
      props.mailbox.send('Mask Path', 'Reset')
    },
    'u': () => {
      props.mailbox.send('With Keyframes', 'Reset')
    },   
    'uu': () => {
      props.mailbox.send('Modified Properties', 'Reset')
    },     
    'aa': () => {
      props.mailbox.send('MaterialOptions', 'Reset')
    },  
    'tt': () => {
      props.mailbox.send('MaskOpacity', 'Reset')
    },               
    'rr': () => {
      props.mailbox.send('TimeRemap', 'Reset')
    },  
    'pp': () => {
      props.mailbox.send('PaintStrokes', 'Reset')
    },
    'll': () => {
      props.mailbox.send('Audio Waveform', 'Reset')
    },   
    'ss': () => {
      props.mailbox.send('Selected Properties', 'Reset')
    },     
    'mm': () => {
      props.mailbox.send('Mask Property Groups', 'Reset')
    }, 
    'ee': () => {
      props.mailbox.send('Expressions', 'Reset')
    }
  })

  const [buf, setBuf] = createSignal<string[]>([]);

  const stopSequence = () => {
    // console.log('reserve', buf());
    const command: string = buf().join('')
    const task: () => void = taskMap()[command]
    if (!!task) {
      task();
    }
    setBuf([]);
  }

  createEffect(() => {
    hotkeys(key(), { keyup: true }, (event, handler) => {
      if (event.type === 'keydown') {
        if (buf().length === 1) { 
          setBuf([...buf(), handler.key ?? '']);
        }
        return;
      }

      if (event.type === 'keyup') {
        if (buf().length === 0) {
          setBuf([...buf(), handler.key ?? '']);

          setTimeout(() => {
            stopSequence();
          }, 400)
        }
      }
      // Prevent the default refresh event under WINDOWS system
      event.preventDefault() 
      // console.log(`you pressed ${handler.key}!`) 
    });

    // hotkeys(key(),  { keydown: true, keyup: false }, (event, handler) => {
    //   if (buf().length === 1) { 
    //     setBuf([...buf(), handler.key ?? '']);
    //   }
    // })

    onCleanup(() => {
      hotkeys.unbind(key())
    })
  })


  return (
    <div>
      <ul>
        <li><kbd>A</kbd><span>Anchor</span></li>
        <li><kbd>T</kbd><span>Opacity</span></li>
        <li><kbd>P</kbd><span>Position</span></li>
        <li><kbd>R</kbd><span>Rotation</span></li>
        <li><kbd>S</kbd><span>Scale</span></li>
        <li><kbd>L</kbd><span>Audio Levels</span></li>
        <li><s><kbd>F</kbd><span>Feather</span></s></li>
        <li><kbd>TT</kbd><span>Mask Opacity</span></li>
        <li><kbd>RR</kbd><span>Time Remap</span></li>
        <li><kbd>FF</kbd><span>Missing Effects</span></li>
        <li><kbd>E</kbd><span>Effects</span></li>
        <li><kbd>MM</kbd><span>Masks (Property Group)</span></li>
        <li><kbd>AA</kbd><span>Material Options</span></li>
        <li><kbd>U</kbd><span>With Keyframes</span></li>
        <li><kbd>UU</kbd><span>Modified Properties</span></li>
        <li><kbd>PP</kbd><span>Paint Strokes</span></li>
        <li><kbd>LL</kbd><span>Audio Waveform</span></li>
        <li><kbd>SS</kbd><span>Selected Properties</span></li>
      </ul>
    </div>
  )
} 