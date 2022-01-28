import { Accessor, createMemo, onMount } from "solid-js";
import useDoubleTap from "./useDoubleTap";

export default function useLayerViewBindings(
  selectedId: Accessor<number>,
  pipeOut: TMailbox
) {
  const taskMap = createMemo<{ [k: string]: () => void }>(() => {
    return {
      'a': () => {
        pipeOut.send(['KB', 'Anchor'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      't': () => {
        pipeOut.send(['KB', 'Opacity'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'p': () => {
        pipeOut.send(['KB', 'Position'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'r': () => {
        pipeOut.send(['KB', 'Rotation'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      's': () => {
        pipeOut.send(['KB', 'Scale'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'l': () => {
        pipeOut.send(['KB', 'AudioLevels'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'ff': () => {
        pipeOut.send(['KB', 'Missing Effects'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'e': () => {
        pipeOut.send(['KB', 'Effects'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'm': () => {
        pipeOut.send(['KB', 'Mask Path'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'u': () => {
        pipeOut.send(['KB', 'With Keyframes'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'uu': () => {
        pipeOut.send(['KB', 'Modified Properties'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'aa': () => {
        pipeOut.send(['KB', 'MaterialOptions'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'tt': () => {
        pipeOut.send(['KB', 'MaskOpacity'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'rr': () => {
        pipeOut.send(['KB', 'TimeRemap'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'pp': () => {
        pipeOut.send(['KB', 'PaintStrokes'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'll': () => {
        pipeOut.send(['KB', 'Audio Waveform'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'ss': () => {
        pipeOut.send(['KB', 'Selected Properties'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'mm': () => {
        pipeOut.send(['KB', 'Mask Property Groups'], ['KB', 'Reset'], { layerId: selectedId() });
      },
      'ee': () => {
        pipeOut.send(['KB', 'Expressions'], ['KB', 'Reset'], { layerId: selectedId() });
      }
    }
  });

  const parseDoubleTap = (cmd: string) => {
    const task = taskMap()[cmd]
    if (!!task && selectedId() !== -1) {
      task();
    }
  }

  const doubleTap = useDoubleTap(parseDoubleTap);

  return {
    doubleTap
  };
}