import Random from './prng'

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
  data: any[];
  dataPosition: number;
  indexBase: number;
  random: Random;
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
    random: new Random(),
    arrays: {},
    variables: {},
    functions: {
      abs: Math.abs.bind(Math),
      min: Math.min.bind(Math),
      atn: Math.atan.bind(Math),
      cos: Math.cos.bind(Math),
      exp: Math.exp.bind(Math),
      int: Math.floor.bind(Math),
      log: Math.log.bind(Math),
      sin: Math.sin.bind(Math),
      sqr: Math.sqrt.bind(Math),
      sgn: (x: number): number => x < 0 ? -1 : x === 0 ? 0 : 1,
      tan: Math.tan.bind(Math)
    },
    next: 0,
    output: [],
    input: [],
    subs: [],
    cycles: {},
    stop: false,
    data: [],
    dataPosition: 0,
    indexBase: 1
  };
  context.functions.rnd = () => context.random.nextFloat();
  return context;
}
