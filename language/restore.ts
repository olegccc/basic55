import {Context} from "./context";

type RestoreConfiguration = {
  execute: Function;
}

function RestoreExecuteHandler(context: Context) {
  context.dataPosition = 0;
}

function RestoreParseHandler() : RestoreConfiguration {
  return {
    execute: RestoreExecuteHandler
  };
}

export default RestoreParseHandler;
