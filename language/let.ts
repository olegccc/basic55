import {Context, Expression, Statement} from "./types";
import {executeExpression, parseExpression} from "./expression";

type LetStatement = {
  expression: Expression;
  variable: string;
  indexes?: number[];
}

type LetConfiguration = {
  state: LetStatement;
  execute: Function;
}

function LetExecuteHandler(context: Context, state: LetStatement) {
  if (state.indexes) {
    if (!context.arrays[state.variable]) {
      throw Error('unknown array: ' + state.variable);
    }
    const array = state.indexes.slice(0, state.indexes.length-1).reduce((p, c) => p[c], context.arrays[state.variable]);
    array[state.indexes[state.indexes.length-1]] = executeExpression(context, state.expression);
  } else {
    context.variables[state.variable] = executeExpression(context, state.expression);
  }
}

function LetParseHandler(value: string, text: string): LetConfiguration {

  const expression = parseExpression(text);

  const arrayMatch = value.match(/$([\w$]+)\(\s*(\d+(\s*,\s*\d+)*)\s*\)/);
  let arrayIndexes;
  if (arrayMatch) {
    value = arrayMatch[1];
    arrayIndexes = arrayMatch[2].split(',').map(p => Number(p));
  }

  return {
    state: {
      expression,
      variable: value,
      indexes: arrayIndexes
    },
    execute: LetExecuteHandler
  };
}

export default LetParseHandler;
