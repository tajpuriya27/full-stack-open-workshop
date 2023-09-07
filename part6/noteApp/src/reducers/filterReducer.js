const filterReducer = (state = "ALL", action) => {
  console.log(`Logging from FilterReducer:: state: ${state}, action:`, action);
  return state;
};

export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default filterReducer;
