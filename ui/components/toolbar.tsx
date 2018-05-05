import * as React from 'react'
import { connect } from 'react-redux'
import {BasicStore} from "../redux"

type ToolbarComponentProps = {
  onClick: Function;
}

export class ToolbarComponent extends React.Component<ToolbarComponentProps> {

  constructor(props: ToolbarComponentProps) {
    super(props);
  }

  render() {
    return <div className="toolbar">
      <input className="button" type="button" onClick={() => this.props.onClick()} value="Run!"/>
    </div>;
  }
}

const mapStateToProps = (_: BasicStore, props: ToolbarComponentProps) => {
  return {};
};

export default connect(mapStateToProps, {})(ToolbarComponent);
