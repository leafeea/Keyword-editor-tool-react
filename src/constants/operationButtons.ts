import { Operation } from "../enums/Operation.enum";

export const CASE_OPERATIONS = [
  { op: Operation.Uppercase, label: 'УСІ ВЕЛИКІ' },
  { op: Operation.Lowercase, label: 'усі малі' },
  { op: Operation.CapitalizeWords, label: 'Кожне Слово' },
  { op: Operation.CapitalizeFirst, label: 'Перше слово' },
];

export const WRAP_OPERATIONS = [
  { op: Operation.PrependPlus, label: '+ перед словами' },
  { op: Operation.RemovePlus, label: 'Прибрати +' },
  { op: Operation.WrapQuotes, label: '"..." навколо' },
  { op: Operation.WrapBrackets, label: '[...] навколо' },
  { op: Operation.PrependDash, label: '- на початок' },
  { op: Operation.PrependDashBracket, label: '-[...] на початок' },
  { op: Operation.PrependDashQuote, label: '-"..." на початок' },
];

export const CLEAN_OPERATIONS = [
  { op: Operation.CleanSpaces, label: 'Зайві пробіли' },
  { op: Operation.CleanTabs, label: 'Видалити таби' },
  { op: Operation.CleanAfterDash, label: 'Видалити після " -"' },
  { op: Operation.SpacesToUnderscore, label: 'Пробіли → _' },
  { op: Operation.RemoveSpecial, label: 'Видалити спецсимволи' },
  { op: Operation.ReplaceSpecialWithSpace, label: 'Спецсимволи → пробіл' },
];

export const SORT_OPERATIONS = [
  { op: Operation.SortAZ, label: 'Сортувати А–Я' },
  { op: Operation.SortZA, label: 'Сортувати Я–А' },
  { op: Operation.Deduplicate, label: 'Видалити дублі' },
];
