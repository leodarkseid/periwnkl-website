import React, { Component } from 'react';
import ModelViewer from '@metamask/logo';;

class MetamaskLogo extends Component {
  componentDidMount() {
    this.viewer = ModelViewer({
      pxNotRatio: true,
      width: 300,
      height: 300,
      followMouse: true
    });
    this.el.appendChild(this.viewer.container);
  }

  componentWillUnmount() {
    this.viewer.stopAnimation();
  }

  render() {
    return (
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
      
        ref={el => (this.el = el)}
      />
    );
  }
}

export default MetamaskLogo;