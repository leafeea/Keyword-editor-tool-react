import { describe, it, expect } from 'vitest';
import { arrayOperations } from './arrayOperations';
import { Operation } from '../enums/Operation.enum';

describe('arrayOperations', () => {
  const input = ['сік', 'яблуко', 'груша', 'сік'];

  it('SortAZ sorts strings A-Z (uk locale)', () => {
    const result = arrayOperations[Operation.SortAZ]!(input);
    expect(result).toEqual(['груша', 'сік', 'сік', 'яблуко']);
  });

  it('SortZA sorts strings Z-A (uk locale)', () => {
    const result = arrayOperations[Operation.SortZA]!(input);
    expect(result).toEqual(['яблуко', 'сік', 'сік', 'груша']);
  });

  it('Deduplicate removes duplicates but keeps order', () => {
    const result = arrayOperations[Operation.Deduplicate]!(input);
    expect(result).toEqual(['сік', 'яблуко', 'груша']);
  });

  it('Does not mutate original array', () => {
    const copy = [...input];
    arrayOperations[Operation.SortAZ]!(input);
    expect(input).toEqual(copy);
  });
});
