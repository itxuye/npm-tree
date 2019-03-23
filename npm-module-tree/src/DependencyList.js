import React, { Component } from "react";

import ConnectedNPMModule from "./ConnectedNPMModule";

class DependencyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: []
    };
  }
  expand(moduleName) {
    this.setState({
      expanded: [...this.state.expanded, moduleName]
    });
  }
  isExpanded(moduleName) {
    return this.state.expanded[moduleName];
  }
  render() {
    const { type, dependencies } = this.props;
    const { expanded } = this.state;

    return (
      <div>
        <em>{type}</em>
        <ul className="dep-list">
          {Object.entries(dependencies).map(([moduleName, version], index) =>
            expanded.includes(moduleName) ? (
              <li key={`dep-${index}`}>
                <ConnectedNPMModule module={moduleName} version={version} />
              </li>
            ) : (
              <li key={`dep-${index}`}>
                <button onClick={() => this.expand(moduleName)}>
                  展开
                </button>
                {moduleName} @ {version}
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

DependencyList.defaultProps = {
  type: "Dependencies",
  dependencies: {},
  onExpandRequested: () => {}
};

export default DependencyList;
