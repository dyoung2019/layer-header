import { createMemo, onMount } from 'solid-js';
import { LayerInfo } from './LayerInfo';
import { TRouteDirectory } from './useDirectory';
import useDoubleTap from './useDoubleTap';

export default function (props: {
  pipeIn: TRouteDirectory,
  pipeOut: TMailbox
}
) {
  const taskMap = createMemo<{ [k: string]: (layer?: LayerInfo) => void }>(() => {
    return {
      'a': () => {
        props.pipeOut.send(['KB', 'Anchor'], ['KB', 'Reset']);
      },
      't': () => {
        props.pipeOut.send(['KB', 'Opacity'], ['KB', 'Reset']);
      },
      'p': () => {
        props.pipeOut.send(['KB', 'Position'], ['KB', 'Reset']);
      },
      'r': () => {
        props.pipeOut.send(['KB', 'Rotation'], ['KB', 'Reset']);
      },
      's': () => {
        props.pipeOut.send(['KB', 'Scale'], ['KB', 'Reset']);
      },
      'l': () => {
        props.pipeOut.send(['KB', 'AudioLevels'], ['KB', 'Reset']);
      },
      'ff': () => {
        props.pipeOut.send(['KB', 'Missing Effects'], ['KB', 'Reset']);
      },
      'e': () => {
        props.pipeOut.send(['KB', 'Effects'], ['KB', 'Reset']);
      },
      'm': () => {
        props.pipeOut.send(['KB', 'Mask Path'], ['KB', 'Reset']);
      },
      'u': () => {
        props.pipeOut.send(['KB', 'With Keyframes'], ['KB', 'Reset']);
      },
      'uu': () => {
        props.pipeOut.send(['KB', 'Modified Properties'], ['KB', 'Reset']);
      },
      'aa': () => {
        props.pipeOut.send(['KB', 'MaterialOptions'], ['KB', 'Reset']);
      },
      'tt': () => {
        props.pipeOut.send(['KB', 'MaskOpacity'], ['KB', 'Reset']);
      },
      'rr': () => {
        props.pipeOut.send(['KB', 'TimeRemap'], ['KB', 'Reset']);
      },
      'pp': () => {
        props.pipeOut.send(['KB', 'PaintStrokes'], ['KB', 'Reset']);
      },
      'll': () => {
        props.pipeOut.send(['KB', 'Audio Waveform'], ['KB', 'Reset']);
      },
      'ss': () => {
        props.pipeOut.send(['KB', 'Selected Properties'], ['KB', 'Reset']);
      },
      'mm': () => {
        props.pipeOut.send(['KB', 'Mask Property Groups'], ['KB', 'Reset']);
      },
      'ee': () => {
        props.pipeOut.send(['KB', 'Expressions'], ['KB', 'Reset']);
      }
    }
  });

  const parseDoubleTap = (cmd: string) => {
    const task = taskMap()[cmd]
    if (!!task) {
      task();
    }
  }
  
  const dblTap = useDoubleTap(parseDoubleTap);

  const simpleReducer = (
    command: any,
    params: any,
    snapshot?: any
  ) => {
    switch (command) {
      case '':
        return;
      default:
        console.log('command', command);
        return;
    }
  }

  onMount(() => {
    props.pipeIn.add([{ path: ['KB'], handler: simpleReducer }]);
  });

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