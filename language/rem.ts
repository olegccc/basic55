type RemConfiguration = {
  execute: Function;
}

function RemExecuteHandler() {
}

function RemParseHandler() : RemConfiguration {
  return {
    execute: RemExecuteHandler
  };
}

export default RemParseHandler;
