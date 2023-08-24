import type { AnyProp } from '../Sync.svelte'

export const parsePropLabel = (alphaNumericKey: string, propValue: AnyProp): string => {
  let label = alphaNumericKey
  if (typeof propValue === 'string') {
    label = propValue
  } else if (typeof propValue === 'object') {
    label = propValue.label || alphaNumericKey
  }

  return label
}
