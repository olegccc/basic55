import LetParseHandler from './let'
import GotoParseHandler from './goto'
import IfThenParseHandler from './ifthen'
import GoSubParseHandler from './gosub'
import OnGoToHandler from './ongoto'
import ReturnParseHandler from './return'
import StopParseHandler from "./stop";
import ForParseHandler from "./for";
import NextParseHandler from "./next";
import PrintParseHandler from "./print";
import InputParseHandler from "./input";
import ReadHandler from "./read";
import RestoreHandler from "./restore";
import DataHandler from "./data";
import DimHandler from "./dim";
import RemHandler from "./rem";
import RandomizeHandler from "./randomize";

export type StatementParser = {
  match: RegExp;
  handler: Function;
}

const parsers: StatementParser[] = [
  {
    match: /^LET\s+([\w,()$]+)\s*=\s*(.+)$/,
    handler: LetParseHandler
  },
  {
    match: /^GO\s*TO\s+(\d+)$/,
    handler: GotoParseHandler
  },
  {
    match: /^IF\s+(.+)\s+THEN\s+(\d+)$/,
    handler: IfThenParseHandler
  },
  {
    match: /^GO\s+SUB\s+(\d+)$/,
    handler: GoSubParseHandler
  },
  {
    match: /^ON\s+(.+)\s+GO\s*TO\s+((\d+)(\s*,\s*\d+)*)$/,
    handler: OnGoToHandler
  },
  {
    match: /^RETURN$/,
    handler: ReturnParseHandler
  },
  {
    match: /^STOP$/,
    handler: StopParseHandler
  },
  {
    match: /^FOR\s+([\w$]+)\s*=\s*(-?\d+)\s+TO\s+(-?\d+)(\s+STEP\s+(-?\d+))?$/,
    handler: ForParseHandler
  },
  {
    match: /^NEXT\s*([\w$]+)$/,
    handler: NextParseHandler
  },
  {
    match: /^PRINT\s+(.+)$/,
    handler: PrintParseHandler
  },
  {
    match: /^INPUT\s+(\w+(\s*,\s*\w+)*)$/,
    handler: InputParseHandler
  },
  {
    match: /^READ\s+(\w+(\s*,\s*\w+)*)$/,
    handler: ReadHandler
  },
  {
    match: /^RESTORE$/,
    handler: RestoreHandler
  },
  {
    match: /^DATA\s+(\w+(\s*,\s*\w+)*)$/,
    handler: DataHandler
  },
  {
    match: /^DIM\s+(.+)$/,
    handler: DimHandler
  },
  {
    match: /^REM\s?.*$/,
    handler: RemHandler
  },
  {
    match: /^RANDOMIZE$/,
    handler: RandomizeHandler
  }
];

export default parsers;