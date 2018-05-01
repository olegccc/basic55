import {Context} from "./context";

type OptionStatement = {
  base: number;
}

type OptionConfiguration = {
  state: OptionStatement;
  execute: Function;
}

function OptionExecuteHandler(context: Context, state: OptionStatement) {
  context.indexBase = state.base;
}

function OptionParseHandler(option: string): OptionConfiguration {
  return {
    state: {
      base: Number(option)
    },
    execute: OptionExecuteHandler
  };
}

export default OptionParseHandler;
