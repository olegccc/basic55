import {Context} from "./context";

type DimVariable = {
  name: string;
  dimensions: number[];
}

type DimStatement = {
  variables: DimVariable[];
}

type DimConfiguration = {
  state: DimStatement;
  execute: Function;
}

function createArray(dimensions: number[]): any {
  if (dimensions.length === 0) {
    return undefined;
  }
  const ret = [];
  const dim = dimensions[0];
  const next = dimensions.slice(1);
  for (let i = 0; i < dim; i++) {
    ret[i] = createArray(next);
  }
  return ret;
}

function DimExecuteHandler(context: Context, state: DimStatement) {
  for (const variable of state.variables) {
    context.arrays[variable.name] = createArray(variable.dimensions);
  }
}

function DimParseHandler(text: string): DimConfiguration {
  const variables: DimVariable[] = [];

  while (text.length > 0) {
    text = text.trim();
    if (text.length === 0) {
      break;
    }
    const match = text.match(/^([\w$]+)\s*\(([\d,]+)\)/);
    if (!match) {
      throw Error('cannot parse: ' + text);
    }
    const name = match[1].toLowerCase();
    const dimensions = match[1].split(',').map(i => Number(i));
    variables.push({
      name,
      dimensions
    });
    text = text.substr(match[0].length);
    text = text.trim();
    if (text.length === 0) {
      break;
    }
    if (text[0] !== ',') {
      throw Error('expected comma: ' + text);
    }
    text = text.substr(1);
  }

  return {
    state: {
      variables
    },
    execute: DimExecuteHandler
  };
}

export default DimParseHandler;
