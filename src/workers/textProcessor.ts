import { lineOperations } from '../operations/lineOperations';
import { arrayOperations } from '../operations/arrayOperations';
import type { Operation } from '../enums/Operation.enum';

interface WorkerMessage {
  text: string;
  operation: Operation;
  params?: any;
}

self.onmessage = (e:MessageEvent<WorkerMessage>) => {
  const { text, operation, params } = e.data;

  let lines = text.split(/\r\n|\n|\r/);

  const startTime = performance.now();
  console.log('WORKER OPERATION:', e.data.operation);

  if (arrayOperations[operation]) {
    lines = arrayOperations[operation]!(lines);
  } else if (lineOperations[operation]) {
    const fn = lineOperations[operation]!;
    lines = lines.map(l => fn(l, params));
  }

  const endTime = performance.now();

  self.postMessage({
    result: lines.join('\n'),
    linesCount: lines.length,
    emptyCount: lines.filter(l => !l.trim()).length,
    time: endTime - startTime 
  });
};
