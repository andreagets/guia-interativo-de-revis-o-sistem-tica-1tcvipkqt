// Local storage manager for all user interactions, lab states, and module progress
// Zero external backend calls. All data remains strictly inside the user's browser.

const NS = 'gets_sr_2026'

export interface ProgressState {
  completedModules: number[]
  visitedModules: number[]
  completedLabs: string[]
  lastVisitedPath: string
  lastVisitedTitle: string
}

const DEFAULT_PROGRESS: ProgressState = {
  completedModules: [],
  visitedModules: [],
  completedLabs: [],
  lastVisitedPath: '/modulo/tipos-de-revisao-e-viabilidade',
  lastVisitedTitle: 'Módulo 1: Tipos de revisão e viabilidade',
}

export function getProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(`${NS}:progress`)
    if (!raw) return DEFAULT_PROGRESS
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_PROGRESS
  }
}

export function saveProgress(updater: (prev: ProgressState) => ProgressState) {
  try {
    const current = getProgress()
    const next = updater(current)
    localStorage.setItem(`${NS}:progress`, JSON.stringify(next))
    window.dispatchEvent(new CustomEvent('sr-progress-change', { detail: next }))
  } catch (e) {
    console.warn('Falha ao salvar progresso no localStorage:', e)
  }
}

export function markModuleVisited(moduleId: number, path: string, title: string) {
  saveProgress((prev) => {
    const visited = prev.visitedModules.includes(moduleId)
      ? prev.visitedModules
      : [...prev.visitedModules, moduleId]
    return {
      ...prev,
      visitedModules: visited,
      lastVisitedPath: path,
      lastVisitedTitle: title,
    }
  })
}

export function toggleModuleCompleted(moduleId: number) {
  saveProgress((prev) => {
    const completed = prev.completedModules.includes(moduleId)
      ? prev.completedModules.filter((id) => id !== moduleId)
      : [...prev.completedModules, moduleId]
    return { ...prev, completedModules: completed }
  })
}

export function markLabCompleted(labId: string) {
  saveProgress((prev) => {
    const labs = prev.completedLabs.includes(labId)
      ? prev.completedLabs
      : [...prev.completedLabs, labId]
    return { ...prev, completedLabs: labs }
  })
}

// Generic Lab State helpers
export function getLabState<T>(labKey: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(`${NS}:lab:${labKey}`)
    if (!raw) return defaultValue
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

export function saveLabState<T>(labKey: string, value: T) {
  try {
    localStorage.setItem(`${NS}:lab:${labKey}`, JSON.stringify(value))
  } catch (e) {
    console.warn(`Falha ao salvar estado do laboratório ${labKey}:`, e)
  }
}

// Reading position anchor preservation
export interface ReadingAnchor {
  moduleSlug: string
  scrollY: number
  title: string
}

export function setReadingAnchor(anchor: ReadingAnchor) {
  try {
    sessionStorage.setItem(`${NS}:reading_anchor`, JSON.stringify(anchor))
  } catch {
    // ignore
  }
}

export function getReadingAnchor(): ReadingAnchor | null {
  try {
    const raw = sessionStorage.getItem(`${NS}:reading_anchor`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearReadingAnchor() {
  try {
    sessionStorage.removeItem(`${NS}:reading_anchor`)
  } catch {
    // ignore
  }
}

// Reset all application data
export function resetAllAppData() {
  try {
    const keys = Object.keys(localStorage)
    for (const key of keys) {
      if (key.startsWith(NS)) {
        localStorage.removeItem(key)
      }
    }
    sessionStorage.removeItem(`${NS}:reading_anchor`)
    window.dispatchEvent(new CustomEvent('sr-progress-change', { detail: DEFAULT_PROGRESS }))
  } catch (e) {
    console.warn('Erro ao limpar dados:', e)
  }
}

// Export all local data to JSON
export function exportAllDataAsJson(): string {
  const dump: Record<string, unknown> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k && k.startsWith(NS)) {
      try {
        dump[k] = JSON.parse(localStorage.getItem(k) || 'null')
      } catch {
        dump[k] = localStorage.getItem(k)
      }
    }
  }
  return JSON.stringify(dump, null, 2)
}
