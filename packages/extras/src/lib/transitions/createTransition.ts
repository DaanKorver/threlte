import type { ThrelteTransition } from './types'

/**
 * # EXPERIMENTAL
 *
 * **This plugin is experimental and may change or be removed.**
 */
export const createTransition = <Ref = any>(transition: ThrelteTransition<Ref>) => transition
