import * as React from 'react'
import { connect } from 'react-redux';
import {BasicStore} from "../redux";

import {compile, run} from "../../language"

import Code from './code'
import Toolbar from './toolbar'
import Results from './results'

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
    return <div className="page">
      <Code/>
      <Toolbar onClick={() => this.run()}/>
      <Results/>
    </div>;
  }
}

const mapStateToProps = (_: BasicStore, props: HomeComponentProps) => {
  return {};
};

export default connect(mapStateToProps, {})(HomeComponent);
