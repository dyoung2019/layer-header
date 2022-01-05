import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import LayerHeader from './LayerHeader';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
        <div>A</div>
      </div>
      <LayerHeader></LayerHeader>
    </div>
  );
};

export default App;
