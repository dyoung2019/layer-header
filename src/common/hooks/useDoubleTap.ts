import hotkeys from "hotkeys-js";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";

export default function useDoubleTap(
  onParsing: (cmd: string) => void,
  initialKeys: string[] = ['a', 't', 'p', 'r', 's', 'l', 'f', 'm', 'e', 'u'],
) {
  // const [siloCode, setSiloCode] = createSignal<string>(initialCode);
  const [keys, setKeys] = createSignal(initialKeys);
  const [duration, setDuration] = createSignal<number>(400);
  const filter = createMemo(() => keys().join(','));

  const [keyBuffer, setKeyBuffer] = createSignal<string[]>([]);

  const extractString = (): string =>  {
    return keyBuffer().join('');
  }

  const stopSequence = () => {
    const sequence = extractString();

    onParsing(sequence);
    setKeyBuffer([]);
  }

  createEffect(() => {
    hotkeys(filter(), { keyup: true }, (event, handler) => {
      if (event.type === 'keydown') {
        if (keyBuffer().length === 1) {
          setKeyBuffer([...keyBuffer(), handler.key ?? '']);
        }
        return;
      }

      if (event.type === 'keyup') {
        if (keyBuffer().length === 0) {
          setKeyBuffer([...keyBuffer(), handler.key ?? '']);

          setTimeout(() => {
            stopSequence();
          }, duration())
        }
      }
      // Prevent the default refresh event under WINDOWS system
      event.preventDefault()
    });

    onCleanup(() => {
      hotkeys.unbind(filter())
    })
  })
  
  return {
    keys,
    setKeys,
    filter,
    keyBuffer,
    duration,
    setDuration
  }
}