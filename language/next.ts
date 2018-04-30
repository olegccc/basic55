import {Context} from "./context";

type NextStatement = {
  variable: string;
}

type NextConfiguration = {
  state: NextStatement;
  execute: Function;
}

function NextExecuteHandler(context: Context, state: NextStatement) {
  const cycle = context.cycles[state.variable];
  if (!cycle) {
    throw Error('no cycle for variable ' + state.variable);
  }
  if (context.variables[state.variable] === cycle.limit) {
    delete context.cycles[state.variable];
    return;
  }
  context.variables[state.variable] += cycle.increment;
  context.next = cycle.first;
}

function NextParseHandler(variable: string): NextConfiguration {
  return {
    execute: NextExecuteHandler,
    state: {
      variable
    }
  };
}

export default NextParseHandler;
