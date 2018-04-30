import parseLine from './parseLine'
import {Context, Statement} from "./types";

export function compile(code: string): Statement[] {
  return code.split('\n').map(line => parseLine(line));
}

export function run(statements: Statement[]): string[] {
  if (statements.length === 0) {
    return [];
  }
  const context: Context = {
    arrays: {},
    variables: {},
    functions: {},
    next: statements[0].line,
    output: [],
    input: [],
    subs: [],
    cycles: {},
    stop: false
  };
  context.functions.abs = Math.abs.bind(Math);
  context.functions.min = Math.min.bind(Math);
  context.functions.atn = Math.atan.bind(Math);
  context.functions.cos = Math.cos.bind(Math);
  context.functions.exp = Math.exp.bind(Math);
  context.functions.int = Math.floor.bind(Math);
  context.functions.log = Math.log.bind(Math);
  context.functions.sin = Math.sin.bind(Math);
  context.functions.sqr = Math.sqrt.bind(Math);
  for (let i = 1; i < statements.length; i++) {
    if (context.next > statements[i].line) {
      context.next = statements[i].line;
    }
  }
  while (!context.stop) {
    const current = statements.find(s => s.line === context.next);
    if (!current) {
      break;
    }
    for (const statement of statements) {
      if (statement.line <= current.line) {
        continue;
      }
      if (context.next === current.line || context.next > statement.line) {
        context.next = statement.line;
      }
    }
    if (context.next === current.line) {
      context.next = current.line + 10;
    }
    current.execute(context, current.state);
  }
  return context.output;
}
