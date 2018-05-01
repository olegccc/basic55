import {executeExpression, parseExpression} from "./expression";
import {Context, Expression} from "./context";

type OnGoToStatement = {
  expression: Expression;
  lines: number[];
}

type OnGoToConfiguration = {
  state: OnGoToStatement;
  execute: Function;
}

function OnGoToExecuteHandler(context: Context, state: OnGoToStatement) {
  let value = executeExpression(context, state.expression);
  value = Math.round(value);
  if (value < 1 || value > state.lines.length) {
    throw Error('on go to: value ' + value + ' does not fit into list of lines');
  }
  context.next = state.lines[value-1];
}

function OnGoToParseHandler(text: string, lines: string): OnGoToConfiguration {
  const expression = parseExpression(text);
  const numbers = lines.split(',').map(p => Number(p));
  return {
    state: {
      expression,
      lines: numbers
    },
    execute: OnGoToExecuteHandler
  };
}

export default OnGoToParseHandler;
