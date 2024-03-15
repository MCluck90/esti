import fs from 'fs'
import path from 'path'
import { ProjectConfig } from './types'
import { SemanticError, parseConfig, parseST } from './parse'
import { assignResourcesToTasks } from './assignment'
import { toGraphvizDOT, toGraphvizIR } from './graphviz'
import { SyntaxError } from './parse/st/parser'

const fileArg = process.argv[2]
if (!fileArg) {
  console.error('Usage: npm start [path-to-project]')
  process.exit(1)
}

if (path.extname(fileArg) === '.json') {
  runFromConfigFile(fileArg)
} else {
  runFromSTFile(fileArg)
}

function runFromSTFile(stFilePath: string) {
  const source = fs.readFileSync(stFilePath).toString()
  const result = parseST(source)
  if (!result.ok) {
    for (const error of result.error) {
      if (error instanceof SemanticError || error instanceof SyntaxError) {
        console.log(
          `${stFilePath}:${error.location.start.line}:${error.location.start.column}: ${error.message}`,
        )
      } else {
        console.log(error)
      }
    }
    process.exit(1)
  }

  runFromConfig(result.value, stFilePath)
}

function runFromConfigFile(configFilePath: string) {
  const config: ProjectConfig = JSON.parse(
    fs.readFileSync(configFilePath).toString(),
  )
  runFromConfig(config, configFilePath)
}

function runFromConfig(config: ProjectConfig, filePath: string) {
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

  const projectFileName = path.basename(path.basename(filePath, '.json'), '.st')
  const dotFilePath = path.join(
    path.dirname(filePath),
    `${projectFileName}.dot`,
  )

  const graphvizDOT = toGraphvizDOT(toGraphvizIR(project))
  fs.writeFileSync(dotFilePath, graphvizDOT)
  console.log('Graphviz DOT file written to:', dotFilePath)
}
