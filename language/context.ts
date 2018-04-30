export type Statement = {
  state: any;
  execute: Function;
  line: number;
}

export type Expression = {
  arg1: Expression | number | string;
  arg2?: Expression | number | string | number[] | Expression[];
  operation: Operation;
}

export type ForContext = {
  first: number;
  increment: number;
  limit: number;
}

export type Context = {
  arrays: any;
  variables: any;
  functions: any;
  next: number;
  output: string[];
  input: string[];
  subs: number[];
  cycles: {[key: string]: ForContext}
  stop: boolean;
}

export enum Operation {
  UNKNONW,
  PLUS,
  MINUS,
  FUNCTION,
  MULTIPLY,
  DIVIDE,
  VARIABLE,
  NUMBER,
  TEXT
}

export function createContext() : Context {
  const context: Context = {
    arrays: {},
    variables: {},
    functions: {},
    next: 0,
    output: [],
    input: [],
    subs: [],
    cycles: {},
    stop: false
  };
  context.functions.abs = Math.abs.bind(Math);
  context.functions.min = Math.min.bind(Math);
  context.functions.atn = Math.atan.bind(Math);
  context.functions.cos = Math.cos.bind(Math);
  context.functions.exp = Math.exp.bind(Math);
  context.functions.int = Math.floor.bind(Math);
  context.functions.log = Math.log.bind(Math);
  context.functions.sin = Math.sin.bind(Math);
  context.functions.sqr = Math.sqrt.bind(Math);
  return context;
}