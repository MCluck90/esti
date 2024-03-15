import fs from 'fs'
import { ProjectConfig, Resource, Task } from './types'
import { parseConfig } from './parse'
import { assignResourcesToTasks } from './assignment'

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
const { totalProjectLength } = assignResourcesToTasks(project)

console.log(project.title)
console.log('Total Days:', totalProjectLength)
console.log()
for (const task of project.tasks.values()) {
  if (task.assigned === null) {
    console.error(`[ERROR] No resource assigned to ${task.id}`)
  } else {
    console.log(`[${task.id}]`, task.title)
    console.log('\tAssigned to:', task.assigned.id)
    console.log('\tStarts on day:', task.startOffset)
    console.log('')
  }
}
