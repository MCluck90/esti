# esti

Quickly estimate projects. Given a project specification, it will give you a solution to assigning work and an estimated
total time to execute the project.

Outputs the total length of the project and a [Graphviz](https://graphviz.org/) DOT file showing the dependencies and
assignments.

## Getting Started

```sh
git clone https://github.com/MCluck90/esti
cd esti
npm install
npm run build
npm start examples/todo-app.json
```

## Creating a Project

For the most up-to-date information, check out [the examples](./examples/).

Projects can be written in [JSON](./examples/todo-app.json) or a custom format called [ST](./examples/todo-app.st)

A minimal JSON project can be written like this:

```json
{
  "title": "My Project",
  "resources": {
    "Me": {
      "tags": ["Some tag"]
    }
  },
  "tasks": {
    "Task ID": {
      "title": "Name of the task",
      "days": 1,
      "anyOf": ["Some tag"],
      "blockedBy": []
    }
  }
}
```

or the equivalent ST:

```
title: `My Project`

resource Me {
  tags: `Some tag`
}

task `Task ID` {
  title: `Name of the task`
  days: 1
  anyOf: `Some tag`
}
```

### Assigning Resources

All resources must have a list of tags. These tags are used to determine which tasks they can be assigned to.
In this example, Joe will be assigned to `TASK-0` and Jane will be assigned to `TASK-1`.

```json
{
  "//": "...",
  "resources": {
    "Joe": {
      "tags": ["Frontend"]
    },
    "Jane": {
      "tags": ["Backend"]
    }
  },
  "tasks": {
    "TASK-0": {
      "//": "...",
      "anyOf": ["Frontend"]
    },
    "TASK-1": {
      "//": "...",
      "anyOf": ["Backend"]
    }
  }
}
```

If a task has multiple tags in `anyOf` then it will give the task to a resource that contains at least one of those tags.
Here, either Joe or Jane may get assigned the task.

```json
{
  "//": "...",
  "resources": {
    "Joe": {
      "tags": ["Frontend"]
    },
    "Jane": {
      "tags": ["Backend"]
    }
  },
  "tasks": {
    "TASK-0": {
      "//": "...",
      "anyOf": ["Frontend", "Backend"]
    }
  }
}
```

### Dependencies

To ensure that some tasks are completed before others, you can say that a task is `blockedBy` any other tasks.
In this example, `TASK-1` and `TASK-2` can be started immediately but `TASK-3` cannot start until both of them are
completed.

```json
{
  "//": "...",
  "tasks": {
    "TASK-1": {
      "//": "...",
      "blockedBy": []
    },
    "TASK-2": {
      "//": "...",
      "blockedBy": []
    },
    "TASK-3": {
      "//": "...",
      "blockedBy": ["TASK-1", "TASK-2"]
    }
  }
}
```

Declaring dependencies in ST works the same way gives you a different way of writing simple dependencies.

```
task `TASK-1` {
  // ...

  > `TASK-3` {
    // ...
    // Automatically blocked by `TASK-1` but can other blockers
    // `blockedBy` is an optional attribute in ST
    blockedBy: `TASK-2`
  }
}

task `TASK-2` {
  // ...
}
```
