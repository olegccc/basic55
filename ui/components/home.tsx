import * as React from 'react'
import { connect } from 'react-redux';
import {BasicStore} from "../redux";

type HomeComponentProps = {};
type HomeComponentState = {};

export class HomeComponent extends React.Component<HomeComponentProps, HomeComponentState> {
  constructor(props: HomeComponentProps) {
    super(props);
  }

  render() {
    return <div/>;
  }
}

const mapStateToProps = (_: BasicStore, props: HomeComponentProps) => {
  return {};
};

export default connect<any, any, any>(mapStateToProps, {})(HomeComponent);
