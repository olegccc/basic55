import parseLine from './parseLine'
import {createContext, Statement} from "./context";

export function compile(code: string): Statement[] {
  return code
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => parseLine(line));
}

export function run(statements: Statement[]): string[] {
  if (statements.length === 0) {
    return [];
  }
  const context = createContext();
  context.next = statements[0].line;
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
