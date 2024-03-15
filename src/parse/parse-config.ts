import {
  Project,
  ProjectConfig,
  Resource,
  Result,
  Task,
  VerifiedMap,
} from '../types'

export const parseConfig = (
  config: ProjectConfig,
): Result<Project, string[]> => {
  const errors: string[] = []
  if (!config.title) {
    errors.push('Project must have a title')
  }

  if (!config.resources || Object.keys(config.resources).length === 0) {
    errors.push('Project must contain at least one resource')
  }

  if (!config.tasks || Object.keys(config.tasks).length === 0) {
    errors.push('Project must contain at least one task')
  }

  const tags = new Set<string>()
  const resources = new Map<string, Resource>()
  for (const [id, resourceConfig] of Object.entries(config.resources)) {
    if (!resourceConfig.tags) {
      errors.push(`[Resource: ${id}] Missing attribute: "tags"`)
    } else if (resourceConfig.tags.length === 0) {
      errors.push(`[Resource: ${id}] Must have at least one tag`)
    } else {
      resourceConfig.tags.forEach((tag) => tags.add(tag))
      resources.set(id, {
        id,
        tags: new Set(resourceConfig.tags),
      })
    }
  }

  const tasks = new Map<string, Task>()
  for (const [id, taskConfig] of Object.entries(config.tasks)) {
    let title: string | null = null
    let days: number | null = null
    let anyOf: Set<string> | null = null
    let blockedBy: Set<string> | null = null

    if (!taskConfig.title) {
      errors.push(`[Task: ${id}] Missing attribute: "title"`)
    } else {
      title = taskConfig.title
    }

    if (taskConfig.days === undefined) {
      errors.push(`[Task: ${id}] Missing attribute: "days"`)
    } else if (taskConfig.days < 0) {
      errors.push(`[Task: ${id}] "days" must be greater than or equal to 0`)
    } else {
      days = taskConfig.days
    }

    if (!taskConfig.anyOf) {
      errors.push(`[Task: ${id}] Missing attribute: "anyOf"`)
    } else {
      anyOf = new Set(taskConfig.anyOf)

      for (const tag of anyOf) {
        if (!tags.has(tag)) {
          errors.push(
            `[Task: ${id}] Requires "${tag}" but no resources match that tag`,
          )
        }
      }
    }

    if (!taskConfig.blockedBy) {
      errors.push(`[Task: ${id}] Missing attribute: "blockedBy"`)
    } else {
      blockedBy = new Set(taskConfig.blockedBy)
    }

    if (title !== null && days !== null && anyOf && blockedBy) {
      tasks.set(id, {
        id,
        title,
        days,
        startOffset: 0,
        anyOf,
        blockedBy,
        blocks: new Set(),
        assigned: null,
      })
    }
  }

  for (const task of tasks.values()) {
    // Check for invalid dependencies
    for (const dependencyId of task.blockedBy) {
      const dependency = tasks.get(dependencyId)
      if (!dependency) {
        errors.push(
          `[Task: ${task.id}] Blocked by non-existent task: ${dependencyId}`,
        )
      } else {
        // Create bi-directional blocking connections
        dependency.blocks.add(task.id)
      }
    }
  }

  if (errors.length > 0) {
    return Result.Err(errors)
  } else {
    return Result.Ok({
      title: config.title,
      resources: resources as VerifiedMap<string, Resource>,
      tasks: tasks as VerifiedMap<string, Task>,
    })
  }
}
