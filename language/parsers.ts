import LetParseHandler from './let'
import GotoParseHandler from './goto'
import IfThenParseHandler from './ifthen'
import GoSubParseHandler from './gosub'
import OnGoToParseHandler from './ongoto'
import ReturnParseHandler from './return'
import StopParseHandler from "./stop";
import ForParseHandler from "./for";
import NextParseHandler from "./next";
import PrintParseHandler from "./print";
import InputParseHandler from "./input";
import ReadParseHandler from "./read";
import RestoreParseHandler from "./restore";
import DataParseHandler from "./data";
import DimParseHandler from "./dim";
import RemParseHandler from "./rem";
import RandomizeParseHandler from "./randomize";
import DefParseHandler from "./def";
import OptionParseHandler from "./option";

export type StatementParser = {
  match: RegExp;
  handler: Function;
}

const parsers: StatementParser[] = [
  {
    match: /^LET\s+([\w,()$]+)\s*=\s*(.+)$/i,
    handler: LetParseHandler
  },
  {
    match: /^GO\s*TO\s+(\d+)$/i,
    handler: GotoParseHandler
  },
  {
    match: /^IF\s+(.+)\s+THEN\s+(\d+)$/i,
    handler: IfThenParseHandler
  },
  {
    match: /^GO\s+SUB\s+(\d+)$/i,
    handler: GoSubParseHandler
  },
  {
    match: /^ON\s+(.+)\s+GO\s*TO\s+((\d+)(\s*,\s*\d+)*)$/i,
    handler: OnGoToParseHandler
  },
  {
    match: /^RETURN$/i,
    handler: ReturnParseHandler
  },
  {
    match: /^(STOP|END)$/i,
    handler: StopParseHandler
  },
  {
    match: /^FOR\s+([\w$]+)\s*=\s*(-?\d+)\s+TO\s+(-?\d+)(\s+STEP\s+(-?\d+))?$/i,
    handler: ForParseHandler
  },
  {
    match: /^NEXT\s*([\w$]+)$/i,
    handler: NextParseHandler
  },
  {
    match: /^PRINT\s+(.+)$/i,
    handler: PrintParseHandler
  },
  {
    match: /^INPUT\s+(\w+(\s*,\s*\w+)*)$/i,
    handler: InputParseHandler
  },
  {
    match: /^READ\s+(.+)$/i,
    handler: ReadParseHandler
  },
  {
    match: /^RESTORE$/i,
    handler: RestoreParseHandler
  },
  {
    match: /^DATA\s+(.+)$/i,
    handler: DataParseHandler
  },
  {
    match: /^DIM\s+(.+)$/i,
    handler: DimParseHandler
  },
  {
    match: /^REM\s?.*$/i,
    handler: RemParseHandler
  },
  {
    match: /^RANDOMIZE$/i,
    handler: RandomizeParseHandler
  },
  {
    match: /^DEF\s+(\w+)(?:\(([\w$]+)\))?\s+=\s+.+$/,
    handler: DefParseHandler
  },
  {
    match: /^OPTION\s+BASE\s+(0|1)$/,
    handler: OptionParseHandler
  }
];

export default parsers;