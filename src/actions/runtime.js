const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';

export function runtime({ name, value }) {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value,
    },
  };
}
