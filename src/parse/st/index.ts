import {
  ProjectConfig,
  Resource,
  ResourceConfig,
  Result,
  Task,
  TaskConfig,
  VerifiedMap,
} from '../../types'
import {
  STResource,
  SyntaxError,
  Location,
  parse,
  STTask,
  STAttribute,
} from './parser'

export class SemanticError extends Error {
  constructor(
    public readonly message: string,
    public readonly location: Location,
  ) {
    super(message)
  }
}

export const parseST = (input: string): Result<ProjectConfig, Error[]> => {
  const parsedProject = parse(input)
  if (parsedProject instanceof SyntaxError) {
    return Result.Err([parsedProject])
  }

  const errors: Error[] = []
  let title = ''
  const resources: Record<string, ResourceConfig> = {}
  const tasks: Record<string, TaskConfig> = {}

  if (typeof parsedProject.title.value !== 'string') {
    errors.push(
      new SemanticError(
        '"title" must be a string',
        parsedProject.title.location,
      ),
    )
  } else {
    title = parsedProject.title.value
  }

  for (const stResource of parsedProject.resources) {
    const resource = parseSTResource(stResource)
    if (resource.ok) {
      if (resources[stResource.id]) {
        errors.push(
          new SemanticError(
            `Duplicate definition for ${stResource.id}`,
            stResource.location,
          ),
        )
      } else {
        resources[stResource.id] = resource.value
      }
    } else {
      errors.push(...resource.error)
    }
  }

  for (const stTask of parsedProject.tasks) {
    const taskResult = parseSTTask(stTask)
    if (taskResult.ok) {
      for (const [taskId, task] of taskResult.value) {
        if (tasks[taskId]) {
          errors.push(
            new SemanticError(
              `Duplicate definition for ${stTask.id}`,
              stTask.location,
            ),
          )
        } else {
          tasks[taskId] = task
        }
      }
    } else {
      errors.push(...taskResult.error)
    }
  }

  if (errors.length > 0) {
    return Result.Err(errors)
  }

  return Result.Ok({
    title,
    resources,
    tasks,
  })
}

const parseSTResource = (
  stResource: STResource,
): Result<ResourceConfig, SemanticError[]> => {
  const resource: ResourceConfig = { tags: [] }
  const errors: SemanticError[] = []
  if (!stResource.id) {
    errors.push(
      new SemanticError(
        'ID must have one or more characters',
        stResource.location,
      ),
    )
  }

  const attributes = new Map<string, STAttribute>()
  for (const stAttribute of stResource.body.attributes) {
    if (attributes.has(stAttribute.type)) {
      errors.push(
        new SemanticError(
          `Duplicate attribute: "${stAttribute.type}"`,
          stAttribute.location,
        ),
      )
    } else {
      attributes.set(stAttribute.type, stAttribute)
    }
  }

  const tagsAttribute = attributes.get('tags')
  if (!tagsAttribute) {
    errors.push(
      new SemanticError(
        'Resources must have a "tags" attribute',
        stResource.location,
      ),
    )
  } else if (!Array.isArray(tagsAttribute.value)) {
    errors.push(
      new SemanticError(
        '"tags" must be a list of strings',
        tagsAttribute.location,
      ),
    )
  } else {
    resource.tags = tagsAttribute.value
  }

  if (errors.length > 0) {
    return Result.Err(errors)
  }

  return Result.Ok(resource)
}

const parseSTTask = (
  stTask: STTask,
  parentTask?: STTask,
): Result<[string, TaskConfig][], SemanticError[]> => {
  const task: TaskConfig = {
    title: '',
    days: 0,
    anyOf: [],
    blockedBy: parentTask ? [parentTask.id] : [],
  }
  const errors: SemanticError[] = []
  if (!stTask.id) {
    errors.push(
      new SemanticError('ID must have one or more characters', stTask.location),
    )
  }

  const attributes = new Map<string, STAttribute>()
  for (const stAttribute of stTask.body.attributes) {
    if (attributes.has(stAttribute.type)) {
      errors.push(
        new SemanticError(
          `Duplicate attribute: "${stAttribute.type}"`,
          stAttribute.location,
        ),
      )
    } else {
      attributes.set(stAttribute.type, stAttribute)
    }
  }

  const titleAttr = attributes.get('title')
  if (!titleAttr) {
    errors.push(
      new SemanticError('Must include a "title" attribute', stTask.location),
    )
  } else if (typeof titleAttr.value !== 'string') {
    errors.push(
      new SemanticError('"title" must be a string', titleAttr.location),
    )
  } else {
    task.title = titleAttr.value
  }

  const daysAttr = attributes.get('days')
  if (!daysAttr) {
    errors.push(
      new SemanticError('Must include a "days" attribute', stTask.location),
    )
  } else if (typeof daysAttr.value !== 'number') {
    errors.push(new SemanticError('Must be a number', daysAttr.location))
  } else {
    task.days = daysAttr.value
  }

  const anyOfAttr = attributes.get('anyOf')
  if (!anyOfAttr) {
    errors.push(
      new SemanticError('Must include an "anyOf" attribute', stTask.location),
    )
  } else if (!Array.isArray(anyOfAttr.value)) {
    errors.push(
      new SemanticError('Must be a list of strings', anyOfAttr.location),
    )
  } else if (anyOfAttr.value.length === 0) {
    errors.push(
      new SemanticError('"anyOf" cannot be empty', anyOfAttr.location),
    )
  } else {
    task.anyOf = anyOfAttr.value
  }

  const blockedByAttr = attributes.get('blockedBy')
  if (blockedByAttr) {
    if (!Array.isArray(blockedByAttr.value)) {
      errors.push(
        new SemanticError(
          '"blockedBy" must be a list of strings',
          blockedByAttr.location,
        ),
      )
    } else {
      task.blockedBy = blockedByAttr.value
    }
  }

  const nestedTasks: [string, TaskConfig][] = []
  for (const nestedTask of stTask.body.tasks) {
    const result = parseSTTask(nestedTask, stTask)
    if (result.ok) {
      nestedTasks.push(...result.value)
    } else {
      errors.push(...result.error)
    }
  }

  if (errors.length > 0) {
    return Result.Err(errors)
  }

  return Result.Ok([[stTask.id, task], ...nestedTasks])
}
