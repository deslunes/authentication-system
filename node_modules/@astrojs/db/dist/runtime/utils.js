import { AstroError } from "astro/errors";
async function safeFetch(url, options = {}, onNotOK = () => {
  throw new Error(`Request to ${url} returned a non-OK status code.`);
}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    await onNotOK(response);
  }
  return response;
}
class AstroDbError extends AstroError {
  name = "Astro DB Error";
}
export {
  AstroDbError,
  safeFetch
};
