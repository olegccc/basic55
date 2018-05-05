import {Action} from 'redux';

export interface CodeAction extends Action {
}

export interface CodeState {
}

export function codeReducer(
  state: CodeState = {},
  action: CodeAction
) {
  switch (action.type) {
    default:
      return state;
  }
}
