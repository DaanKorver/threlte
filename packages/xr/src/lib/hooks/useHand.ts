import { currentWritable, type CurrentWritable } from '@threlte/core'
import type { XRHand } from '../types'

export const left = currentWritable<undefined | XRHand>(undefined)
export const right = currentWritable<undefined | XRHand>(undefined)

/**
 * Provides a reference to a current XRHand, filtered by handedness.
 */
export const useHand = (handedness: 'left' | 'right'): CurrentWritable<undefined | XRHand> => {
  switch (handedness) {
    case 'left':
      return left
    case 'right':
      return right
    default:
      throw new Error('useHand handedness must be left or right.')
  }
}
