import ReactDOM from "react-dom/client";
import App from "./App1";

// interface WelcomeProps {
//   name: string;
// }

// const Welcome = (props: WelcomeProps): JSX.Element => {
//   return <h1>Hello, {props.name}</h1>;
// };

// const Welcome = ({ name }: { name: string }): JSX.Element => (
//   <h1>Hello, {name}</h1>
// );

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
