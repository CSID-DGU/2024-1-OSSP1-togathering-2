import { useCallback, useState } from 'react'

export type UseBooleanStateResult = {
  state: boolean
  setTrue: () => void
  setFalse: () => void
  toggleState: () => void
}

export const useBooleanState = (defaultValue: boolean): UseBooleanStateResult => {
  const [state, setState] = useState(defaultValue)

  const setTrue = useCallback(() => setState(true), [])
  const setFalse = useCallback(() => setState(false), [])
  const toggleState = useCallback(() => setState((value) => !value), [])

  return {
    state,
    setTrue,
    setFalse,
    toggleState,
  }
}
