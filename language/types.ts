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