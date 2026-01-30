import { describe, it, expect } from 'vitest';
import { lineOperations } from './lineOperations';
import { Operation } from '../enums/Operation.enum';

describe('lineOperations', () => {
  it('Uppercase', () => {
    expect(lineOperations[Operation.Uppercase]?.('сік')).toBe('СІК');
  });

  it('Lowercase', () => {
    expect(lineOperations[Operation.Lowercase]?.('СІК')).toBe('сік');
  });

  it('CapitalizeWords', () => {
    expect(
      lineOperations[Operation.CapitalizeWords]?.('яблуко груша')
    ).toBe('Яблуко Груша');
  });

  it('CapitalizeFirst', () => {
    expect(
      lineOperations[Operation.CapitalizeFirst]?.('яблуко')
    ).toBe('Яблуко');
  });

  it('PrependPlus', () => {
    expect(
      lineOperations[Operation.PrependPlus]?.('яблуко груша')
    ).toBe('+яблуко +груша');
  });

  it('RemovePlus', () => {
    expect(
      lineOperations[Operation.RemovePlus]?.('+яблуко +груша')
    ).toBe('яблуко груша');
  });

  it('WrapQuotes', () => {
    expect(
      lineOperations[Operation.WrapQuotes]?.(' яблуко ')
    ).toBe('"яблуко"');
  });

  it('WrapBrackets', () => {
    expect(
      lineOperations[Operation.WrapBrackets]?.(' яблуко ')
    ).toBe('[яблуко]');
  });

  it('PrependDash', () => {
    expect(
      lineOperations[Operation.PrependDash]?.('яблуко')
    ).toBe('-яблуко');
  });

  it('CleanSpaces', () => {
    expect(
      lineOperations[Operation.CleanSpaces]?.('  яблуко   груша  ')
    ).toBe('яблуко груша');
  });

  it('CleanTabs', () => {
    expect(
      lineOperations[Operation.CleanTabs]?.('яб\tлу\tко')
    ).toBe('яблуко');
  });

  it('CleanAfterDash', () => {
    expect(
      lineOperations[Operation.CleanAfterDash]?.('яблуко - груша')
    ).toBe('яблуко');
  });

  it('SpacesToUnderscore', () => {
    expect(
      lineOperations[Operation.SpacesToUnderscore]?.('яблуко груша')
    ).toBe('яблуко_груша');
  });

  it('RemoveSpecial', () => {
    expect(
      lineOperations[Operation.RemoveSpecial]?.('яб(лу)ко!')
    ).toBe('яблуко');
  });

  it('ReplaceSpecialWithSpace', () => {
    expect(
      lineOperations[Operation.ReplaceSpecialWithSpace]?.('яб(лу)ко!')
    ).toBe('яб лу ко ');
  });

  it('Replace', () => {
    expect(
      lineOperations[Operation.Replace]?.('сік яблуко сік', {
        find: 'сік',
        replace: 'вода',
      })
    ).toBe('вода яблуко вода');
  });

  it('Replace without params does nothing', () => {
    expect(
      lineOperations[Operation.Replace]?.('сік')
    ).toBe('сік');
  });
});
