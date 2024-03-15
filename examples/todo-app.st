title: `Todo App`

resource Lorem {
  tags: Frontend
}

resource Ipsum {
  tags: Backend
}

resource Dolor {
  tags: Frontend, Backend, Full-Stack
}

task TODO-0001 {
  title: `Create an empty repository`
  days: 0
  anyOf: Frontend, Backend

  > TODO-0002 {
    title: `Create scaffolding for the frontend`
    days: 1
    anyOf: Frontend
    // Automatically blocked by TODO-0001 since it's nested

    > TODO-0008 {
      title: `Create hook for getting all todos with mocks`
      days: 1
      anyOf: Frontend

      > TODO-0009 {
        title: `Show list of all todos`
        days: 1
        anyOf: Frontend
      }
    }

    > TODO-0010 {
      title: `Create hook for creating a todo with mocks`
      days: 1
      anyOf: Frontend

      > TODO-0011 {
        title: `Enable creating new todos`
        days: 2
        anyOf: Frontend
        blockedBy: TODO-0009
      }
    }

    > TODO-0012 {
      title: `Create hook for updating a todo with mocks`
      days: 1
      anyOf: Frontend

      > TODO-0013 {
        title: `Enable editing existing todos`
        days: 2
        anyOf: Frontend
        blockedBy: TODO-0009
      }
    }
  }

  > TODO-0003 {
    title: `Create scaffolding for the backend`
    days: 1
    anyOf: Backend

    > TODO-0004 {
      title: `Setup the todos database`
      days: 1
      anyOf: Backend
    
      > TODO-0005 {
        title: `Endpoint: get all todos`
        days: 1
        anyOf: Backend
      }

      > TODO-0006 {
        title: `Endpoint: create a todo`
        days: 2
        anyOf: Backend
      }

      > TODO-0007 {
        title: `Endpoint: update a todo`
        days: 2
        anyOf: Backend
      }
    }

  }
}