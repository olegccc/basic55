import {Context} from "./types";

type GoSubStatement = {
  line: number;
}

type GoSubConfiguration = {
  state: GoSubStatement;
  execute: Function;
}

function GoSubExecuteHandler(context: Context, state: GoSubStatement) {
  context.subs.push(context.next);
  context.next = state.line;
}

function GoSubParseHandler(line: string) {
  return {
    state: {
      line: Number(line)
    },
    execute: GoSubExecuteHandler
  };
}

export default GoSubParseHandler;
