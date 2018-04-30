import {Context} from "./context";

type InputStatement = {
  variables: string[];
}

type InputConfiguration = {
  state: InputStatement;
  execute: Function;
}

function InputExecuteHandler(context: Context, state: InputStatement) {
  const line = context.input[0];
  context.input = context.input.slice(1);
  const values = line.split(',').map(t => t.trim());
  for (let i = 0; i < state.variables.length; i++) {
    let value: any = values[i];
    if (/^[-+]?\d*(.\d*)$/.test(value)) {
      value = Number(value);
    }
    context.variables[state.variables[i]] = value;
  }
}

function InputParseHandler(text: string): InputConfiguration {
  const variables = text.split(',').map(t => t.trim());
  return {
    state: {
      variables
    },
    execute: InputExecuteHandler
  };
}

export default InputParseHandler;
