const counterReducer = (state = 0, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "increment": {
      const newState = state + 1;
      return newState;
    }
    case "decrement": {
      const newState = state - 1;
      return newState;
    }
    case "makeZero": {
      return 0;
    }

    default:
      return state;
  }
};

export default counterReducer;
