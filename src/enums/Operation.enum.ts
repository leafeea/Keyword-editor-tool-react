export enum Operation{
  Uppercase = 'uppercase',
  Lowercase = 'lowercase',
  CapitalizeWords = 'capitalizeWords',
  CapitalizeFirst = 'capitalizeFirst',

  PrependPlus = 'prependPlus',
  RemovePlus = 'removePlus',
  WrapQuotes = 'wrapQuotes',
  WrapBrackets = 'wrapBrackets',
  PrependDash = 'prependDash',
  PrependDashBracket = 'prependDashBracket',
  PrependDashQuote = 'prependDashQuote',

  CleanSpaces = 'cleanSpaces',
  CleanTabs = 'cleanTabs',
  CleanAfterDash = 'cleanAfterDash',
  SpacesToUnderscore = 'spacesToUnderscore',
  RemoveSpecial = 'removeSpecial',
  ReplaceSpecialWithSpace = 'replaceSpecialWithSpace',

  Replace = 'replace',

  SortAZ = 'sortAZ',
  SortZA = 'sortZA',
  Deduplicate = 'deduplicate',
}