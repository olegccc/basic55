import { combineReducers } from "redux";

import { codeReducer } from './code'

export type BasicStore = {
  code: any
};

export default combineReducers<BasicStore>({
  code: codeReducer
});
