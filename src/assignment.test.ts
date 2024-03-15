import { assignResourcesToTasks } from './assignment'
import { Project, Resource, Task, VerifiedMap } from './types'

describe('assignResourcesToTasks', () => {
  const createProject = (tasks: Task[], resources: Resource[]): Project => {
    const tasksMap = new Map(
      tasks.map((task) => [task.id, task] as const),
    ) as VerifiedMap<string, Task>

    // Setup bi-directional blocking connections
    for (const task of tasksMap.values()) {
      for (const dependencyId of task.blockedBy) {
        const dependency = tasksMap.get(dependencyId)
        dependency.blocks.add(task.id)
      }
    }

    return {
      title: 'Test',
      tasks: tasksMap,
      resources: new Map(
        resources.map((resource) => [resource.id, resource] as const),
      ) as VerifiedMap<string, Resource>,
    }
  }

  it('should assign a single resource to a single task', () => {
    const task: Task = {
      id: 'T-A',
      title: 'T-A',
      days: 1,
      anyOf: new Set(['tag']),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: null,
    }
    const resource: Resource = { id: 'R-A', tags: new Set(['tag']) }

    const result = assignResourcesToTasks(createProject([task], [resource]))

    expect(task.assigned).toBe(resource)
    expect(result.totalProjectLength).toBe(1)
  })

  it('should assign a single resource to two tasks', () => {
    const taskA: Task = {
      id: 'T-A',
      title: 'T-A',
      days: 1,
      anyOf: new Set(['tag']),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: null,
    }
    const taskB: Task = {
      id: 'T-B',
      title: 'T-B',
      days: 2,
      anyOf: new Set(['tag']),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: null,
    }
    const resource: Resource = { id: 'R-A', tags: new Set(['tag']) }

    const result = assignResourcesToTasks(
      createProject([taskA, taskB], [resource]),
    )

    expect(taskA.assigned).toBe(resource)
    expect(taskB.assigned).toBe(resource)
    expect(result.totalProjectLength).toBe(3)
  })

  it('should assign two resources to two tasks', () => {
    const taskA: Task = {
      id: 'T-A',
      title: 'T-A',
      days: 1,
      anyOf: new Set(['tag']),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: null,
    }
    const taskB: Task = {
      id: 'T-B',
      title: 'T-B',
      days: 2,
      anyOf: new Set(['tag']),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: null,
    }
    const resourceA: Resource = { id: 'R-A', tags: new Set(['tag']) }
    const resourceB: Resource = { id: 'R-B', tags: new Set(['tag']) }

    const result = assignResourcesToTasks(
      createProject([taskA, taskB], [resourceA, resourceB]),
    )

    expect(taskA.assigned).toBe(resourceA)
    expect(taskB.assigned).toBe(resourceB)
    expect(result.totalProjectLength).toBe(2)
  })

  it('should run two dependent tasks in a row', () => {
    const taskA: Task = {
      id: 'T-A',
      title: 'T-A',
      days: 1,
      anyOf: new Set(['tag']),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: null,
    }
    const taskB: Task = {
      id: 'T-B',
      title: 'T-B',
      days: 2,
      anyOf: new Set(['tag']),
      blockedBy: new Set(['T-A']),
      blocks: new Set(),
      assigned: null,
    }
    const resourceA: Resource = { id: 'R-A', tags: new Set(['tag']) }
    const resourceB: Resource = { id: 'R-B', tags: new Set(['tag']) }

    const result = assignResourcesToTasks(
      createProject([taskA, taskB], [resourceA, resourceB]),
    )

    expect(taskA.assigned).toBe(resourceA)
    expect(taskB.assigned).not.toBe(null)
    expect(result.totalProjectLength).toBe(3)
  })

  it('should run independent tasks in parallel', () => {
    const taskA: Task = {
      id: 'T-A',
      title: 'T-A',
      days: 1,
      anyOf: new Set(['tag']),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: null,
    }
    const taskB: Task = {
      id: 'T-B',
      title: 'T-B',
      days: 2,
      anyOf: new Set(['tag']),
      blockedBy: new Set(['T-A']),
      blocks: new Set(),
      assigned: null,
    }
    const taskC: Task = {
      id: 'T-C',
      title: 'T-C',
      days: 2,
      anyOf: new Set(['tag']),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: null,
    }
    const resourceA: Resource = { id: 'R-A', tags: new Set(['tag']) }
    const resourceB: Resource = { id: 'R-B', tags: new Set(['tag']) }

    const result = assignResourcesToTasks(
      createProject([taskA, taskB, taskC], [resourceA, resourceB]),
    )

    expect(taskA.assigned).toBe(resourceA)
    expect(taskB.assigned).not.toBe(null)
    expect(taskC.assigned).toBe(resourceB)
    expect(result.totalProjectLength).toBe(3)
  })

  it('handles having tasks with 0 days', () => {
    const taskA: Task = {
      id: 'T-A',
      title: 'T-A',
      days: 0,
      anyOf: new Set(['tag']),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: null,
    }
    const taskB: Task = {
      id: 'T-B',
      title: 'T-B',
      days: 2,
      anyOf: new Set(['tag']),
      blockedBy: new Set(['T-A']),
      blocks: new Set(),
      assigned: null,
    }
    const resourceA: Resource = { id: 'R-A', tags: new Set(['tag']) }

    const result = assignResourcesToTasks(
      createProject([taskA, taskB], [resourceA]),
    )

    expect(taskA.assigned).toBe(resourceA)
    expect(taskB.assigned).toBe(resourceA)
    expect(result.totalProjectLength).toBe(2)
  })
})
