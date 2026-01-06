/// <reference lib="webworker" />
import * as Comlink from 'comlink';
// We import the type only to keep the worker lightweight
import type { Database } from '@sqlite.org/sqlite-wasm';

let db: any = null;

const parserWorker = {
  async initDb() {
    if (db) return;

    // Wir nutzen den absoluten Pfad basierend auf der aktuellen URL
    const origin = self.location.origin;
    const wasmUrl = `${origin}/jswasm/sqlite3.wasm`;
    const jsUrl = `${origin}/jswasm/sqlite3.js`;

    // FIX: sqlite3.js überschreibt die locateFile config, wenn wir sie an sqliteInitModule übergeben.
    // Stattdessen müssen wir den globalen State `sqlite3InitModuleState` setzen.

    // Debug helper
    const originalFetch = self.fetch;
    self.fetch = async (input, init) => {
      console.log('[Worker] fetch intercepted:', input);
      // Fallback: Wenn input sqlite3.wasm ist, nutze die absolute URL
      if (typeof input === 'string' && input.endsWith('sqlite3.wasm')) {
        console.log('[Worker] Redirecting fetch to:', wasmUrl);
        return originalFetch(wasmUrl, init);
      }
      return originalFetch(input, init);
    };

    // @ts-ignore
    self.sqlite3InitModuleState = {
      debugModule: (...args: any[]) => console.log('[SQLite3 Debug]', ...args),
      urlParams: new Map([
        ['sqlite3.wasm', wasmUrl],
        ['./sqlite3.wasm', wasmUrl],
        ['/sqlite3.wasm', wasmUrl]
      ])
    };

    console.log('[Worker] GLOBAL CHECK:', self === globalThis);
    // @ts-ignore
    console.log('[Worker] sqlite3InitModuleState set:', self.sqlite3InitModuleState);

    console.log('[Worker] Loading SQLite from:', jsUrl);
    importScripts(jsUrl);

    try {
      console.log('[Worker] Initializing SQLite module...');
      // @ts-ignore
      const sqlite3 = await sqlite3InitModule({
        print: console.log,
        printErr: console.error,
      });

      if ('opfs' in sqlite3) {
        db = new sqlite3.oo1.OpfsDb('/liberdata.sqlite3');
        console.log('✅ SQLite OPFS Ready');
      } else {
        db = new sqlite3.oo1.DB();
        console.log('⚠️ SQLite In-Memory Ready');
      }

      db.exec("CREATE TABLE IF NOT EXISTS staging_data (id INTEGER PRIMARY KEY, raw_json TEXT)");
    } catch (err) {
      console.error('❌ SQLite Init Error:', err);
      throw err; // Damit wir den Fehler im UI sehen
    }
  },
  async processFile(file: File) {
    await this.initDb();
    console.log('[Worker] Processing:', file.name);
    return { success: true, message: "Datei empfangen und DB bereit" };
  }

};

Comlink.expose(parserWorker);