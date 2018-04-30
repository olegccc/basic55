import {Context} from "./types";

type GotoStatement = {
  line: number;
}

type GotoConfiguration = {
  state: GotoStatement;
  execute: Function;
}

function GotoExecuteHandler(context: Context, state: GotoStatement) {
  context.next = state.line;
}

function GotoParseHandler(line: string): GotoConfiguration {
  return {
    execute: GotoExecuteHandler,
    state: {
      line: Number(line)
    }
  };
}

export default GotoParseHandler;
