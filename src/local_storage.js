export const localStorageKey = 'hacker-new-storage'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(localStorageKey)

    if (serializedState === null) {
      return {}
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return {}
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(localStorageKey, serializedState)
  } catch (error) {
    // NOOP
  }
}
