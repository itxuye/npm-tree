import React from "react";
import ReactDOM from "react-dom";
import pick from "lodash/pick";
import ConnectedNPMModule from "./ConnectedNPMModule";
import "./styles.css";

function App() {
  const [module, setModule] = React.useState({
    version: "latest"
  });
  const handleChange = event => {
    const value = event.target.value.trim() || event.target.defaultValue;
    if (value.length) {
      setModule({ [event.target.name]: value, version: "latest" });
    }
  };
  return (
    <div className="App">
      <header>
        <h2>NPM Module Dependency Tree</h2>
      </header>
      <div>
        <label>Module:</label>
        <input type="text" name="module" onBlur={handleChange} />
      </div>
      {module ? (
        <ConnectedNPMModule
          className="module-tree"
          {...pick(module, "module", "version")}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
