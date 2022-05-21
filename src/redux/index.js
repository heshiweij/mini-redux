// redux 的实现
export const createStore = (reducer) => {
  let state;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);

    // 更新 state 后，触发 subscribe
    listeners.forEach((l) => l());
  }

  function subscribe(listen) {
    listeners.push(listen);

    return () => {
      listeners.filter((l) => l !== listen);
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
};