import {Context} from "./context";

type ForStatement = {
  variable: string;
  initial: number;
  limit: number;
  increment: number;
}

type ForConfiguration = {
  state: ForStatement;
  execute: Function;
}

function ForExecuteHandler(context: Context, state: ForStatement) {
  context.cycles[state.variable] = {
    first: context.next,
    increment: state.increment,
    limit: state.limit
  };
  context.variables[state.variable] = state.initial;
}

function ForParseHandler(variable: string, initial: string, limit: string, increment?: string): ForConfiguration {
  return {
    execute: ForExecuteHandler,
    state: {
      variable: variable.toLowerCase(),
      initial: Number(initial),
      limit: Number(limit),
      increment: increment !== undefined ? Number(increment) : 1
    }
  };
}

export default ForParseHandler;
