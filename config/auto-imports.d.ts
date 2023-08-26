/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-auto-import
export {}
declare global {
  const EffectScope: typeof import('vue')['EffectScope']
  const INotificationStatus: typeof import('../src/common/interfaces')['INotificationStatus']
  const Popup: typeof import('../src/common/interfaces')['Popup']
  const USDC_ADDRESS: typeof import('../src/common/constants')['USDC_ADDRESS']
  const acceptHMRUpdate: typeof import('pinia')['acceptHMRUpdate']
  const addTokenToMetaMask: typeof import('../src/common/helpers')['addTokenToMetaMask']
  const blurry: typeof import('../src/common/animations')['blurry']
  const blurryRight: typeof import('../src/common/animations')['blurryRight']
  const calculateSlippage: typeof import('../src/common/helpers')['calculateSlippage']
  const calculateUSD: typeof import('../src/common/helpers')['calculateUSD']
  const checkNetwork: typeof import('../src/common/helpers')['checkNetwork']
  const computed: typeof import('vue')['computed']
  const connectors: typeof import('../src/common/auth.config')['connectors']
  const createApp: typeof import('vue')['createApp']
  const createPinia: typeof import('pinia')['createPinia']
  const customRef: typeof import('vue')['customRef']
  const cutString: typeof import('../src/common/helpers')['cutString']
  const cutStringWithDots: typeof import('../src/common/helpers')['cutStringWithDots']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const defineStore: typeof import('pinia')['defineStore']
  const effectScope: typeof import('vue')['effectScope']
  const getActivePinia: typeof import('pinia')['getActivePinia']
  const getBackgroundImage: typeof import('../src/common/helpers')['getBackgroundImage']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const getImage: typeof import('../src/common/helpers')['getImage']
  const getTournament: typeof import('../src/composables/index')['getTournament']
  const h: typeof import('vue')['h']
  const helpers: typeof import('../src/common/helpers')['default']
  const inject: typeof import('vue')['inject']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const mapActions: typeof import('pinia')['mapActions']
  const mapGetters: typeof import('pinia')['mapGetters']
  const mapState: typeof import('pinia')['mapState']
  const mapStores: typeof import('pinia')['mapStores']
  const mapWritableState: typeof import('pinia')['mapWritableState']
  const markRaw: typeof import('vue')['markRaw']
  const nFormatter: typeof import('../src/common/helpers')['nFormatter']
  const nextTick: typeof import('vue')['nextTick']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const parseString: typeof import('../src/common/helpers')['parseString']
  const parseUnits: typeof import('../src/common/helpers')['parseUnits']
  const provide: typeof import('vue')['provide']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const setActivePinia: typeof import('pinia')['setActivePinia']
  const setGlobals: typeof import('../src/common/helpers')['setGlobals']
  const setMapStoreSuffix: typeof import('pinia')['setMapStoreSuffix']
  const setTouranment: typeof import('../src/composables/index')['setTouranment']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const sleep: typeof import('../src/common/helpers')['sleep']
  const storeToRefs: typeof import('pinia')['storeToRefs']
  const switchNetwork: typeof import('../src/common/helpers')['switchNetwork']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const triggerRef: typeof import('vue')['triggerRef']
  const typewatch: typeof import('../src/common/helpers')['typewatch']
  const unref: typeof import('vue')['unref']
  const updateGlobalsAddress: typeof import('../src/common/helpers')['updateGlobalsAddress']
  const useAttrs: typeof import('vue')['useAttrs']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useNotificationStore: typeof import('../src/stores/notification')['useNotificationStore']
  const usePopupsStore: typeof import('../src/stores/popups')['usePopupsStore']
  const useRewardsStore: typeof import('../src/stores/rewards')['useRewardsStore']
  const useSlots: typeof import('vue')['useSlots']
  const useSwapStore: typeof import('../src/stores/swap')['useSwapStore']
  const useTournamentStore: typeof import('../src/stores/tournament')['useTournamentStore']
  const useUserStore: typeof import('../src/stores/user')['useUserStore']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { Component,ComponentPublicInstance,ComputedRef,InjectionKey,PropType,Ref,VNode } from 'vue'
}
// for vue template auto import
import { UnwrapRef } from 'vue'
declare module 'vue' {
  interface ComponentCustomProperties {
    readonly EffectScope: UnwrapRef<typeof import('vue')['EffectScope']>
    readonly INotificationStatus: UnwrapRef<typeof import('../src/common/interfaces')['INotificationStatus']>
    readonly Popup: UnwrapRef<typeof import('../src/common/interfaces')['Popup']>
    readonly USDC_ADDRESS: UnwrapRef<typeof import('../src/common/constants')['USDC_ADDRESS']>
    readonly acceptHMRUpdate: UnwrapRef<typeof import('pinia')['acceptHMRUpdate']>
    readonly addTokenToMetaMask: UnwrapRef<typeof import('../src/common/helpers')['addTokenToMetaMask']>
    readonly blurry: UnwrapRef<typeof import('../src/common/animations')['blurry']>
    readonly blurryRight: UnwrapRef<typeof import('../src/common/animations')['blurryRight']>
    readonly calculateSlippage: UnwrapRef<typeof import('../src/common/helpers')['calculateSlippage']>
    readonly calculateUSD: UnwrapRef<typeof import('../src/common/helpers')['calculateUSD']>
    readonly checkNetwork: UnwrapRef<typeof import('../src/common/helpers')['checkNetwork']>
    readonly computed: UnwrapRef<typeof import('vue')['computed']>
    readonly connectors: UnwrapRef<typeof import('../src/common/auth.config')['connectors']>
    readonly createApp: UnwrapRef<typeof import('vue')['createApp']>
    readonly createPinia: UnwrapRef<typeof import('pinia')['createPinia']>
    readonly customRef: UnwrapRef<typeof import('vue')['customRef']>
    readonly cutString: UnwrapRef<typeof import('../src/common/helpers')['cutString']>
    readonly cutStringWithDots: UnwrapRef<typeof import('../src/common/helpers')['cutStringWithDots']>
    readonly defineAsyncComponent: UnwrapRef<typeof import('vue')['defineAsyncComponent']>
    readonly defineComponent: UnwrapRef<typeof import('vue')['defineComponent']>
    readonly defineStore: UnwrapRef<typeof import('pinia')['defineStore']>
    readonly effectScope: UnwrapRef<typeof import('vue')['effectScope']>
    readonly getActivePinia: UnwrapRef<typeof import('pinia')['getActivePinia']>
    readonly getBackgroundImage: UnwrapRef<typeof import('../src/common/helpers')['getBackgroundImage']>
    readonly getCurrentInstance: UnwrapRef<typeof import('vue')['getCurrentInstance']>
    readonly getCurrentScope: UnwrapRef<typeof import('vue')['getCurrentScope']>
    readonly getImage: UnwrapRef<typeof import('../src/common/helpers')['getImage']>
    readonly getTournament: UnwrapRef<typeof import('../src/composables/index')['getTournament']>
    readonly h: UnwrapRef<typeof import('vue')['h']>
    readonly helpers: UnwrapRef<typeof import('../src/common/helpers')['default']>
    readonly inject: UnwrapRef<typeof import('vue')['inject']>
    readonly isProxy: UnwrapRef<typeof import('vue')['isProxy']>
    readonly isReactive: UnwrapRef<typeof import('vue')['isReactive']>
    readonly isReadonly: UnwrapRef<typeof import('vue')['isReadonly']>
    readonly isRef: UnwrapRef<typeof import('vue')['isRef']>
    readonly mapActions: UnwrapRef<typeof import('pinia')['mapActions']>
    readonly mapGetters: UnwrapRef<typeof import('pinia')['mapGetters']>
    readonly mapState: UnwrapRef<typeof import('pinia')['mapState']>
    readonly mapStores: UnwrapRef<typeof import('pinia')['mapStores']>
    readonly mapWritableState: UnwrapRef<typeof import('pinia')['mapWritableState']>
    readonly markRaw: UnwrapRef<typeof import('vue')['markRaw']>
    readonly nFormatter: UnwrapRef<typeof import('../src/common/helpers')['nFormatter']>
    readonly nextTick: UnwrapRef<typeof import('vue')['nextTick']>
    readonly onActivated: UnwrapRef<typeof import('vue')['onActivated']>
    readonly onBeforeMount: UnwrapRef<typeof import('vue')['onBeforeMount']>
    readonly onBeforeUnmount: UnwrapRef<typeof import('vue')['onBeforeUnmount']>
    readonly onBeforeUpdate: UnwrapRef<typeof import('vue')['onBeforeUpdate']>
    readonly onDeactivated: UnwrapRef<typeof import('vue')['onDeactivated']>
    readonly onErrorCaptured: UnwrapRef<typeof import('vue')['onErrorCaptured']>
    readonly onMounted: UnwrapRef<typeof import('vue')['onMounted']>
    readonly onRenderTracked: UnwrapRef<typeof import('vue')['onRenderTracked']>
    readonly onRenderTriggered: UnwrapRef<typeof import('vue')['onRenderTriggered']>
    readonly onScopeDispose: UnwrapRef<typeof import('vue')['onScopeDispose']>
    readonly onServerPrefetch: UnwrapRef<typeof import('vue')['onServerPrefetch']>
    readonly onUnmounted: UnwrapRef<typeof import('vue')['onUnmounted']>
    readonly onUpdated: UnwrapRef<typeof import('vue')['onUpdated']>
    readonly parseString: UnwrapRef<typeof import('../src/common/helpers')['parseString']>
    readonly parseUnits: UnwrapRef<typeof import('../src/common/helpers')['parseUnits']>
    readonly provide: UnwrapRef<typeof import('vue')['provide']>
    readonly reactive: UnwrapRef<typeof import('vue')['reactive']>
    readonly readonly: UnwrapRef<typeof import('vue')['readonly']>
    readonly ref: UnwrapRef<typeof import('vue')['ref']>
    readonly resolveComponent: UnwrapRef<typeof import('vue')['resolveComponent']>
    readonly setActivePinia: UnwrapRef<typeof import('pinia')['setActivePinia']>
    readonly setGlobals: UnwrapRef<typeof import('../src/common/helpers')['setGlobals']>
    readonly setMapStoreSuffix: UnwrapRef<typeof import('pinia')['setMapStoreSuffix']>
    readonly setTouranment: UnwrapRef<typeof import('../src/composables/index')['setTouranment']>
    readonly shallowReactive: UnwrapRef<typeof import('vue')['shallowReactive']>
    readonly shallowReadonly: UnwrapRef<typeof import('vue')['shallowReadonly']>
    readonly shallowRef: UnwrapRef<typeof import('vue')['shallowRef']>
    readonly sleep: UnwrapRef<typeof import('../src/common/helpers')['sleep']>
    readonly storeToRefs: UnwrapRef<typeof import('pinia')['storeToRefs']>
    readonly switchNetwork: UnwrapRef<typeof import('../src/common/helpers')['switchNetwork']>
    readonly toRaw: UnwrapRef<typeof import('vue')['toRaw']>
    readonly toRef: UnwrapRef<typeof import('vue')['toRef']>
    readonly toRefs: UnwrapRef<typeof import('vue')['toRefs']>
    readonly triggerRef: UnwrapRef<typeof import('vue')['triggerRef']>
    readonly typewatch: UnwrapRef<typeof import('../src/common/helpers')['typewatch']>
    readonly unref: UnwrapRef<typeof import('vue')['unref']>
    readonly updateGlobalsAddress: UnwrapRef<typeof import('../src/common/helpers')['updateGlobalsAddress']>
    readonly useAttrs: UnwrapRef<typeof import('vue')['useAttrs']>
    readonly useCssModule: UnwrapRef<typeof import('vue')['useCssModule']>
    readonly useCssVars: UnwrapRef<typeof import('vue')['useCssVars']>
    readonly useNotificationStore: UnwrapRef<typeof import('../src/stores/notification')['useNotificationStore']>
    readonly usePopupsStore: UnwrapRef<typeof import('../src/stores/popups')['usePopupsStore']>
    readonly useRewardsStore: UnwrapRef<typeof import('../src/stores/rewards')['useRewardsStore']>
    readonly useSlots: UnwrapRef<typeof import('vue')['useSlots']>
    readonly useSwapStore: UnwrapRef<typeof import('../src/stores/swap')['useSwapStore']>
    readonly useTournamentStore: UnwrapRef<typeof import('../src/stores/tournament')['useTournamentStore']>
    readonly useUserStore: UnwrapRef<typeof import('../src/stores/user')['useUserStore']>
    readonly watch: UnwrapRef<typeof import('vue')['watch']>
    readonly watchEffect: UnwrapRef<typeof import('vue')['watchEffect']>
    readonly watchPostEffect: UnwrapRef<typeof import('vue')['watchPostEffect']>
    readonly watchSyncEffect: UnwrapRef<typeof import('vue')['watchSyncEffect']>
  }
}
