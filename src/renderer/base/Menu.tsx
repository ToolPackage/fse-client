import React, { Component } from 'react';
import Button from './Button';

const styles = require('./Menu.css') as any

interface MenuProps {
}

export class Menu extends Component<MenuProps> {

  render() {
    return (
      <div className={styles.menu}>
        {this.props.children}
      </div>
    )
  }
}

interface MenuItemProps {
  name: string
}

interface MenuItemState {
  open: boolean
}

export class MenuItem extends Component<MenuItemProps, MenuItemState> {

  constructor(props: any) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { open } = this.state
    return (
      <div className={styles.menuItem}
        onMouseEnter={() => this.setState({open: true})}
        onMouseLeave={() => this.setState({open: false})}>
          <Button>{this.props.name}</Button>
          {open && 
          <div className={styles.menuItemContainer}>
            {this.props.children}
          </div>}
      </div>
    )
  }
}

interface MenuSubItemProps {
  name: string
  onSelect?: () => void
}

export class MenuSubItem extends Component<MenuSubItemProps> {

  render() {
    return (
      <div className={styles.menuSubItem}>
        <Button
          style={{padding: '0px 20px', width: '200px', textAlign: 'left', backgroundColor: 'rgb(40, 40, 40)'}}
          fixSize={false}
          onClick={this.props.onSelect}>
            {this.props.name}
        </Button>
      </div>
    )
  }
}

export default ({
  Menu,
  MenuItem,
  MenuSubItem
})