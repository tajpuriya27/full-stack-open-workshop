const App = (props) => {
  const store = props.storeToSubscribe;
  return (
    <>
      <h1>Counter with Redux</h1>
      <h2>{store.getState()}</h2>
      <button
        onClick={() => {
          store.dispatch({ type: "increment" });
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          store.dispatch({ type: "makeZero" });
        }}
      >
        Zero
      </button>
      <button
        onClick={() => {
          store.dispatch({ type: "decrement" });
        }}
      >
        Minus
      </button>
    </>
  );
};

export default App;
