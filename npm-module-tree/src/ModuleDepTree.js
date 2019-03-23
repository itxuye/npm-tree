import React from "react";
import isEmpty from "lodash/isEmpty";

import DependencyList from "./DependencyList";

const ModuleDepTree = ({
  module: npmModule,
  version,
  dependencies = {},
  devDependencies = {},
  className = ""
}) => {
  return (
    <ul className={`module-list ${className}`}>
      <strong style={{ display: "block" }}>
        {npmModule}
        {version ? ` @ ${version}` : ""}
      </strong>
      <li>
        {isEmpty(dependencies) && isEmpty(devDependencies)
          ? "No Dependencies"
          : null}
        {isEmpty(dependencies) ? null : (
          <DependencyList dependencies={dependencies} />
        )}
        {isEmpty(devDependencies) ? null : (
          <DependencyList
            dependencies={devDependencies}
            type="Dev Dependencies"
          />
        )}
      </li>
    </ul>
  );
};

export default ModuleDepTree;
