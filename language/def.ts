import {Context, Expression} from "./context";
import {executeExpression, parseExpression} from "./expression";

type DefStatement = {
  variables: string[];
  expression: Expression;
  name: string;
}

type DefConfiguration = {
  state: DefStatement;
  execute: Function;
}

function DefExecuteHandler(context: Context, state: DefStatement) {
  context.functions[state.name] = function() {
    const saved: any = {};
    for (let i = 0; i < state.variables.length; i++) {
      const variable = state.variables[i];
      saved[variable] = context.variables[variable];
      context.variables[variable] = arguments[i];
    }
    const result = executeExpression(context, state.expression);
    for (let variable of state.variables) {
      context.variables[variable] = saved[variable];
    }
    return result;
  }
}

function DefParseHandler(name: string, args: string, text?: string): DefConfiguration {
  let variables: string[];
  let expression: Expression;

  if (!text) {
    variables = [];
    expression = parseExpression(args);
  } else {
    variables = args.split(',').map(p => p.trim());
    expression = parseExpression(text);
  }

  return {
    execute: DefExecuteHandler,
    state: {
      variables,
      expression,
      name: name.toLowerCase()
    }
  };
}

export default DefParseHandler;
