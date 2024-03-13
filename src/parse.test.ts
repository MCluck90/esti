import fs from 'fs'
import path from 'path'
import { parseConfig } from './parse'
import { Project, ProjectConfig, Result } from './types'

function assertSuccessfulParse(
  result: Result<Project, string[]>,
): asserts result is { ok: true; value: Project } {
  if (!result.ok) {
    throw result.error
  }
}

function assertFailedParse(
  result: Result<Project, string[]>,
): asserts result is { ok: false; error: string[] } {
  if (result.ok) {
    throw result.ok
  }
}

describe('parseConfig', () => {
  it('should return an error if the project does not have a title', () => {
    const result = parseConfig({ title: '', resources: {}, tasks: {} })
    assertFailedParse(result)
    expect(result.error).toContain('Project must have a title')
  })

  it('should return an error if the project does not have any resources', () => {
    const result = parseConfig({ title: 'Test', resources: {}, tasks: {} })
    assertFailedParse(result)
    expect(result.error).toContain('Project must contain at least one resource')
  })

  it('should return an error if the project does not have any tasks', () => {
    const result = parseConfig({ title: 'Test', resources: {}, tasks: {} })
    assertFailedParse(result)
    expect(result.error).toContain('Project must contain at least one task')
  })

  it('should return multiple errors if project is empty', () => {
    const result = parseConfig({ title: '', resources: {}, tasks: {} })
    assertFailedParse(result)
    expect(result.error).toContain('Project must have a title')
    expect(result.error).toContain('Project must contain at least one resource')
    expect(result.error).toContain('Project must contain at least one task')
  })

  it('should return an error if a resource is missing required fields', () => {
    const result = parseConfig({
      title: 'Test',
      resources: {
        Engineer: {},
      },
      tasks: {
        A: {
          title: 'A',
          days: 0,
          anyOf: ['Engineer'],
          blockedBy: ['B'],
        },
      },
    } as unknown as ProjectConfig)
    assertFailedParse(result)
    expect(result.error).toContain(
      '[Resource: Engineer] Missing attribute: "tags"',
    )
  })

  it('should return an errors if a task is missing required fields', () => {
    const result = parseConfig({
      title: 'Test',
      resources: {
        Engineer: {
          tags: ['Engineer'],
        },
      },
      tasks: {
        A: {},
      },
    } as unknown as ProjectConfig)
    assertFailedParse(result)
    expect(result.error).toContain('[Task: A] Missing attribute: "title"')
    expect(result.error).toContain('[Task: A] Missing attribute: "days"')
    expect(result.error).toContain('[Task: A] Missing attribute: "anyOf"')
    expect(result.error).toContain('[Task: A] Missing attribute: "blockedBy"')
  })

  it('should return an error if a task is blocked by a non-existent task', () => {
    const result = parseConfig({
      title: 'Test',
      resources: {
        Engineer: {
          tags: ['Engineer'],
        },
      },
      tasks: {
        A: {
          title: 'A',
          days: 0,
          anyOf: ['Engineer'],
          blockedBy: ['B'],
        },
      },
    })
    assertFailedParse(result)
    expect(result.error).toContain('[Task: A] Blocked by non-existent task: B')
  })

  it('should return an error if a resource does not contain any tags', () => {
    const result = parseConfig({
      title: 'Test',
      resources: {
        Engineer: {
          tags: [],
        },
      },
      tasks: {
        A: {
          title: 'A',
          days: 0,
          anyOf: ['Engineer'],
          blockedBy: ['B'],
        },
      },
    })
    assertFailedParse(result)
    expect(result.error).toContain(
      '[Resource: Engineer] Must have at least one tag',
    )
  })

  it('should return an error if a task requires a tag which no resource matches', () => {
    const result = parseConfig({
      title: 'Test',
      resources: {
        Engineer: {
          tags: ['Frontend'],
        },
      },
      tasks: {
        A: {
          title: 'A',
          days: 0,
          anyOf: ['Backend'],
          blockedBy: [],
        },
      },
    })
    assertFailedParse(result)
    expect(result.error).toContain(
      '[Task: A] Requires "Backend" but no resources match that tag',
    )
  })

  const exampleDir = path.join(__dirname, '../examples')
  const examples = fs.readdirSync(exampleDir)
  test.each(examples)('examples/%s should be valid', (exampleName) => {
    const config = JSON.parse(
      fs.readFileSync(path.join(exampleDir, exampleName)).toString(),
    )
    const result = parseConfig(config)
    if (!result.ok) {
      throw result.error
    }
  })
})
