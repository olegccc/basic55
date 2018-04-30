import {Statement} from './types'
import parsers from './parsers'

export default function(line: string): Statement {

  let match = line.match(/^(\d+)\s+(.+)\s*$/);
  if (!match) {
    throw Error('statement should start with line number');
  }

  const body = match[2];
  const number = Number(match[1]);

  for (const expression of parsers) {
    match = body.match(expression.match);
    if (match) {
      const { state, execute } = expression.handler(...match.splice(1));
      return {
        state,
        execute,
        line: number
      };
    }
  }

  throw Error('unknown statement');
}
