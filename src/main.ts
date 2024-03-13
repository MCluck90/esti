import fs from 'fs'
import { ProjectConfig } from './types'

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: npm start [path-to-project]')
  process.exit(1)
}

const config: ProjectConfig = JSON.parse(fs.readFileSync(filePath).toString())
console.log(config)
