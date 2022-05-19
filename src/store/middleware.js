const observableToPromise = () => (next) => {
  let pending = {};
  return (action) => {
    let ret = next(action);

    if (action.meta && action.meta.promise) {
      ret = new Promise((resolve, reject) => {
        pending[action.meta.promise.resolve] = resolve;
        pending[action.meta.promise.reject] = reject;
      });
      next(action);
    }

    if (pending[action.type]) {
      const resolveOrReject = pending[action.type];
      delete pending[action.type];
      resolveOrReject(action.payload);
    }

    return ret;
  };
};

export default observableToPromise;
