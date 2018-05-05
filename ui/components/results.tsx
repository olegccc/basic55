import * as React from 'react'
import { connect } from 'react-redux'
import {BasicStore} from "../redux"

type ResultsComponentProps = {
}

type InnerProps = {
  output: string[];
}

export class ResultsComponent extends React.Component<ResultsComponentProps> {

  constructor(props: ResultsComponentProps | InnerProps) {
    super(props);
  }

  render() {

    const { output } = this.props as InnerProps;

    let idx = 1;
    return <div className="results">
      <div className="title">Output</div>
      <div>{(output || []).map(line => <div key={idx++}>{line}</div>)}</div>
    </div>;
  }
}

const mapStateToProps = (_: BasicStore, props: ResultsComponentProps) => {
  return {
    output: []
  } as ResultsComponentProps;
};

export default connect(mapStateToProps, {})(ResultsComponent);
