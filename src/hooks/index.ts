import {
  useHapticFeedback as HapticFeedback,
  useInitData as initData,
  useInitDataRaw as InitDataRaw,
  useMiniApp as MiniApp,
  useMainButton as MainButton,
  useBackButton as BackButton,
} from '@tma.js/sdk-solid'
import { createSignal } from 'solid-js'

export const useInitData = () => {
  try {
    const initD = initData()
    return initD
  } catch (error) {
    const [initD] = createSignal({ user: null })
    return initD
  }
}

export const useInitDataRaw = () => {
  try {
    const initDRaw = InitDataRaw()
    return initDRaw
  } catch (error) {
    const [initDRaw] = createSignal('')
    return initDRaw
  }
}

export const useMiniApp = () => {
  try {
    const mapp = MiniApp()
    return mapp
  } catch (error) {
    const [mapp] = createSignal({ ready: () => {} })
    return mapp
  }
}

export const useMainButton = () => {
  try {
    const mb = MainButton()
    return mb
  } catch (error) {
    return undefined
  }
}

export const useBackButton = () => {
  try {
    const bb = BackButton()
    return bb
  } catch (error) {
    const [bb] = createSignal({
      on: () => {},
      off: () => {},
      show: () => {},
    })
    return bb
  }
}

export const useHapticFeedback = () => {
  try {
    const hf = HapticFeedback()
    return hf
  } catch (error) {
    const [hf] = createSignal({
      impactOccurred: () => {},
    })
    return hf
  }
}
