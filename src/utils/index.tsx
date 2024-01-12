import { Accessor, Resource } from 'solid-js'

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export function isAccessor<T>(value: unknown): value is Accessor<T> {
  return typeof value === 'function' && value !== null
}

export function isResource<T>(value: unknown): value is Resource<T> {
  return typeof value === 'function' && value !== null && 'loading' in value
}
