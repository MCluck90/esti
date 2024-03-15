import fs from 'fs'
import path from 'path'
import { ProjectConfig } from './types'
import { parseConfig } from './parse'
import { assignResourcesToTasks } from './assignment'
import { toGraphvizDOT, toGraphvizIR } from './graphviz'

const projectFilePath = process.argv[2]
if (!projectFilePath) {
  console.error('Usage: npm start [path-to-project]')
  process.exit(1)
}

const config: ProjectConfig = JSON.parse(
  fs.readFileSync(projectFilePath).toString(),
)
const result = parseConfig(config)
if (!result.ok) {
  for (const error of result.error) {
    console.error(error)
  }
  process.exit(1)
}

const project = result.value
const { totalProjectLength } = assignResourcesToTasks(project)

console.log(project.title)
console.log('Total Days:', totalProjectLength)

const projectFileName = path.basename(projectFilePath, '.json')
const dotFilePath = path.join(
  path.dirname(projectFilePath),
  `${projectFileName}.dot`,
)

const graphvizDOT = toGraphvizDOT(toGraphvizIR(project))
fs.writeFileSync(dotFilePath, graphvizDOT)
console.log('Graphviz DOT file written to:', dotFilePath)
