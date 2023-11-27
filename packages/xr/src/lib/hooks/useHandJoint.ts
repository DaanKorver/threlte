import type { XRJointSpace } from 'three'
import { currentWritable, useFrame } from '@threlte/core'
import type { HandJoints } from '../lib/handJoints'
import { useHand } from './useHand'

/**
 * Provides a reference to a requested hand joint, once available.
 */
export const useHandJoint = (handedness: 'left' | 'right', joint: HandJoints) => {
  const jointSpaceStore = currentWritable<XRJointSpace | undefined>(undefined)

  const xrhand = useHand(handedness)

  const { stop } = useFrame(
    ({ invalidate }) => {
      const jointSpace = xrhand.current?.hand.joints[joint]
      // The joint radius is a good indicator that the joint is ready
      if (jointSpace?.jointRadius !== undefined) {
        jointSpaceStore.set(jointSpace)
        invalidate()
        stop()
      }
    },
    { invalidate: false }
  )

  return jointSpaceStore
}
