import * as React from 'react'
import { connect } from 'react-redux';
import {BasicStore} from "../redux";

import {compile, run} from "../../language"

type HomeComponentProps = {};
type HomeComponentState = {
  code?: string;
  output?: string[];
};

export class HomeComponent extends React.Component<HomeComponentProps, HomeComponentState> {
  constructor(props: HomeComponentProps) {
    super(props);
    this.state = {
    };
  }

  run() {
    try {
      const statements = compile(this.state.code || '');
      this.setState({
        output: run(statements)
      });
    } catch (error) {
      this.setState({
        output: ['Error: ' + error.message]
      });
    }
  }

  render() {
    let idx = 1;
    return <div className="page">
      <textarea className="code" onChange={e => this.setState({ code: e.target.value })}>{this.state.code}</textarea>
      <input className="button" type="button" onClick={() => this.run()} value="Run!"/>
      <div className="output">
        <div className="title">Output</div>
        <div>{(this.state.output || []).map(line => <div key={idx++}>{line}</div>)}</div>
      </div>
    </div>;
  }
}

const mapStateToProps = (_: BasicStore, props: HomeComponentProps) => {
  return {};
};

export default connect<any, any, any>(mapStateToProps, {})(HomeComponent);
