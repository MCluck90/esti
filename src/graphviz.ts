import { Project } from './types'

export interface GraphvizIRNode {
  id: string
  attributes: Record<string, string>
}

export interface GraphvizIREdge {
  from: string
  to: string
}

export interface GraphvizIR {
  rankdir: 'LR'
  label: string
  nodes: GraphvizIRNode[]
  edges: GraphvizIREdge[]
}

export const toGraphvizIR = (project: Project): GraphvizIR => {
  const nodes: GraphvizIRNode[] = []
  const edges: GraphvizIREdge[] = []

  for (const task of project.tasks.values()) {
    nodes.push({
      id: task.id,
      attributes: {
        label: `${task.id}|${task.title}|Assigned: ${task.assigned?.id}`,
        shape: 'record',
      },
    })

    for (const other of task.blocks) {
      edges.push({ from: task.id, to: other })
    }
  }

  return {
    rankdir: 'LR',
    label: project.title,
    nodes,
    edges,
  }
}

const serializeGraphvizIRNode = (node: GraphvizIRNode): string =>
  `
"${node.id}" [${Object.entries(node.attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(', ')}]
`.trim()

const serializeGraphvizIREdge = (edge: GraphvizIREdge): string =>
  `"${edge.from}" -> "${edge.to}"`

export const toGraphvizDOT = (ir: GraphvizIR): string =>
  `
digraph G {
  rankdir="${ir.rankdir}"
  label="${ir.label}"

  ${ir.nodes.map(serializeGraphvizIRNode).join('\n  ')}

  ${ir.edges.map(serializeGraphvizIREdge).join('\n  ')}
}
`.trim()
