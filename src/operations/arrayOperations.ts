import { Operation } from '../enums/Operation.enum';

export type ArrayOperation = (lines: string[]) => string[];

export const arrayOperations: Partial<Record<Operation, ArrayOperation>> = {
  [Operation.SortAZ]: (lines) =>{
    console.log(lines);
    console.log([...lines].sort((a, b) => a.localeCompare(b, 'uk')))
    return([...lines].sort((a, b) => a.localeCompare(b, 'uk')))
  },

  [Operation.SortZA]: (lines) =>{
    console.log(lines);
    console.log([...lines].sort((a, b) => b.localeCompare(a, 'uk')))
    return([...lines].sort((a, b) => b.localeCompare(a, 'uk')))
  },
    

  [Operation.Deduplicate]: (lines) =>
    Array.from(new Set(lines)),
};