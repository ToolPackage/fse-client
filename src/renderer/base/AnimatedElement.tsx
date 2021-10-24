import React, { Component, CSSProperties, DOMAttributes } from 'react'
import anime from 'animejs'

interface AnimatedElementProps extends DOMAttributes<HTMLDivElement> {
  active?: AnimationConfig
  hover?: AnimationConfig
  className?: string
  getRef?: (ref: React.RefObject<HTMLDivElement>) => void
  style?: CSSProperties | undefined
}

interface AnimationConfig {
  color?: string
  backgroundColor?: string
}

export default class AnimatedElement extends Component<AnimatedElementProps> {

  protected ref: React.RefObject<HTMLDivElement>
  private color: string
  private backgroundColor: string
  private isHovered: boolean

  private onMouseEnter: () => void
  private onMouseLeave: () => void
  private onMouseDown: () => void
  private onMouseUp: () => void

  constructor(props: AnimatedElementProps) {
    super(props)
    this.ref = React.createRef()

    if (this.props.getRef) {
      this.props.getRef(this.ref)
    }

    if (props.hover) {
      this.onMouseEnter = this.startHoverAnimation
      this.onMouseLeave = this.stopHoverAnimation
    } else {
      this.onMouseEnter = () => {}
      this.onMouseLeave = () => {}
    }

    if (props.active) {
      this.onMouseDown = this.startActiveAnimation
      this.onMouseUp = this.stopActiveAnimation
    } else {
      this.onMouseDown = () => {}
      this.onMouseUp = () => {}
    }

    // if (!this.background) {
    //   this.background = 'rgb(56, 56, 56)'
    // }

    // if (!this.hover) {
    //   this.hover = 'rgb(80, 80, 80)'
    // }

    // if (!this.active) {
    //   this.active = 'rgb(100, 100, 100)'
    // }
  }

  componentDidMount() {
    this.detectColor()
  }

  detectColor() {
    const { style } = this.props
    if (style) {
      let tmp = (style.background || style.backgroundColor) as any;
      if (typeof(tmp) === 'string') {
        this.backgroundColor = tmp
      }

      this.color = style.color
    }
  }

  protected startHoverAnimation() {
    this.isHovered = true
    anime({
      targets: this.ref.current,
      color: this.props.hover.color,
      backgroundColor: this.props.hover.backgroundColor,
      easing: 'easeInOutSine',
      duration: 150
    })
  }

  protected stopHoverAnimation() {
    this.isHovered = false
    anime({
      targets: this.ref.current,
      color: this.color,
      backgroundColor: this.backgroundColor,
      easing: 'easeInOutSine',
      duration: 150
    })
  }

  protected startActiveAnimation() {
    anime({
      targets: this.ref.current,
      color: this.props.active.color,
      backgroundColor: this.props.active.backgroundColor,
      easing: 'easeInOutSine',
      duration: 100
    })
  }

  protected stopActiveAnimation() {
    let color = this.isHovered && this.props.hover.color ? this.props.hover.color: this.color
    let backgroundColor = this.isHovered && this.props.hover.backgroundColor ? this.props.hover.backgroundColor: this.backgroundColor
    anime({
      targets: this.ref.current,
      color: color,
      backgroundColor: backgroundColor,
      easing: 'easeInOutSine',
      duration: 100
    })
  }

  render() {
    let props: any = Object.assign({}, this.props)
    delete props['active']
    delete props['hover']
    delete props['getRef']
    props.ref = this.ref
    props.onMouseEnter = () => this.onMouseEnter()
    props.onMouseLeave = () => this.onMouseLeave()
    props.onMouseDown = () => this.onMouseDown()
    props.onMouseUp = () => this.onMouseUp()
    return React.createElement('div', props, this.props.children)
  }
}