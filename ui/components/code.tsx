import * as React from 'react'
import { connect } from 'react-redux'
import {BasicStore} from "../redux"
import Squire = require('squire-rte')

type CodeComponentProps = {}
type CodeComponentState = {}

export class CodeComponent extends React.Component<CodeComponentProps, CodeComponentState> {

  private editor?: Squire;

  constructor(props: CodeComponentProps) {
    super(props);
    this.state = {};
    this.editor = undefined;
  }

  componentDidMount() {
    this.editor = new Squire(this.refs.editor as Element);
    this.editor.addEventListener('input', () => this.onTextChanged())
  }

  onTextChanged() {
    console.log('change');
  }

  render() {
    return <div ref="editor" className="code"/>;
  }
}

const mapStateToProps = (_: BasicStore, props: CodeComponentProps) => {
  return {};
};

export default connect(mapStateToProps, {})(CodeComponent);
