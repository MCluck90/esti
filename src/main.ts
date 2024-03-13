import fs from 'fs'
import { ProjectConfig } from './types'
import { parseConfig } from './parse'

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: npm start [path-to-project]')
  process.exit(1)
}

const config: ProjectConfig = JSON.parse(fs.readFileSync(filePath).toString())
const result = parseConfig(config)
if (!result.ok) {
  for (const error of result.error) {
    console.error(error)
  }
  process.exit(1)
}

const project = result.value
console.log(project)
