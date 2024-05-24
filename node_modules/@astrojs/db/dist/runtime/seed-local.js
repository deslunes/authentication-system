import { LibsqlError } from "@libsql/client";
import { sql } from "drizzle-orm";
import { SQLiteAsyncDialect } from "drizzle-orm/sqlite-core";
import {} from "../core/types.js";
import { SEED_DEFAULT_EXPORT_ERROR } from "./errors.js";
import { getCreateIndexQueries, getCreateTableQuery } from "./queries.js";
import { AstroDbError } from "./utils.js";
const sqlite = new SQLiteAsyncDialect();
async function seedLocal({
  db,
  tables,
  // Glob all potential seed files to catch renames and deletions.
  userSeedGlob,
  integrationSeedFunctions
}) {
  await recreateTables({ db, tables });
  const seedFunctions = [];
  const seedFilePath = Object.keys(userSeedGlob)[0];
  if (seedFilePath) {
    const mod = userSeedGlob[seedFilePath];
    if (!mod.default)
      throw new AstroDbError(SEED_DEFAULT_EXPORT_ERROR(seedFilePath));
    seedFunctions.push(mod.default);
  }
  for (const seedFn of integrationSeedFunctions) {
    seedFunctions.push(seedFn);
  }
  for (const seed of seedFunctions) {
    try {
      await seed();
    } catch (e) {
      if (e instanceof LibsqlError) {
        throw new AstroDbError(`Failed to seed database:
${e.message}`);
      }
      throw e;
    }
  }
}
async function recreateTables({ db, tables }) {
  const setupQueries = [];
  for (const [name, table] of Object.entries(tables)) {
    const dropQuery = sql.raw(`DROP TABLE IF EXISTS ${sqlite.escapeName(name)}`);
    const createQuery = sql.raw(getCreateTableQuery(name, table));
    const indexQueries = getCreateIndexQueries(name, table);
    setupQueries.push(dropQuery, createQuery, ...indexQueries.map((s) => sql.raw(s)));
  }
  await db.batch([
    db.run(sql`pragma defer_foreign_keys=true;`),
    ...setupQueries.map((q) => db.run(q))
  ]);
}
export {
  seedLocal
};
