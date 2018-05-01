import {Context} from "./context";

type DataStatement = {
  constants: any[];
}

type DataConfiguration = {
  state: DataStatement;
  execute: Function;
}

function DataExecuteHandler(context: Context, state: DataStatement) {
  for (const c of state.constants) {
    context.data.push(c);
  }
}

function DataParseHandler(text: string): DataConfiguration {
  const constants: any = [];
  while (text.length > 0) {
    text = text.trim();
    if (text.length === 0) {
      break;
    }
    let match = text.match(/^"([^"]*)"/);
    if (match) {
      constants.push(match[1]);
      text = text.substr(0, match[0].length);
    } else {
      match = text.match(/^[+-]?(\d+(\.\d*)?|\.\d+)(E[+-]\d+)?/i);
      if (match) {
        constants.push(match[0]);
        text = text.substr(0, match[0].length);
      } else {
        match = text.match(/^PI/i);
        if (match) {
          constants.push(Math.PI);
          text = text.substr(2);
        } else {
          throw Error('unknown data statement contents: ' + text);
        }
      }
    }
    text = text.trim();
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
      constants
    },
    execute: DataExecuteHandler
  };
}

export default DataParseHandler;
