interface TMailbox<TCommand> {
  send(redo: TCommand, undo: TCommand, params?:any): void;
}