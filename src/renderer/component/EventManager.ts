import { LinkedQueue, LinkedNode } from "./LinkedQueue";

type Params = {[name: string]: any}

type Callable = (params: Params) => void

export class EventHandler extends LinkedNode {
    private evName: string;
    private callback: Callable;

    constructor(evName: string, callback: Callable) {
        super();
        this.evName = evName;
        this.callback = callback;
    }

    public getEventName(): string { return this.evName; }
    public getCallback(): Callable { return this.callback; }
}

class GlobalEventManager {

    private handlers: {[index: string]: LinkedQueue<EventHandler>};

    constructor() {
        this.handlers = {};
    }

    public on(evName: string, callback: Callable): EventHandler {
        let handler = new EventHandler(evName, callback);
        let chain = this.handlers[evName];
        if (!chain) {
            chain = this.handlers[evName] = new LinkedQueue<EventHandler>();
        }
        chain.enQueue(handler);
        return handler;
    }

    public off(handler: EventHandler): boolean {
        const evName = handler.getEventName();
        if (!this.handlers[evName]) {
            return false;
        }
        try {
            this.handlers[evName].delete(handler.getIndex());
            return true
        }
        catch {
            return false;
        }
    }

    public emit(evName: string, params: Params) {
        let chain = this.handlers[evName]
        if (chain) {
            chain.forEach((handler) => handler.getCallback()(params));
        }
    }

}

export default new GlobalEventManager();