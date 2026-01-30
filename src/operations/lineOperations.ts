import { Operation } from "../enums/Operation.enum";

export type LineOperation = (
  line: string,
  params?: { find?: string; replace?: string }
) => string;

export const lineOperations: Partial<Record<Operation, LineOperation>> = {
    [Operation.Uppercase]: (l) => l.toUpperCase(),
    [Operation.Lowercase]: (l) => l.toLowerCase(),
    [Operation.CapitalizeWords]: (l) =>
        l.replace(/(?:^|\s)\S/g, a => a.toUpperCase()),
    [Operation.CapitalizeFirst]: (l) =>
    l ? l.charAt(0).toUpperCase() + l.slice(1) : l,

    [Operation.PrependPlus]: (l) =>
        l.split(' ').map(w => (w ? `+${w}` : '')).join(' '),

    [Operation.RemovePlus]: (l) => l.replace(/\+/g, ''),

    [Operation.WrapQuotes]: (l) => (l.trim() ? `"${l.trim()}"` : l),
    [Operation.WrapBrackets]: (l) => (l.trim() ? `[${l.trim()}]` : l),

    [Operation.PrependDash]: (l) => (l.trim() ? `-${l.trim()}` : l),
    [Operation.PrependDashBracket]: (l) =>
        (l.trim() ? `-[${l.trim()}]` : l),
    [Operation.PrependDashQuote]: (l) =>
        (l.trim() ? `-"${l.trim()}"` : l),

    [Operation.CleanSpaces]: (l) => l.replace(/\s+/g, ' ').trim(),
    [Operation.CleanTabs]: (l) => l.replace(/\t/g, ''),

    [Operation.CleanAfterDash]: (l) => l.split(' -')[0],

    [Operation.SpacesToUnderscore]: (l) => l.replace(/ /g, '_'),

    [Operation.RemoveSpecial]: (l) =>
        l.replace(/[()\\~!@#$%^&*_=+\[\]{}|;':",/<>?`]/g, ''),

    [Operation.ReplaceSpecialWithSpace]: (l) =>
        l.replace(/[()\\~!@#$%^&*_=+\[\]{}|;':",/<>?`]/g, ' '),

    [Operation.Replace]: (l, params) =>
        params?.find ? l.split(params.find).join(params.replace ?? '') : l,
};