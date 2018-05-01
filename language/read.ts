import {Context} from "./context";

type ReadStatement = {
  variables: string[];
}

type ReadConfiguration = {
  state: ReadStatement;
  execute: Function;
}

function ReadExecuteHandler(context: Context, state: ReadStatement) {
  for (let variable in state.variables) {
    const match = variable.match(/^([\w$]+)\(([\d,]*)\)/);
    if (match) {
      const indexes = match[2].split(',').map(i => Number(i));
      const name = match[1].toLowerCase();
      if (!context.arrays[name]) {
        throw Error('cannot find array: ' + name);
      }
      const array = indexes.slice(0, indexes.length-1).reduce((p, c) => p[c-context.indexBase], context.arrays[name]);
      array[indexes[indexes.length-1]-context.indexBase] = context.data[context.dataPosition++];
    } else if (context.variables[variable]) {
      context.variables[variable] = context.data[context.dataPosition++];
    } else {
      throw Error('cannot parse: ' + variable);
    }
  }
}

function ReadParseHandler(text: string): ReadConfiguration {
  const variables: string[] = [];
  while (text.length > 0) {
    text = text.trim();
    if (text.length === 0) {
      break;
    }
    let match = text.match(/^([\w$]+\([\d,]*\)|[\w$]+)/);
    if (!match) {
      throw Error('cannot parse: ' + text);
    }
    variables.push(match[0]);
    text = text.substr(match[0].length).trim();
    if (text.length === 0) {
      break;
    }
    if (text[0] != ',') {
      throw Error('expected comma but got: ' + text);
    }
    text = text.substr(1);
  }

  return {
    state: {
      variables
    },
    execute: ReadExecuteHandler
  };
}

export default ReadParseHandler;
