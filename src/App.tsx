import { Component, onMount, from, For } from 'solid-js';
import { createStore } from 'solid-js/store'

import logo from './logo.svg';
import styles from './App.module.css';
import LayerHeader from './LayerHeader';
import InputDemo from './InputDemo';

import useDirectory from './useDirectory';
import useHistory from './useHistory';
import { LayerPropertyFlags } from './LayerPropertyFlags';
import Outline from './Outline';

const App: Component = () => {
  const [state] = createStore({
    layers: [
      {
        index: 1,
        name: "Solid Layer 1",
        videoOn: true,
        audioOn: false,
        soloOn: false,
        isLocked: false,
        collapseTransforms: true,
        isShy: false,
        is3DLayer: false,
        labelColor: 'green',
        singleFlag: LayerPropertyFlags.None,
        selectedFlags: LayerPropertyFlags.None,
        properties: [],
      },
      {
        index: 2,
        name: "Solid Layer 2",
        videoOn: true,
        audioOn: false,
        soloOn: false,
        isLocked: false,
        collapseTransforms: true,
        isShy: false,
        is3DLayer: false,
        labelColor: 'pink',
        singleFlag: LayerPropertyFlags.None,
        selectedFlags: LayerPropertyFlags.None,
        properties: [],
      },      
      {
        index: 3,
        name: "Solid Layer 3",
        videoOn: true,
        audioOn: false,
        soloOn: false,
        isLocked: false,
        collapseTransforms: true,
        isShy: false,
        is3DLayer: false,
        labelColor: 'pink',
        singleFlag: LayerPropertyFlags.None,
        selectedFlags: LayerPropertyFlags.None,
        properties: [],
      }, 
    ]
  })

  const router = useDirectory();
  const {undo, redo, load, past, future, queue} = useHistory(router);

  onMount(() => {
    // router.add([{path: ['KB'], handler: () => console.log('HELLO')}]);
    // load([{redo: ['KB','IN'], undo: ['KB','OUT'], params: null}], [], []);
  })

  const mailbox = {
    send: (r: any[], u: any[], params?: any) => {
      queue(r, u, params)
    }
  }

  const handleRedo = async () => {
    await redo();
  }

  const handleUndo = async () => {
    await undo();
  }

  return (
    <div class={styles.App}>
      <button onClick={handleRedo}>REDO</button>
      <button onClick={handleUndo}>UNDO</button>
      <h4>Applied</h4>
      <For each={past()} >
        {(command) => <div>{JSON.stringify(command)}</div>}
      </For>
      <h4>Queued</h4>
      <For each={future()} >
        {(command) => <div>{JSON.stringify(command)}</div>}
      </For>
      <InputDemo pipeIn={router} pipeOut={mailbox}></InputDemo>
      <Outline layers={state.layers}></Outline>
    </div>
  );
};

export default App;
