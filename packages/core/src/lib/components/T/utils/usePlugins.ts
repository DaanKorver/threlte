import { getContext, onDestroy } from 'svelte'
import type { Plugin, PluginContext, PluginContextName } from '../../../plugins/types'

export const usePlugins = (params: Parameters<Plugin>[0]) => {
  const pluginContextName: PluginContextName = 'threlte-plugin-context'
  const plugins = getContext<PluginContext | undefined>(pluginContextName)

  if (!plugins) return

  const pluginsReturns = Object.values(plugins)
    .map((plugin) => plugin(params))
    .filter(Boolean) as Exclude<ReturnType<Plugin>, void>[]

  const pluginsProps = pluginsReturns.flatMap((callback) => callback.pluginProps ?? [])

  let refCleanupCallbacks: (() => void)[] = []
  onDestroy(() => {
    refCleanupCallbacks.forEach((callback) => callback())
  })
  const updateRef = (ref: any) => {
    refCleanupCallbacks.forEach((callback) => callback())
    refCleanupCallbacks = []
    pluginsReturns.forEach((callback) => {
      const cleanupCallback = callback.onRefChange?.(ref)
      if (cleanupCallback) {
        refCleanupCallbacks.push(cleanupCallback)
      }
    })
  }

  const updateProps = (props: Record<string, any>) => {
    pluginsReturns.forEach((callback) => {
      callback.onPropsChange?.(props)
    })
  }

  const updateRestProps = (restProps: Record<string, any>) => {
    pluginsReturns.forEach((callback) => {
      callback.onRestPropsChange?.(restProps)
    })
  }

  return {
    updateRef,
    updateProps,
    updateRestProps,
    pluginsProps
  }
}
