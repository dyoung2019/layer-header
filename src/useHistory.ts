import { createSignal } from "solid-js";
import type { TRouteDirectory } from './useDirectory'

type TMessage = { redo: NonNullable<any[]>, undo: NonNullable<any[]>, params: any }
type TFutures = Array<TMessage>;

/**
 * Builds undo / redo history
 * 
 * @param {mutator} mutator - mutator function which will change
 * @param {Object} initialState - the initial state to be set at the beginning 
 * @param {Object[]=} deps - dependency of react hook components
 * @returns {Array.<string, number>.<string>} - array of react hook components
 */
export default function useHistory(
  router: TRouteDirectory
) {
  type TApplyResult = any | null

  const [past, setPast] = createSignal<TFutures>([])
  const [future, setFuture] = createSignal<TFutures>([])
  const [stackFrames, setStackFrames] = createSignal<Array<TApplyResult>>([])

  const load = (
    queuedCommands: TFutures,
    appliedCommands: TFutures,
    frames: TApplyResult[],
  ): void => {
    setFuture(queuedCommands);
    setPast(appliedCommands);
    setStackFrames(frames);
  }

  // Handling Undo
  const undo = async () => {
    const getLastChange = () => new Promise<TMessage>((resolve, reject) => {
      const count = past().length;
      if (count === 0) {
        reject('has no changes to undo')
      } else {
        const lastIndex = count - 1;
        resolve(past()[lastIndex]);
      }
    });

    const getLastSnapshot = () => new Promise<TApplyResult>((resolve, reject) => {
      if (stackFrames().length === 0) {
        reject('has no frames to undo');
      } else {
        resolve(stackFrames()[0]);
      }
    });

    const applyUndo = async (params: [msg: TMessage, snapshot: TApplyResult]) => {
      const [msg, snapshot] = params;
      return applyChange(msg.undo, msg.params, snapshot);
    }

    const dropStackFrame = () => {
      const noOfFrames = stackFrames().length;
      const rest = stackFrames().slice(0, noOfFrames - 1);
      setStackFrames(rest);
    }

    const dropPastChange = () => {
      const length = past().length;
      const rest = past().slice(0, length - 1);
      setPast(rest);
    }

    const insertMessageBackInQueue = (msg: TMessage) => {
      setFuture([msg, ...future()]);
    }

    let currentMessage: TMessage;
    return Promise.all([getLastChange(), getLastSnapshot()])
      .then((result) => {
        currentMessage = result[0];
        return applyUndo(result);
      })
      .then(dropStackFrame)
      .then(dropPastChange)
      .then(() => insertMessageBackInQueue(currentMessage))
      .then(() => true);
  }

  const applyChange = async (action: NonNullable<any[]>, params: any, snapshot: TApplyResult) => {
    // Set the present to the element we removed in the previous step
    const route = router.recognize(action);

    if (!route) {
      throw new Error('redo handler missing')
    }

    const subPath = action[1]
    const handler = route.handler;

    if (!handler) {
      throw new Error('redo handler missing')
    }
    return handler(subPath, params, snapshot);
  }

  const redo = async () => {
    const getNextMessage = () => new Promise<TMessage>((resolve, reject) => {
      if (future().length <= 0) {
        reject('future command not found');
      } else {
        resolve(future()[0])
      }
    });

    const applyRedo = (msg: TMessage) => {
      return applyChange(msg.redo, msg.params, null)
    }

    const preserveSnapshot = (snapshot: any) => {
      setStackFrames([snapshot, ...stackFrames()]);
    }

    const moveMessageOffQueue = () => {
      const markMessageAsApplied = (msg: TMessage) => {
        setPast([...past(), msg]);
      }

      const adjustQueue = (elements: TFutures) => {
        //  Insert the old present state at the end of the past.
        setFuture(elements)
      }

      const [front, ...rest] = future();
      markMessageAsApplied(front);
      adjustQueue(rest);
    }

    return getNextMessage()
      .then(applyRedo)
      .then(preserveSnapshot)
      .then(moveMessageOffQueue)
      .then(() => true)
  }

  const queue = (
    redo: any[],
    undo: any[],
    params?: any
  ): void => {
    const msg: TMessage = {
      redo,
      undo,
      params: params !== undefined ? { ...params } : {},
    }
    setFuture([...future(), msg])
  }

  return {
    undo,
    redo,
    queue,
    load,
    past,
    future,
    stackFrames
  }
}