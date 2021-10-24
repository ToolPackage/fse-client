import React, { Component } from 'react';

const styles = require('./PageRouter.css') as any;

export default class PageRouter extends Component {

  render() {
    return (
      <div className={styles.pageRouter}>
        {this.props.children}
      </div>
    )
  }
}