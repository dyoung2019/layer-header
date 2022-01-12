import { Accessor, createSignal } from "solid-js";

type TMessage<TCommand> = { redo: NonNullable<TCommand>, undo: NonNullable<TCommand>, params: any }
type TFutures<TCommand> = Array<TMessage<TCommand>>;

interface UndoRedoHistory<TState, TAction, TSnapshot> {
  current: Accessor<TState>,
  onUndo: () => boolean;
  onRedo: () => boolean;
  onSend: (redo: NonNullable<TAction>, undo: NonNullable<TAction>, params?: any) => void;
  onBulkLoad: (commands: TFutures<TAction>) => void;
  past: Accessor<TFutures<TAction>>;
  future: Accessor<TFutures<TAction>>;
  stackFrames: Accessor<Array<TSnapshot|null>>;
}

/**
 * Builds undo / redo history
 * 
 * @param {mutator} mutator - mutator function which will change
 * @param {Object} initialState - the initial state to be set at the beginning 
 * @param {Object[]=} deps - dependency of react hook components
 * @returns {Array.<string, number>.<string>} - array of react hook components
 */
export default function useHistory<TState, TCommand, TSnapshot>(
  mutator: (
    state: TState,
    command: NonNullable<TCommand>,
    snapshot: TSnapshot | null
  ) => TSnapshot | never | undefined,
  initialState: TState
): UndoRedoHistory<TState, TCommand, TSnapshot> {
  type TInternalState = TState
  // type TMessage = { redo: NonNullable<TAction>, undo: NonNullable<TAction>, params: any }

  type TApplyResult = [TInternalState, TSnapshot|null]

  const [current, setCurrent] = createSignal(initialState);
  const [past, setPast] = createSignal<TFutures<TCommand>>([])
  const [future, setFuture] = createSignal<TFutures<TCommand>>([])
  const [stackFrames, setStackFrames] = createSignal<Array<TSnapshot|null>>([])
  // const [isBatching, setIsBatching] = useState<boolean>(true)

  // Handling Other Action
  const onBulkLoad = (commands: TFutures<TCommand>): void => {
    setFuture([...future(), ...commands])
  }

  const queueActions = (commands: TFutures<TCommand>): void => {
    // Clear the future & replace with single action
    setFuture(commands)
  }

  const hasNoChangesToUndo = (): boolean => {
    return past().length === 0
  }

  const undoAction = (action: NonNullable<TCommand>, snapshot: TSnapshot|null): TInternalState => {
    const clonedState = { ...current() };
    mutator(clonedState, action, snapshot)
    return clonedState;
  }

  const updatePresentState = (action: NonNullable<TCommand>): void => {
    const [topFrame, ...remainingFrames] = stackFrames();
    const updatedState = undoAction(action, topFrame);

    setCurrent(() => updatedState);
    setStackFrames(remainingFrames);
  }

  const applyAction = (action: NonNullable<TCommand>): TApplyResult => {
    const clonedState: TInternalState = { ...current() }
    const snapshot: TSnapshot|null = mutator(clonedState, action, null) || null;
    return [clonedState, snapshot]
  }

  const pushPresentState = (action: NonNullable<TCommand>): void => {
    const [updatedState, snapshot] = applyAction(action);
    setCurrent(() => updatedState);

    setStackFrames([snapshot, ...stackFrames()])
  }

  // Handling Undo
  const onUndo = (): boolean => {

    if (hasNoChangesToUndo()) {
      return false
    }

    const pastChanges: TFutures<TCommand> = [...past()]
    // Remove the last element from the past.
    const output = pastChanges.pop();

    if (!!output) {
      const msg = {
        undo: output.undo,
        redo: output.redo,
        params: { ...output.params }
      };
      updatePresentState(msg.undo);

      setPast(pastChanges);
      // Insert the old present state at the beginning of the future.
      setFuture([msg, ...future()]);

      return true;
    } else {
      return false;
    }
  }

  const hasNoChangesToRedo = ():boolean => {
    return future().length === 0
  }

  const onRedo = ():boolean => {
    if (hasNoChangesToRedo()) {
      return false
    }
  
    // Remove the first element from the future.
    const [command, ...remainingElements] = future()
    
    // Set the present to the element we removed in the previous step
    pushPresentState(command.redo)

    //  Insert the old present state at the end of the past.
    setPast([...past(), command])
    setFuture(remainingElements)
    return true
  }  

  const onSend = (
    redo: NonNullable<TCommand>,
    undo: NonNullable<TCommand>, 
    params?: any
  ): void => {
    const msg: TMessage<TCommand> = {
      redo,
      undo,
      params: params !== undefined ? { ...params } : {},
    }
    // console.log(actions, params)
    queueActions([msg]) 
  }

  return {
    current,
    onUndo,
    onRedo,
    onSend,
    onBulkLoad,
    past,
    future,
    // isBatching,
    // setIsBatching,
    stackFrames
  }
}