import { useCounter } from "./CutomHook";

const App = () => {
  const counter = useCounter();
  const left = useCounter();
  const right = useCounter();

  return (
    <>
      <div>
        <h2>useCounter - CustomHook1</h2>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>plus</button>
        <button onClick={counter.decrease}>minus</button>
        <button onClick={counter.zero}>zero</button>
      </div>
      <hr />
      <div>
        <h2>useCounter - CustomHook2</h2>
        {left.value}
        <button onClick={left.increase}>left</button>
        <button onClick={right.increase}>right</button>
        {right.value}
      </div>
      <hr />
    </>
  );
};

export default App;
