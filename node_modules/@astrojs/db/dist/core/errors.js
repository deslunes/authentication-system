import { bold, cyan, red } from "kleur/colors";
const MISSING_SESSION_ID_ERROR = `${red("\u25B6 Login required!")}

  To authenticate with Astro Studio, run
  ${cyan("astro db login")}
`;
const MISSING_PROJECT_ID_ERROR = `${red("\u25B6 Directory not linked.")}

  To link this directory to an Astro Studio project, run
  ${cyan("astro db link")}
`;
const MISSING_EXECUTE_PATH_ERROR = `${red(
  "\u25B6 No file path provided."
)} Provide a path by running ${cyan("astro db execute <path>")}
`;
const RENAME_TABLE_ERROR = (oldTable, newTable) => {
  return red("\u25B6 Potential table rename detected: " + oldTable + ", " + newTable) + `
  You cannot add and remove tables in the same schema update batch.
  To resolve, add a 'deprecated: true' flag to '${oldTable}' instead.`;
};
const RENAME_COLUMN_ERROR = (oldSelector, newSelector) => {
  return red("\u25B6 Potential column rename detected: " + oldSelector + ", " + newSelector) + `
  You cannot add and remove columns in the same table.
  To resolve, add a 'deprecated: true' flag to '${oldSelector}' instead.`;
};
const FILE_NOT_FOUND_ERROR = (path) => `${red("\u25B6 File not found:")} ${bold(path)}
`;
const SHELL_QUERY_MISSING_ERROR = `${red(
  "\u25B6 Please provide a query to execute using the --query flag."
)}
`;
const EXEC_ERROR = (error) => {
  return `${red(`Error while executing file:`)}

${error}`;
};
const EXEC_DEFAULT_EXPORT_ERROR = (fileName) => {
  return EXEC_ERROR(`Missing default function export in ${bold(fileName)}`);
};
const INTEGRATION_TABLE_CONFLICT_ERROR = (integrationName, tableName, isUserConflict) => {
  return red("\u25B6 Conflicting table name in integration " + bold(integrationName)) + isUserConflict ? `
  A user-defined table named ${bold(tableName)} already exists` : `
  Another integration already added a table named ${bold(tableName)}`;
};
export {
  EXEC_DEFAULT_EXPORT_ERROR,
  EXEC_ERROR,
  FILE_NOT_FOUND_ERROR,
  INTEGRATION_TABLE_CONFLICT_ERROR,
  MISSING_EXECUTE_PATH_ERROR,
  MISSING_PROJECT_ID_ERROR,
  MISSING_SESSION_ID_ERROR,
  RENAME_COLUMN_ERROR,
  RENAME_TABLE_ERROR,
  SHELL_QUERY_MISSING_ERROR
};
