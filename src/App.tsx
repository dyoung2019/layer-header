import { Component, onMount, from, For, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store'

import logo from './logo.svg';
import styles from './App.module.css';
import LayerHeader from './LayerHeader';
import InputDemo from './InputDemo';

import useDirectory from './useDirectory';
import useHistory from './useHistory';
import { LayerPropertyFlags } from './LayerPropertyFlags';
import Outline from './Outline';
import { LayerInfoMember } from './LayerInfo';
import useLayerViewBindings from './useLayerViewBindings';
import useLayerViewReducer from './useLayerViewReducer';

const App: Component = () => {
  const [state, setState] = createStore({
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

  const directory = useDirectory();
  const {undo, redo, past, future, queue} = useHistory(directory);

  const mailbox = {
    send: (r: any[], u: any[], params?: any) => {
      queue(r, u, params)
    }
  }

  const [selectedId, setSelectedId] = createSignal<number>(-1)
  const lvBindings = useLayerViewBindings(selectedId, mailbox);
  const lvReducer = useLayerViewReducer(directory);

  const handleRedo = async () => {
    redo()
      .catch(e => console.log(e));
  }

  const handleUndo = async () => {
    undo()
      .catch(e => console.log(e));
  }

  const handleLayerChange = (index: number, field: LayerInfoMember, value: any) => {
    setState('layers', index, field, value);
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
      <Outline selectedId={selectedId} setSelectedId={setSelectedId}
        layers={state.layers} onLayerChange={handleLayerChange}></Outline>
    </div>
  );
};

export default App;
