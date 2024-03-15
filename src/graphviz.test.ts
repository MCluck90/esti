import { toGraphvizIR } from './graphviz'
import { Project, Resource, Task, VerifiedMap } from './types'

describe('toGraphvizIR', () => {
  const createProject = (
    tasks: Task[],
    resources: Resource[],
    title = 'Test',
  ): Project => {
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
      title,
      tasks: tasksMap,
      resources: new Map(
        resources.map((resource) => [resource.id, resource] as const),
      ) as VerifiedMap<string, Resource>,
    }
  }

  it('should use the title of the project as the label', () => {
    const project = createProject([], [], 'Hello world')
    const ir = toGraphvizIR(project)
    expect(ir.label).toBe('Hello world')
  })

  it('should create a node for each task', () => {
    const resourceA: Resource = { id: 'R-A', tags: new Set() }
    const resourceB: Resource = { id: 'R-B', tags: new Set() }
    const resourceC: Resource = { id: 'R-C', tags: new Set() }
    const taskA: Task = {
      id: 'T-0',
      title: 'Task A',
      days: 0,
      startOffset: 0,
      anyOf: new Set(),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: resourceA,
    }
    const taskB: Task = {
      id: 'T-1',
      title: 'Task B',
      days: 0,
      startOffset: 0,
      anyOf: new Set(),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: resourceB,
    }
    const taskC: Task = {
      id: 'T-2',
      title: 'Task C',
      days: 0,
      startOffset: 0,
      anyOf: new Set(),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: resourceC,
    }
    const tasks = [taskA, taskB, taskC]

    const project = createProject(tasks, [resourceA, resourceB, resourceC])
    const ir = toGraphvizIR(project)
    expect(ir.nodes.length).toBe(3)

    for (const node of ir.nodes) {
      const task = tasks.find((task) => task.id === node.id)
      if (!task) {
        throw new Error(`No task found for node ${node.id}`)
      }

      expect(node.attributes.label).toContain(task.id)
      expect(node.attributes.label).toContain(task.title)
      expect(node.attributes.label).toContain(task.assigned?.id)
    }
  })

  it('should create an edge for each connection', () => {
    const resourceA: Resource = { id: 'R-A', tags: new Set() }
    const resourceB: Resource = { id: 'R-B', tags: new Set() }
    const resourceC: Resource = { id: 'R-C', tags: new Set() }
    const taskA: Task = {
      id: 'T-0',
      title: 'Task A',
      days: 0,
      startOffset: 0,
      anyOf: new Set(),
      blockedBy: new Set(),
      blocks: new Set(),
      assigned: resourceA,
    }
    const taskB: Task = {
      id: 'T-1',
      title: 'Task B',
      days: 0,
      startOffset: 0,
      anyOf: new Set(),
      blockedBy: new Set(['T-0']),
      blocks: new Set(),
      assigned: resourceB,
    }
    const taskC: Task = {
      id: 'T-2',
      title: 'Task C',
      days: 0,
      startOffset: 0,
      anyOf: new Set(),
      blockedBy: new Set(['T-1']),
      blocks: new Set(),
      assigned: resourceC,
    }
    const tasks = [taskA, taskB, taskC]

    const project = createProject(tasks, [resourceA, resourceB, resourceC])
    const ir = toGraphvizIR(project)
    expect(ir.edges.length).toBe(2)

    expect(
      ir.edges.find((edge) => edge.from === 'T-0' && edge.to === 'T-1'),
    ).toBeTruthy()
    expect(
      ir.edges.find((edge) => edge.from === 'T-1' && edge.to === 'T-2'),
    ).toBeTruthy()
  })
})
