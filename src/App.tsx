import { BigFormContainer } from "src/components/bigFormContainer";
import "./App.css";
import { CSSProperties } from "react";

const listStyle: CSSProperties = {
  fontSize: "1.15rem",
  textAlign: "left",
};

function App() {
  return (
    <>
      <h2>Big Form Good Parts Example</h2>
      <ul style={listStyle}>
        <li>Non Reducer</li>
        <li>Non Context</li>
        <li>State Lift-Up</li>
        <li>State Lift-Down</li>
        <li>Component Patterns</li>
        <ul>
          <li>Container & Presentational</li>
          <li>Render Props</li>
          <li>Custom Hooks</li>
        </ul>
      </ul>
      <BigFormContainer />
    </>
  );
}

export default App;
