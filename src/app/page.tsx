'use client';

import { useState } from 'react';
import * as Comlink from 'comlink';

export default function Home() {
  const [status, setStatus] = useState<string>('System Idle');

  /**
   * Handles the file selection and offloads the parsing task to the Web Worker.
   */
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus('Processing...');

    // Initialize the Web Worker using the native URL constructor
    const worker = new Worker(new URL('../workers/parser.worker.ts', import.meta.url));

    // Wrap the worker with Comlink for easy-to-use proxy communication
    const api = Comlink.wrap<any>(worker);

    try {
      // The heavy lifting happens in the background. UI thread is not blocked.
      const result = await api.processFile(file);
      setStatus(`Success: Extracted ${result.recordsFound} entries.`);
    } catch (error) {
      console.error('[UI Error]', error);
      setStatus('Processing failed. Check console for details.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-slate-50">
      <div className="max-w-2xl w-full p-8 bg-white shadow-xl rounded-2xl border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">LiberData Vault</h1>
        <p className="text-slate-500 mb-8">Personal Data Portability Engine (Local-First Proof of Concept)</p>

        <div className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Status: {status}</p>
          </div>

          <label className="block">
            <span className="sr-only">Choose data export (ZIP/JSON)</span>
            <input
              type="file"
              onChange={handleFileUpload}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-700 transition-all cursor-pointer"
            />
          </label>

          <p className="text-xs text-slate-400 text-center">
            Zero-Knowledge: All processing happens locally in your browser.
          </p>
        </div>
      </div>
    </main>
  );
}