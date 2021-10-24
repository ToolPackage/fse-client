import React, { Component, ReactElement } from 'react';
import { names } from './util';
import { ipcRenderer } from 'electron';
import { Channels, WINDOW_STATE } from '../../common/Constants';
import Button from './Button';

const styles = require('./Header.css') as any
const iconStyles = require('../assets/icon/iconfont.css') as any

interface HeaderProps {
  title: string
  element?: string | HTMLElement | ReactElement
}

interface State {
  windowState: number
}

export default class Header extends Component<HeaderProps, State> {

  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      windowState: this.fetchWindowState()
    }
  }

  private fetchWindowState() {
    return ipcRenderer.sendSync(Channels.WindowAction.FetchWindowState)
  }

  render() {
    const { windowState } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.textGroup}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.element}>{this.props.element}</div>
          <div className={styles.grabArea}></div>
        </div>
        <div className={styles.windowControlGroup}>
          <Button style={{cursor: 'default'}}
            onClick={() => this.setState({windowState: ipcRenderer.sendSync(Channels.WindowAction.MinimizeWindow)})}>
            <i className={names(iconStyles.iconfont, iconStyles.iconMinimize)}></i>
          </Button>
          <Button style={{cursor: 'default'}}
            onClick={() => {
              if (windowState == WINDOW_STATE.NORMAL) {
                  this.setState({windowState: ipcRenderer.sendSync(Channels.WindowAction.MaximizeWindow)})
              } else if (windowState == WINDOW_STATE.MAXIMIZED) {
                  this.setState({windowState: ipcRenderer.sendSync(Channels.WindowAction.UnmaximizeWindow)})
              }
            }}>
            <i className={names(iconStyles.iconfont, iconStyles.iconMaximize)}></i>
          </Button>
          <Button style={{cursor: 'default'}}
            onClick={() => this.setState({windowState: ipcRenderer.sendSync(Channels.WindowAction.CloseWindow)})}>
            <i className={names(iconStyles.iconfont, iconStyles.iconClose)}></i>
          </Button>
        </div>
      </div>
    )
  }
}