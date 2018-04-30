import {Context} from "./types";

type StopConfiguration = {
  execute: Function;
}

function StopExecuteHandler(context: Context) {
  context.stop = true;
}

function StopParseHandler(): StopConfiguration {
  return {
    execute: StopExecuteHandler
  };
}

export default StopParseHandler;
