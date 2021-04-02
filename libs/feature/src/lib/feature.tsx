import React from 'react';
import Test from './test/test';

/* eslint-disable-next-line */
export interface FeatureProps {
  seconds: number;
}

export class Feature extends React.Component<FeatureProps> {
  render() {
    return <Test seconds={this.props.seconds}/>;
  }
}

export default Feature;
