import { Project, Resource, Task } from './types'

export interface AssignmentResult {
  totalProjectLength: number
}

export const assignResourcesToTasks = (project: Project): AssignmentResult => {
  const availableResources = new Set<Resource>(project.resources.values())
  const resourceCooldown = new Map<string, [Resource, Task, number]>()
  const unassigned = new Set<Task>(
    Array.from(project.tasks.values()).filter(
      (task) => task.blockedBy.size === 0,
    ),
  )

  let totalProjectLength = 0
  while (unassigned.size > 0 || resourceCooldown.size > 0) {
    for (const resource of availableResources) {
      for (const task of unassigned) {
        if (setContainsAtLeastOne(task.anyOf, resource.tags)) {
          task.assigned = resource
          unassigned.delete(task)
          if (task.days > 0) {
            availableResources.delete(resource)
            resourceCooldown.set(resource.id, [resource, task, task.days])
          }
          break
        }
      }
    }

    totalProjectLength++

    for (const [resource, task, cooldown] of resourceCooldown.values()) {
      const newCooldown = cooldown - 1
      if (newCooldown <= 0) {
        resourceCooldown.delete(resource.id)
        availableResources.add(resource)

        for (const dependencyId of task.blocks) {
          unassigned.add(project.tasks.get(dependencyId))
        }
      } else {
        resourceCooldown.set(resource.id, [resource, task, newCooldown])
      }
    }
  }

  return {
    totalProjectLength,
  }
}

// TODO: Move this to somewhere better and rename
const setContainsAtLeastOne = <T>(left: Set<T>, right: Set<T>): boolean => {
  for (const leftVal of left) {
    for (const rightVal of right) {
      if (leftVal === rightVal) {
        return true
      }
    }
  }
  return false
}
