import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { type DBTables } from '../core/types.js';
export declare function seedLocal({ db, tables, userSeedGlob, integrationSeedFunctions, }: {
    db: LibSQLDatabase;
    tables: DBTables;
    userSeedGlob: Record<string, {
        default?: () => Promise<void>;
    }>;
    integrationSeedFunctions: Array<() => Promise<void>>;
}): Promise<void>;
