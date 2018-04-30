import {Context} from "./types";

type ReturnConfiguration = {
  execute: Function;
}

function ReturnExecuteHandler(context: Context) {
  context.next = context.subs[context.subs.length-1];
  context.subs.pop();
}

function ReturnParseHandler() : ReturnConfiguration {
  return {
    execute: ReturnExecuteHandler
  };
}

export default ReturnParseHandler;
