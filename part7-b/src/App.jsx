import { useCounter, useField } from "./CutomHook";

const App = () => {
  const counter = useCounter();
  const left = useCounter();
  const right = useCounter();

  // For form component
  const name = useField("text");
  console.log("returned by useField customHook: [name]", name);
  const birthdate = useField("date");
  const height = useField("number");

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
      <div>
        <h2>Custom Hook used in Form</h2>
        <form>
          name:
          <input type={name.type} value={name.value} onChange={name.onChange} />
          <br />
          birthdate:
          <input
            type={birthdate.type}
            value={birthdate.value}
            onChange={birthdate.onChange}
          />
          <br />
          height:
          <input
            type={height.type}
            value={height.value}
            onChange={height.onChange}
          />
        </form>
        <div>
          {name.value} || {birthdate.value} || {height.value}
        </div>
      </div>
      <hr />
    </>
  );
};

export default App;
