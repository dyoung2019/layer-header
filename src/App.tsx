import { Component, onMount, from } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import LayerHeader from './LayerHeader';
import InputDemo from './InputDemo';
import useHistory from './useHistory';
import simpleReducer from './simpleReducer';
const App: Component = () => {
  const {onBulkLoad, future} = useHistory(simpleReducer, {});

  onMount(() => {
    onBulkLoad([
      { redo: { type: 'XR' }, undo: { type: 'BR'}, params: null }
    ])
  })

  const mailbox = {
    send: (r: string, u: string, params?: any) => {
      console.log('msg',r, u)
    }
  }

  return (
    <div class={styles.App}>
      {JSON.stringify(future())}
      <InputDemo mailbox={mailbox}></InputDemo>
      <LayerHeader></LayerHeader>
    </div>
  );
};

export default App;
