import React, { Component } from 'react';
import AnimatedElement from '../base/AnimatedElement';
import Button from '../base/Button';
import Divider from '../base/Divider';
import em from '../component/EventManager';
import Events from '../component/Events';
import { names } from '../base/util';

const styles = require('./ExamplePage.css') as any;
const iconStyles = require('../assets/icon/iconfont.css') as any;

export default class ExamplePage extends Component {

  render() {
    return (
      <div className={styles.examplePage}>
        <ExampleList />
        <DetailPanel projectName='ModelViewer'/>
      </div>
    )
  }
}

class ExampleList extends Component {

  render() {
    return (
      <div className={styles.exampleList}>
        <div className={styles.header}>
          <Button fixSize={false} style={{width: '100%'}}>Import</Button>
          <Button fixSize={false} style={{width: '100%'}}>Refresh</Button>
          <Button fixSize={false} style={{width: '100%'}}>Manage</Button>
        </div>
        <div className={styles.content}>
          <ExampleListItem projectName='Project A' currentBranch='pr-ll' lastUpdateOn='Updated 13 mins ago' projectPath='C:/Workspace/example/projectA' />
          <Divider />
          <ExampleListItem projectName='Project B' currentBranch='master' lastUpdateOn='Updated 13 mins ago' projectPath='C:/Workspace/example/projectB' />
        </div>
      </div>
    )
  }
}

interface ExampleListItemProps {
  projectName: string
  currentBranch: string
  lastUpdateOn: string
  projectPath: string
  githubLink?: string
}

class ExampleListItem extends Component<ExampleListItemProps> {

  private openRightClickMenu(x: number, y: number) {
    em.emit(Events.OPEN_RIGHT_CLICK_MENU, {
      position: {x, y},
      content: {
        sections: [
          {
            items: [
              {
                name: 'Reveal in File Explorer',
                command: 'mit://localhost/project/open-file-explorer?path=' + this.props.projectPath
              },
              {
                name: 'Open in Github',
                command: 'mit://localhost/project/open-github?url=' + this.props.githubLink
              }
            ]
          }
        ]
      }
    })
  }

  render() {
    return (
      <AnimatedElement
        className={styles.exampleListItem}
        active={{backgroundColor: 'rgb(100, 100, 100)'}}
        hover={{backgroundColor: 'rgb(56, 56, 56)'}}
        style={{backgroundColor: 'rgb(46, 46, 46)'}}
        onContextMenu={(evt) => {
          this.openRightClickMenu(evt.clientX, evt.clientY)
        }}>
          <div className={styles.projectName}>{this.props.projectName}</div>
          <div className={styles.projectDetails}>
            <i className={names(iconStyles.iconfont, iconStyles.iconGitBranch)}></i>
            <span className={styles.currentBranch}>{this.props.currentBranch}</span>
            <span className={styles.lastUpdateOn}>{this.props.lastUpdateOn}</span>
          </div>
          <div className={styles.projectPath}>{this.props.projectPath}</div>
      </AnimatedElement>
    )
  }
}

interface DetailPanelProps {
  projectName: string
  githubLink?: string
}

class DetailPanel extends Component<DetailPanelProps> {

  render() {
    return (
      <div className={styles.buildPanel}>
        <div className={styles.header}>
          <div className={styles.name}>{this.props.projectName}</div>
          <div className={styles.githubLink}>
            <i className={names(iconStyles.iconfont, iconStyles.iconGithub)}></i>
          </div>
        </div>
        <div className={styles.content}>

        </div>
      </div>
    )
  }
}