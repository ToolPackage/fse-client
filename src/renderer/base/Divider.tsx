import React, { Component } from 'react';

const styles = require('./Divider.css') as any;

export default class Divider extends Component {

  render() {
    return (
      <div className={styles.divider}></div>
    )
  }
}