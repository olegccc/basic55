import {Context, Expression} from "./types";
import {executeExpression, getExpressionAndLength} from "./expression";

enum Relation {
  EQUAL,
  NOT_EQUAL,
  LESS,
  GREATER,
  GREATER_EQUAL,
  LESS_EQUAL
}

type IfStatement = {
  line: number;
  left: Expression;
  right: Expression;
  relation: Relation;
}

type IfConfiguration = {
  state: IfStatement;
  execute: Function;
}

function IfThenExecuteHandler(context: Context, state: IfStatement) {
  const left = executeExpression(context, state.left);
  const right = executeExpression(context, state.right);
  let success;
  switch (state.relation) {
    case Relation.EQUAL:
      success = left == right;
      break;
    case Relation.NOT_EQUAL:
      success = left != right;
      break;
    case Relation.LESS:
      success = left < right;
      break;
    case Relation.LESS_EQUAL:
      success = left <= right;
      break;
    case Relation.GREATER:
      success = left > right;
      break;
    case Relation.GREATER_EQUAL:
      success = left >= right;
      break;
  }
  if (success) {
    context.next = state.line;
  }
}

function IfThenParseHandler(relational: string, line: string): IfConfiguration {
  relational = relational.trim();
  let { expression, length } = getExpressionAndLength(relational);
  const left = expression;
  relational = relational.substr(length).trim();
  const match = relational.match(/^([<>=]+)\w+/);
  if (!match) {
    throw Error('cannot find relation: ' + relational);
  }
  let relation: Relation;
  switch (match[1]) {
    case '<>':
      relation = Relation.NOT_EQUAL;
      break;
    case '=':
      relation = Relation.EQUAL;
      break;
    case '<':
      relation = Relation.LESS;
      break;
    case '>':
      relation = Relation.GREATER;
      break;
    case '<=':
      relation = Relation.LESS_EQUAL;
      break;
    case '>=':
      relation = Relation.GREATER_EQUAL;
      break;
    default:
      throw Error('unknown relation: ' + match[1]);
  }
  relational = relational.substr(match[0].length);
  const ret = getExpressionAndLength(relational);
  const right = ret.expression;
  if (ret.length != relational.length) {
    throw Error('cannot parse: ' + relational);
  }
  return {
    state: {
      line: Number(line),
      left,
      right,
      relation
    },
    execute: IfThenExecuteHandler
  };
}

export default IfThenParseHandler;
