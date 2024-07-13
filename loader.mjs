import { register } from "node:module";
import { pathToFileURL } from "node:url";

(async () => {
  await register("ts-node/esm", pathToFileURL("./"));
  await import('./backend/src/index.ts');
})();