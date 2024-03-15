export interface STProject {
  title: STAttribute
  resources: STResource[]
  tasks: STTask[]
}

export interface STAttribute {
  type: string
  value: number | string | string[]
  location: Location
}

export interface STResource {
  location: Location
  id: string
  body: STResourceBody
}

export interface STResourceBody {
  attributes: STAttribute[]
}

export interface STTask {
  id: string
  body: STTaskBody
  location: Location
}

export interface STTaskBody {
  attributes: STAttribute[]
  tasks: STTask[]
}

export interface Location {
  source: undefined
  start: Span
  end: Span
}

export interface Span {
  offset: number
  line: number
  column: number
}

export const StartRules: ['Project']
export class SyntaxError extends Error {}
export function parse(input: string): SyntaxError | STProject
