import React, { Component } from 'react';
import AnimatedElement from '../base/AnimatedElement';
import Button from '../base/Button';
import Divider from '../base/Divider';
import em from '../component/EventManager';
import Events from '../component/Events';
import { names } from '../base/util';

const styles = require('./BrowsePage.css') as any

const data: FileInfo[] = [
  {
    id: '1',
    name: 'tsc.json',
    creationDate: '2021/11/01 13:56:01',
    modDate: '2021/11/01 20:00:53',
    modDateDesc: '10小时前',
    contentType: 'json',
    fileSize: '2KB'
  },
  {
    id: '1',
    name: 'tsc.json',
    creationDate: '2021/11/01 13:56:01',
    modDate: '2021/11/01 20:00:53',
    modDateDesc: '10小时前',
    contentType: 'json',
    fileSize: '2KB'
  },
  {
    id: '1',
    name: 'tsc.json',
    creationDate: '2021/11/01 13:56:01',
    modDate: '2021/11/01 20:00:53',
    modDateDesc: '10小时前',
    contentType: 'json',
    fileSize: '2KB'
  },
  {
    id: '1',
    name: 'tsc.json',
    creationDate: '2021/11/01 13:56:01',
    modDate: '2021/11/01 20:00:53',
    modDateDesc: '10小时前',
    contentType: 'json',
    fileSize: '2KB'
  },
]

export default class BrowsePage extends Component{

  render() {
    return (
      <div className={styles.browsePage}>
        <ListView fileInfos={data} />
        <PreviewPanel />
      </div>
    )
  }
}

interface ListViewProps {
  fileInfos: FileInfo[]
}

class ListView extends Component<ListViewProps> {

  render() {
    const { fileInfos } = this.props
    let items = []
    for (let i = 1; i < fileInfos.length; i++) {
      items.push(<Divider key={'divider' + i} />)
      items.push(<ListItem key={i} fileInfo={fileInfos[i]} />)
    }
    items.unshift(<ListItem key={0} fileInfo={fileInfos[0]} />)
    
    return (
      <div className={styles.listView}>
        <div className={styles.listHeader}>
          <Button fixSize={false} style={{width: '100%'}}>Import</Button>
          <Button fixSize={false} style={{width: '100%'}}>Refresh</Button>
          <Button fixSize={false} style={{width: '100%'}}>Manage</Button>
        </div>
        <div className={styles.listContent}>{items}</div>
      </div>
    )
  }
}

interface ListItemProps {
  fileInfo: FileInfo
}

class ListItem extends Component<ListItemProps> {

  private openRightClickMenu(x: number, y: number) {
    em.emit(Events.OPEN_RIGHT_CLICK_MENU, {
      position: {x, y},
      content: {
        sections: [
          {
            items: [
              {
                name: 'Delete Item',
                command: 'fse://browse-page/delete-item?id=' + this.props.fileInfo.id
              },
              {
                name: 'Download Item',
                command: 'fse://browse-page/download-item?id=' + this.props.fileInfo.id
              }
            ]
          }
        ]
      }
    })
  }

  render() {
    const { fileInfo } = this.props
    return (
      <AnimatedElement
        className={styles.listItem}
        active={{backgroundColor: 'rgb(100, 100, 100)'}}
        hover={{backgroundColor: 'rgb(56, 56, 56)'}}
        style={{backgroundColor: 'rgb(46, 46, 46)'}}
        onContextMenu={(evt) => {
          this.openRightClickMenu(evt.clientX, evt.clientY)
        }}>
          <div className={styles.fileName}>{fileInfo.name}</div>
          <div className={styles.modDate}>{fileInfo.modDateDesc}</div>
          <div className={styles.contentType}>{fileInfo.contentType}</div>
          <div className={styles.fileSize}>{fileInfo.fileSize}</div>
      </AnimatedElement>
    )
  }
}

class GridView extends Component {

}

interface PreviewPanelProps {
  fileInfo?: FileInfo
}

class PreviewPanel extends Component<PreviewPanelProps> {

  render() {
    if (!this.props.fileInfo) {
      return (
        <div className={names(styles.inactivePreviewPanel)}>
          <div>Select an item to view preview</div>
        </div>
      )
    }

    return (
      <div className={styles.previewPanel}>

      </div>
    )
  }
}