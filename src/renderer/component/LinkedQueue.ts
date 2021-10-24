
abstract class LinkedNode {
    private index: number;
    private next: LinkedNode;
  
    constructor() {
        this.index = -1;
        this.next = null;
    }
  
    public setIndex(index: number): void {
        this.index = index;
    }
  
    public getIndex(): number {
        return this.index;
    }
  
    public setNext(next: LinkedNode): void {
        this.next = next;
    }
  
    public getNext(): LinkedNode {
        return this.next;
    }
  }
  
  class NullNode extends LinkedNode {}
  
  class LinkedQueue<T extends LinkedNode> {
  
    private head: LinkedNode;
    private tail: LinkedNode;
    private sz: number;
  
    constructor() {
        this.tail = this.head = new NullNode();
        this.sz = 0;
    }
  
    public size(): number { return this.sz; }
  
    public isEmpty(): boolean { return this.sz == 0; }
  
    /**
     * 尾进
     * @param node 
     */
    public enQueue(node: T): void {
        if (node == null) {
            throw new Error('invalid argument: ' + node);
        }
        this.tail.setNext(node);
        this.tail = node;
        node.setIndex(this.sz);
        this.sz++;
    }
  
    /**
     * 头出
     */
    public deQueue(): T {
        if (this.sz == 0) {
            throw new Error('deQueue from empty queue');
        }
  
        let ret = this.head.getNext();
        this.head.setNext(ret.getNext());
        this.sz--;
  
        // 更新索引
        for (let i = 0, node = this.head.getNext();
            node != null; i++, node = node.getNext())
        {
            node.setIndex(i);
        }
  
        ret.setNext(null);
        return <T> ret;
    }
  
    private indexCheck(index: number): void {
        if (!(0 <= index && index < this.sz)) {
            if (this.isEmpty()) {
                throw new Error('at operation on empty queue');
            }
            else {
                throw new Error('invalid index: ' + index);
            }
        }
    }
  
    /**
     * 获取index指定的节点
     * @param index 
     */
    public get(index: number): T {
        this.indexCheck(index);
  
        let node = this.head.getNext();
        for (let i = 1; i <= index; i++) {
            node = node.getNext();
        }
        return <T> node;
    }
  
    /**
     * 从队列中删除index指定的节点
     * ，并更新节点索引
     * @param index 
     */
    public delete(index: number): T {
        this.indexCheck(index);
  
        let pre = this.head;
        let node = pre.getNext();
  
        // 找到index指定的节点
        for (let i = 0; i < index; i++) {
            pre = node;
            node = node.getNext();
        }
        pre.setNext(node.getNext());
        if (index == this.sz - 1) {
            this.tail = pre;
        }
  
        // 更新索引
        for (let tmp = node; (tmp = tmp.getNext()) != null; index++) {
            tmp.setIndex(index);
        }
  
        this.sz--;
        node.setNext(null);
        return <T> node;
    }
  
    public forEach(callbackfn: (node: T, index: number) => void): void {
        let node = this.head;
        for (let i = 0; i < this.sz; i++) {
            node = node.getNext();
            callbackfn(<T> node, i);
        }
    }
  
    public printQueue() {
        this.forEach((node) => console.log(node.toString()));
    }
  
  }
  
  export {
    LinkedNode,
    LinkedQueue
  }