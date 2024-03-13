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
        <li>Lift Up Pattern</li>
        <li>Separate Component</li>
      </ul>
      <BigFormContainer />
    </>
  );
}

export default App;
