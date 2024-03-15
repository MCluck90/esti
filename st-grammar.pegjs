Project
  = __ title:TitleAttribute __ elements:ResourceOrTask* {
    return {
      title,
      resources: elements.filter(e => e.type === 'resource').map(e => e.value),
      tasks: elements.filter(e => e.type === 'task').map(e => e.value),
    };
  }

TitleAttribute "title attribute"
  = type:"title" _ ":" _ value:String _ NL { return { type, value }; }

ResourceOrTask
  = element:(Resource / Task) _ { return element; }

Resource
  = "resource" _ id:String _ "{" __ body:ResourceBody __ "}" __ {
    return {
      type: 'resource',
      value: {
        location: location(),
        id,
        body
      }
    }
  }
ResourceBody
  = tags:TagsAttribute { return { attributes: [tags] } }

TagsAttribute
  = type:"tags" _ ":" _ value:StringList _ NL { return { type, value, location: location() } }

Task
  = "task" _ id:String _ "{" __ body:TaskBody __ "}" __ {
    return {
      type: 'task',
      value: {
        id,
        body,
        location: location()
      }
    }
  }
TaskBody
  = attributes:(attr:(TitleAttribute / DaysAttribute / AnyOfAttribute / BlockedByAttribute) __ { return attr; })*
    tasks:(task:NestedTask __ { return task })* {
      return { attributes, tasks }
    }

DaysAttribute
  = type:"days" _ ":" _ value:Integer _ NL __ { return { type, value, location: location() } }
AnyOfAttribute
  = type:"anyOf" _ ":"  _ value:StringList _ NL __ { return { type, value, location: location() } }
BlockedByAttribute
  = type:"blockedBy" _ ":" _ value:StringList _ NL __ { return { type, value, location: location() } }

NestedTask
  = ">" _ id:String _ "{" __ body:TaskBody __ "}" __ {
    return {
      id,
      body,
      location: location()
    }
  }

Value = StringList / Integer
String
  = "`" characters:[^`\r\n]* "`" { return characters.join(''); }
  / characters:[^,\r\n ]+ { return characters.join(''); }
StringList
  = start:String elements:("," _ el:StringList { return el })? {
    return !elements ? [start]
      : [start, Array.isArray(elements) ? elements.flat() : elements].flat();
  }
Integer 
  = "0" { return 0 }
  / first:[1-9]+ second:[0-9]* { return Number(first + (second ?? ''))}

_ = [ \t]*
__ = "//" [^\n]* __ / [ \t\r\n]*
NL = "\r"? "\n"