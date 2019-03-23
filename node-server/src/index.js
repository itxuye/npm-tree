import _ from "lodash";
import fetchNode from "node-fetch";
import pick from "lodash/pick";

import restify from "restify";
import memoize from "fast-memoize";

const server = restify.createServer();

const sendAsJSON = res => value => res.json(200, value);
const sendErrorAsJSON = res => () =>
  res.json(500, { error: "Internal Server Error" });

const handleModuleDepRequest = memoize(fetchModuleDependencies);

server.get("/:npmModule/:version", function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  handleModuleDepRequest(
    req.params.npmModule,
    req.params.version !== "latest"
      ? [...req.params.version].slice(1).join("")
      : req.params.version
  )
    .then(sendAsJSON(res))
    .catch(sendErrorAsJSON(res))
    .then(next);
});

server.get("/:npmModule", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  handleModuleDepRequest(req.params.npmModule, "latest")
    .then(sendAsJSON(res))
    .catch(sendErrorAsJSON(res))
    .then(next);
});

function fetchModuleDependencies(moduleName, version, fetch = fetchNode) {
  return fetch(`https://registry.npmjs.org/${moduleName}/${version}`)
    .then(res =>
      res.ok
        ? res.json()
        : Promise.reject(
            new Error(`couldn't locate module ${moduleName}@${version}`)
          )
    )
    .then(res => ({
      [moduleName]: {
        [version]: pick(res, ["dependencies", "devDependencies"])
      }
    }))
    .catch(e => ({
      error: e.message
    }));
}

server.listen(3004, function() {
  console.log("%s listening at %s", server.name, server.url);
});
