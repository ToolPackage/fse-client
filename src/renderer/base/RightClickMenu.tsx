import React, { Component } from 'react';
import em, { EventHandler } from '../component/EventManager';
import Events from '../component/Events';
import AnimatedElement from './AnimatedElement';
import Divider from './Divider';

const styles = require('./RightClickMenu.css') as any;

// TODO: adaptive position, cancal

interface MenuContent {
  sections: {
    items: {
      name: string
      command: string
      // shortcut:
      // subItems: 
    }[]
  }[]
}

export default class RightClickMenu extends Component {

  private eventHandler: EventHandler

  private pos: {x: number, y: number}
  private content: MenuContent

  constructor(props: any) {
    super(props)
    this.pos = {x: 0, y: 0}
  }

  componentDidMount() {
    this.eventHandler = em.on(Events.OPEN_RIGHT_CLICK_MENU, params => {
      this.pos = params.position
      this.pos.y -= 30
      this.content = params.content
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    em.off(this.eventHandler)
  }

  private executeCommand(command: string) {
    this.content = undefined
    this.forceUpdate(() => {
      em.emit(Events.EXECUTE_COMMAND, {command})
    })
  }

  render() {
    let content: JSX.Element[] = []
    if (this.content?.sections && this.content.sections.length > 0) {
      let section = this.content.sections[0]
      content.push(<MenuSection key={0}>
        {section.items.map((item, idx) => <MenuItem key={idx} name={item.name} onClick={() => this.executeCommand(item.command)} />)}
      </MenuSection>)

      for (let i = 1; i < this.content.sections.length; i++) {
        let section = this.content.sections[i]
        content.push(<Divider key={'divider-' + i} />)
        content.push(<MenuSection key={i}>
          {section.items.map((item, idx) => <MenuItem key={idx} name={item.name} onClick={() => this.executeCommand(item.command)} />)}
        </MenuSection>)
      }
    }

    return (
      <div className={styles.rightClickMenu} style={{left: this.pos.x, top: this.pos.y}}>
        <div className={styles.wrapper}>{content}</div>
      </div>
    )
  }
}

class MenuSection extends Component {

  render() {
    return (
      <div className={styles.menuSection}>{this.props.children}</div>
    )
  }
}

interface MenuItemProps {
  name: string
  onClick: () => void
}

class MenuItem extends Component<MenuItemProps> {

  render() {
    return (
      <AnimatedElement
        active={{backgroundColor: 'rgb(82, 82, 82)'}}
        hover={{backgroundColor: 'rgb(72, 72, 72)'}}
        style={{backgroundColor: 'rgb(56, 56, 56)'}}
        className={styles.menuItem}
        onClick={this.props.onClick}>{this.props.name}</AnimatedElement>
    )
  }
}