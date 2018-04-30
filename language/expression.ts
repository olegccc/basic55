import {Context, Expression, Operation} from "./types";

export type ExpressionAndLength = {
  expression: Expression;
  length: number;
}

function getCloseBracePos(text: string, pos: number) {
  let count = 1;
  pos = 1;
  while (count > 0 && pos < text.length) {
    if (text[pos] == '(') {
      count++;
    } else if (text[pos] == ')') {
      count--;
    }
    pos++;
  }
  if (count !== 0) {
    return -1;
  }
  return pos;
}

function getSingleExpressionAndLength(text: string) : ExpressionAndLength {
  let pos;
  if (text[0] == '(') {
    pos = getCloseBracePos(text, 1);
    if (pos < 0) {
      throw Error('cannot find closing brace in: ' + text);
    }
    return {
      expression: getExpression(text.substr(1, pos-2)),
      length: pos
    };
  }

  let match = text.match(/^([\w$]+)\(/);
  if (match) {
    const from = match[0].length;
    pos = getCloseBracePos(text, from);
    if (pos < 0) {
      throw Error('cannot find closing brace in: ' + text);
    }
    const name = match[1];

    return {
      length: pos,
      expression: {
        arg1: name,
        arg2: getFunctionArguments(text.substr(from, pos-from-1)),
        operation: Operation.FUNCTION
      }
    };
  }

  match = text.match(/^"([^"])*"/);
  if (match) {
    return {
      length: match[0].length,
      expression: {
        arg1: match[1],
        operation: Operation.TEXT
      }
    };
  }

  match = text.match(/^[+-]?(\d+(\.\d*)?|\.\d+)/);
  if (match) {
    return {
      length: match[0].length,
      expression: {
        arg1: Number(match[0]),
        operation: Operation.NUMBER
      }
    };
  }

  match = text.match(/^[\w$]+/);
  if (match) {
    const name = match[0];
    return {
      length: match[0].length,
      expression: {
        arg1: name,
        operation: Operation.VARIABLE
      }
    };
  }

  throw Error('cannot recognize: ' + text);
}

function getOperation(c: string): Operation {
  switch (c) {
    case '+': return Operation.PLUS;
    case '-': return Operation.MINUS;
    case '*': return Operation.MULTIPLY;
    case '/': return Operation.DIVIDE;
  }
  return Operation.UNKNONW;
}

function getOperationPriority(operation: Operation): number {
  switch (operation) {
    case Operation.PLUS:
    case Operation.MINUS:
      return 2;
    case Operation.MULTIPLY:
    case Operation.DIVIDE:
      return 1;
    default:
      return 3;
  }
}

function getExpressionFromList(expressions: Expression[], operations: Operation[]): Expression {
  if (expressions.length === 1) {
    return expressions[0];
  }

  let pos = -1;
  let priority = 0;

  for (let i = 0; i < operations.length; i++) {
    const p = getOperationPriority(operations[i]);
    if (pos === -1 || priority > p) {
      pos = i;
      priority = p;
    }
  }

  const left = getExpressionFromList(expressions.slice(0, pos+1), operations.slice(0, pos));
  const right = getExpressionFromList(expressions.slice(pos+1), operations.slice(pos+1));

  return {
    arg1: left,
    arg2: right,
    operation: operations[pos]
  };
}

export function getExpressionAndLength(text: string): ExpressionAndLength {
  const expressions: Expression[] = [];
  const operations: Operation[] = [];
  let length = 0;
  while (text.length > 0) {
    if (text[0] == ' ') {
      text = text.substr(1);
      length++;
      continue;
    }
    const { expression, length: el } = getSingleExpressionAndLength(text);
    expressions.push(expression);
    text = text.substr(el);
    length += el;
    while (text.length > 0 && text[0] == ' ') {
      text = text.substr(1);
      length++;
    }
    if (text.length === 0) {
      break;
    }
    const operation = getOperation(text[0]);
    if (operation === Operation.UNKNONW) {
      throw Error('unknown operation: ' + text[0]);
    }
    operations.push(operation);
    text = text.substr(1);
    length += 1;
  }
  if (expressions.length === 0) {
    throw Error('empty expression');
  }

  return {
    expression: getExpressionFromList(expressions, operations),
    length
  };
}

function getExpression(text: string): Expression {
  const { expression, length } = getExpressionAndLength(text);
  if (length != text.length) {
    throw Error('cannot parse: ' + text.substr(length));
  }
  return expression;
}

function getFunctionArguments(text: string): Expression[] {
  const ret: Expression[] = [];
  while (text.length > 0) {
    text = text.trim();
    if (text.length === 0) {
      break;
    }
    const { expression, length } = getExpressionAndLength(text);
    ret.push(expression);
    text = text.substr(length);
    text = text.trim();
    if (text.length > 0 && text[0] != ',') {
      throw Error('cannot parse: ' + text);
    }
    text = text.substr(1);
  }
  return ret;
}

export function parseExpression(text: string): Expression {
  return getExpression(text);
}

export function executeExpression(context: Context, expression: Expression): any {
  if (expression.operation === Operation.NUMBER || expression.operation == Operation.TEXT) {
    return expression.arg1;
  }

  if (expression.operation === Operation.VARIABLE) {
    const variable = context.variables[<string> expression.arg1];
    if (variable === undefined) {
      throw Error('cannot find variable ' + expression.arg1);
    }
    return variable;
  }

  if (expression.operation == Operation.FUNCTION) {
    const name = <string> expression.arg1;
    const values = (<Expression[]>expression.arg2).map(e => executeExpression(context, e));
    if (context.arrays[name]) {
      return values.reduce((p, c) => p[c], context.arrays[name]);
    } else if (context.functions[name]) {
      return context.functions[name].apply(null, values);
    } else {
      throw Error('cannot find function ' + name);
    }
  }

  if (expression.operation === Operation.DIVIDE || expression.operation === Operation.MULTIPLY || expression.operation === Operation.MINUS || expression.operation === Operation.PLUS) {
    const left = executeExpression(context, <Expression> expression.arg1);
    const right = executeExpression(context, <Expression> expression.arg2);
    switch (expression.operation) {
      case Operation.DIVIDE:
        return left / right;
      case Operation.MULTIPLY:
        return left * right;
      case Operation.PLUS:
        return left + right;
      case Operation.MINUS:
        return left - right;
    }
  }

  throw Error('unknown expression type');
}
