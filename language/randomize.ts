import {Context} from "./context";

type RandomizeConfiguration = {
  execute: Function;
}

function RandomizeExecuteHandler(context: Context) {
  context.random = new Random();
}

function RandomizeParseHandler(): RandomizeConfiguration {
  return {
    execute: RandomizeExecuteHandler
  };
}

export default RandomizeParseHandler;
