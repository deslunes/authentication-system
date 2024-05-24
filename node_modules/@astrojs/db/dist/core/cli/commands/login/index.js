import { mkdir, writeFile } from "node:fs/promises";
import { createServer as _createServer } from "node:http";
import { listen } from "async-listen";
import { cyan } from "kleur/colors";
import open from "open";
import ora from "ora";
import { SESSION_LOGIN_FILE } from "../../../tokens.js";
import { getAstroStudioUrl } from "../../../utils.js";
async function createServer() {
  let resolve, reject;
  const server = _createServer((req, res) => {
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const sessionParam = url.searchParams.get("session");
    res.statusCode = 302;
    if (!sessionParam) {
      res.setHeader("location", getAstroStudioUrl() + "/auth/cli/error");
      reject(new Error("Failed to log in"));
    } else {
      res.setHeader("location", getAstroStudioUrl() + "/auth/cli/success");
      resolve(sessionParam);
    }
    res.end();
  });
  const { port } = await listen(server, 0, "127.0.0.1");
  const serverUrl = `http://localhost:${port}`;
  const sessionPromise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  }).finally(() => {
    server.closeAllConnections();
    server.close();
  });
  return { url: serverUrl, promise: sessionPromise };
}
async function cmd({
  flags
}) {
  let session = flags.session;
  if (!session) {
    const { url, promise } = await createServer();
    const loginUrl = getAstroStudioUrl() + "/auth/cli/login?returnTo=" + encodeURIComponent(url);
    console.log(`Opening the following URL in your browser...`);
    console.log(cyan(loginUrl));
    console.log(`If something goes wrong, copy-and-paste the URL into your browser.`);
    open(loginUrl);
    const spinner = ora("Waiting for confirmation...");
    session = await promise;
    spinner.succeed("Successfully logged in!");
  }
  await mkdir(new URL(".", SESSION_LOGIN_FILE), { recursive: true });
  await writeFile(SESSION_LOGIN_FILE, `${session}`);
}
export {
  cmd
};
