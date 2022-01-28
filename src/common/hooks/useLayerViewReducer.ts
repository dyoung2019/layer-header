import { onMount } from "solid-js";
import { TRouteDirectory } from "./useDirectory";

export default function useLayerViewReducer(pipeIn: TRouteDirectory) {
  const reducer = (
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
    pipeIn.add([{ path: ['KB'], handler: reducer }]);
  });

  return {
    reducer
  }
}