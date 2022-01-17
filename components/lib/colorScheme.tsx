export type ColorSchemeTypes =
  | 'Dataproduct'
  | 'User'
  | 'Story'

export const colorScheme: Record<ColorSchemeTypes, Record<string, string>> = {
  Dataproduct: { dark: '#396375', light: '#98cada' },
  User: { dark: '#5B5970', light: '#A19DC7' },
  Story: { dark: '#808080', light: '#E8E8E8' },
}
