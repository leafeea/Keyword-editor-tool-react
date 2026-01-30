import React, { useState, useEffect } from 'react';
import { useHistory } from './hooks/useHistory';
import TextWorker from './workers/textProcessor?worker';
import { Operation } from './enums/Operation.enum';
import { CASE_OPERATIONS, CLEAN_OPERATIONS, SORT_OPERATIONS, WRAP_OPERATIONS } from './constants/operationButtons';

const worker = new TextWorker();

function App() {
  const { state: text, push, undo, redo, canUndo, canRedo } = useHistory('');
  const [draft, setDraft] = useState(text);
  const [metrics, setMetrics] = useState({ lines: 0, empty: 0, time: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [findStr, setFindStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');

  const renderButtons = (items: { op: Operation; label: string }[]) =>
  items.map(({ op, label }) => (
    <button
      key={op}
      onClick={() => runOperation(op)}
      disabled={isProcessing}
      className="btn-primary"
    >
      {label}
    </button>
  ));

  useEffect(() => {
    setDraft(text);
  }, [text]);

  useEffect(() => {
    const lines = text.split('\n');
    setMetrics(m => ({
      ...m,
      lines: lines.length,
      empty: lines.filter(l => !l.trim()).length
    }));
  }, [text]);

  useEffect(() => {
    worker.onmessage = (e) => {
      const { result, time } = e.data;
      push(result); 
      setMetrics(m => ({ ...m, time }));
      setIsProcessing(false);
    };
  }, [push]);

  const runOperation = (operation: Operation) => {
    if (isProcessing) return;
    setIsProcessing(true);
    worker.postMessage({ 
      text, 
      operation, 
      params: { find: findStr, replace: replaceStr } 
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => push(ev.target?.result as string);
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "keywords.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="h-screen bg-gray-100 p-4 md:p-8 flex flex-col gap-4 overflow-hidden">
      <header className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Keyword Editor Tool</h1>
        <div className="flex gap-2 text-sm text-gray-600">
          <a target='_blank' href="https://github.com/leafeea">GitHub</a>
          <span>Рядків: <b>{metrics.lines}</b></span>
          <span>Порожніх: <b>{metrics.empty}</b></span>
          <span>Останній час: <b>{metrics.time.toFixed(2)}ms</b></span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        <aside className="lg:w-1/4 flex flex-col gap-4 h-full min-h-0">
            <div className="bg-white p-4 rounded shadow-sm flex flex-col gap-2">
              <h3 className="font-semibold text-gray-700">Історія</h3>
              <div className="flex gap-2">
                <button onClick={undo} disabled={!canUndo || isProcessing} className="btn-secondary flex-1">Undo</button>
                <button onClick={redo} disabled={!canRedo || isProcessing} className="btn-secondary flex-1">Redo</button>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow-sm flex flex-col gap-2">
              <h3 className="font-semibold text-gray-700">Файл</h3>
              <div className="flex gap-2">
                  <label className="btn-secondary flex-1 text-center cursor-pointer">
                    Import
                    <input type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
                  </label>
                  <button onClick={handleDownload} className="btn-secondary flex-1">Export</button>
              </div>
              <button onClick={() => push('')} className="btn-danger mt-2">Очистити все</button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
              <div className="bg-white p-4 rounded shadow-sm flex flex-col gap-2">
                <h3 className="font-semibold text-gray-700">Регістр</h3>
                {renderButtons(CASE_OPERATIONS)}
              </div>

              <div className="bg-white p-4 rounded shadow-sm flex flex-col gap-2">
                <h3 className="font-semibold text-gray-700">Символи / Обрамлення</h3>
                {renderButtons(WRAP_OPERATIONS)}
              </div>

              <div className="bg-white p-4 rounded shadow-sm flex flex-col gap-2">
                <h3 className="font-semibold text-gray-700">Очищення</h3>
                {renderButtons(CLEAN_OPERATIONS)}
              </div>
              
              <div className="bg-white p-4 rounded shadow-sm flex flex-col gap-2">
                <h3 className="font-semibold text-gray-700">Сортування</h3>
                {renderButtons(SORT_OPERATIONS)}
              </div>
              
              <div className="bg-white p-4 rounded shadow-sm flex flex-col gap-2">
                <h3 className="font-semibold text-gray-700">Пошук / Заміна</h3>
                <input 
                  className="border p-1 rounded" placeholder="Знайти" 
                  value={findStr} onChange={e => setFindStr(e.target.value)}
                  disabled={isProcessing} 
                />
                <input 
                  className="border p-1 rounded" placeholder="Замінити на" 
                  value={replaceStr} onChange={e => setReplaceStr(e.target.value)}
                  disabled={isProcessing} 
                />
                <button onClick={() => runOperation(Operation.Replace)} disabled={isProcessing} className="btn-primary">Замінити все</button>
              </div>
            </div>
        </aside>
        <main className="flex-1 bg-white rounded shadow-sm p-4 relative flex flex-col">
          {isProcessing && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
              <span className="text-blue-600 font-bold animate-pulse">Processing...</span>
            </div>
          )}
          <textarea
            className="w-full h-full min-h-125 resize-none outline-none font-mono text-sm p-2 border rounded"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => push(draft)}
            placeholder="Вставте ваші фрази сюди..."
            spellCheck={false}
          />
        </main>
      </div>
    </div>
  );
}

export default App;