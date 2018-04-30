import {Context, Expression} from "./types";
import {executeExpression, getExpressionAndLength} from "./expression";

type PrintStatement = {
  expressions: Expression[];
}

type PrintConfiguration = {
  state: PrintStatement;
  execute: Function;
}

function PrintParseHandler(text: string) : PrintConfiguration {

  const expressions: Expression[] = [];

  while (text.length > 0) {
    text = text.trim();
    if (text.length === 0) {
      break;
    }
    const { expression, length } = getExpressionAndLength(text);

    expressions.push(expression);
    text = text.substr(length).trim();

    if (text.length === 0) {
      break;
    }

    if (text[0] !== ';' && text[0] !== ',') {
      throw Error('unknown expression: ' + text);
    }

    text = text.substr(1);
  }

  return {
    state: {
      expressions
    },
    execute: PrintExecuteHandler
  };
}

function PrintExecuteHandler(context: Context, state: PrintStatement) {

  let output: string = '';

  for (let i = 0; i < state.expressions.length; i++) {
    if (i > 0) {
      output += ' ';
    }
    output += executeExpression(context, state.expressions[i]);
  }
  context.output.push(output);
}

export default PrintParseHandler;
