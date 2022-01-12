interface TMailbox {
  send(redo: string[], undo: string[], params?:any): void;
}