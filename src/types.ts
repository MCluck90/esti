export interface ProjectConfig {
  title: string
  resources: Record<string, ResourceConfig>
  tasks: Record<string, TaskConfig>
}

export interface ResourceConfig {
  tags: string[]
}

export interface TaskConfig {
  title: string
  days: number
  anyOf: string[]
  blockedBy: string[]
}

/**
 * Only to be used when you have a map and you are only accessing it with known good keys
 */
export type VerifiedMap<K, V> = Map<K, V> & { get(key: K): V }

export interface Project {
  title: string
  resources: VerifiedMap<string, Resource>
  tasks: VerifiedMap<string, Task>
}

export interface Resource {
  id: string
  tags: Set<string>
}

export interface Task {
  id: string
  title: string
  days: number
  anyOf: Set<string>
  blockedBy: Set<string>
}

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }
export const Result = {
  Ok<T>(value: T): Result<T, never> {
    return { ok: true, value }
  },
  Err<E>(error: E): Result<never, E> {
    return { ok: false, error }
  },
}
