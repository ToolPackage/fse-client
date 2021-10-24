  
import React, { Component } from 'react';

const styles = require('./Container.css') as any

export default class Container extends Component {

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          {this.props.children}
        </div>
      </div>
    )
  }
}