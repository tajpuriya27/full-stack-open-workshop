// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import ReactDOM from "react-dom/client";

// interface WelcomeProps {
//   name: string;
// }

// const Welcome = (props: WelcomeProps): JSX.Element => {
//   return <h1>Hello, {props.name}</h1>;
// };

const Welcome = ({ name }: { name: string }): JSX.Element => (
  <h1>Hello, {name}</h1>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Welcome name="Sarah" />
);
