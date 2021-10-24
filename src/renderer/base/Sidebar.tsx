import React, { Component } from 'react';
import AnimatedElement from './AnimatedElement';
import { names } from './util';
const styles = require('./Sidebar.css') as any;
const iconStyles = require('../assets/icon/iconfont.css') as any;

export default class Sidebar extends Component {

  render() {
    return (
      <div className={styles.sidebar}>
        <SidebarItem iconName='iconProject' />
        <div className={styles.alignToBottom}>
          <SidebarItem iconName='iconUser' />
          <SidebarItem iconName='iconConfig' />
        </div>
      </div>
    )
  }
}

interface SidebarItemProps {
  iconName: string
}

class SidebarItem extends Component<SidebarItemProps> {

  render() {
    return (
      <AnimatedElement className={styles.item}
        active={{color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(82, 82, 82)'}}
        hover={{color: 'rgb(190, 190, 190)'}}
        style={{color: 'rgb(95, 95, 95)', backgroundColor: 'rgb(56, 56, 56)'}}>
        <i className={names(iconStyles.iconfont, iconStyles[this.props.iconName])}></i>
      </AnimatedElement>
    )
  }
}