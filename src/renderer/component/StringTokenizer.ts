
export default class StringTokenizer {

  private currentPosition: number
  private newPosition: number
  private maxPosition: number

  constructor(private s: string, private delimiters: string = ' \t\n\r\f') {
    this.currentPosition = 0
    this.newPosition = -1
    this.maxPosition = s.length
  }

  hasNext(): boolean {
    this.newPosition = this.skipDelimiters(this.currentPosition)
    return this.newPosition < this.maxPosition
  }

  private skipDelimiters(startPos: number): number {
    let pos = startPos
    while (pos < this.maxPosition) {
      let c = this.s.charAt(pos)
      if (this.delimiters.indexOf(c) < 0) {
        break
      }
      pos++
    }
    return pos
  }

  nextToken(): string {
    this.currentPosition = this.newPosition >= 0 ? this.newPosition : this.skipDelimiters(this.currentPosition)
    this.newPosition = -1
    if (this.currentPosition >= this.maxPosition) {
      return null
    }
    let start = this.currentPosition
    this.currentPosition = this.scanToken(this.currentPosition)
    return this.s.substring(start, this.currentPosition)
  }

  private scanToken(startPos: number): number {
    let pos = startPos
    while (pos < this.maxPosition) {
      let c = this.s.charAt(pos);
      if (this.delimiters.indexOf(c) >= 0) {
        break
      }
      pos++
    }
    if (startPos == pos) {
      let c = this.s.charAt(pos)
      if (this.delimiters.indexOf(c) >= 0) {
        pos++
      }
    }
    return pos
  }
}