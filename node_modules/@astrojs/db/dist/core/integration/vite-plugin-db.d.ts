import type { AstroConfig } from 'astro';
import type { DBTables } from '../types.js';
import { type VitePlugin } from '../utils.js';
export declare const resolved: {
    virtual: string;
    seedVirtual: string;
};
export type LateTables = {
    get: () => DBTables;
};
export type LateSeedFiles = {
    get: () => Array<string | URL>;
};
type VitePluginDBParams = {
    connectToStudio: false;
    tables: LateTables;
    seedFiles: LateSeedFiles;
    srcDir: URL;
    root: URL;
    output: AstroConfig['output'];
} | {
    connectToStudio: true;
    tables: LateTables;
    appToken: string;
    srcDir: URL;
    root: URL;
    output: AstroConfig['output'];
};
export declare function vitePluginDb(params: VitePluginDBParams): VitePlugin;
export declare function getConfigVirtualModContents(): string;
export declare function getLocalVirtualModContents({ tables, root, seedFiles, shouldSeed, }: {
    tables: DBTables;
    seedFiles: Array<string | URL>;
    root: URL;
    shouldSeed: boolean;
}): string;
export declare function getStudioVirtualModContents({ tables, appToken, isBuild, output, }: {
    tables: DBTables;
    appToken: string;
    isBuild: boolean;
    output: AstroConfig['output'];
}): string;
export {};
