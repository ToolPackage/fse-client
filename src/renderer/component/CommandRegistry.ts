import em, { EventHandler } from './EventManager';
import Events from './Events';
import URLParse from 'url-parse';
import StringTokenizer from './StringTokenizer';

interface CommandParams {
  url: URLParse
  pathVariables: Dictionary
  queries: Dictionary
}

type Dictionary = {[name: string]: any}

export type CommandHandler = (params: CommandParams) => void

class CommandRegistry {

  private eventHandler: EventHandler
  
  // host -> RoutingTree
  private hostMap: Map<string, RoutingTree> = new Map()

  constructor() {
    this.eventHandler = em.on(Events.EXECUTE_COMMAND, params => this.execute(params.command))
  }

  public destroy() {
    em.off(this.eventHandler)
  }

  public execute(command: string) {
    let cmd = URLParse(command)
    if (cmd.protocol !== 'mit:') {
      throw new Error(`unsupported command protocl ${cmd.protocol}`)
    }
    
    let routing = this.hostMap.get(cmd.host)
    if (!routing) {
      throw new Error(`host ${cmd.host} not found`)
    }

    const commandParams: CommandParams = {
      url: cmd,
      pathVariables: {},
      queries: this.parseQueries(cmd)
    }

    let handlerNode = routing.search(cmd.pathname, commandParams.pathVariables)
    if (!handlerNode) {
      throw new Error(`path ${cmd.pathname} not found`)
    }

    handlerNode.handler(commandParams)
  }

  private parseQueries(cmd: URLParse): Dictionary {
    let queries: Dictionary = {}
    for (let pattern of cmd.pathname.substr(1).split('&')) {
      let i = pattern.indexOf('=')
      queries[pattern.substr(0, i)] = pattern.substr(i + 1)
    }
    return queries
  }

  public register(command: string, handler: CommandHandler) {
    if (!handler) {
      throw new Error('handler cannot be null')
    }

    let cmd = URLParse(command)
    if (cmd.protocol !== 'mit:') {
      throw new Error(`unsupported command protocl ${cmd.protocol}`)
    }

    let routing = this.hostMap.get(cmd.host)
    if (!routing) {
      throw new Error(`host ${cmd.host} not found`)
    }

    routing.register(cmd.pathname, handler)
  }
}

class RoutingNode {
  private children: RoutingNode[] = []

  constructor(
    public readonly name: string,
    public readonly matchAny: boolean = false,
    public readonly handler: CommandHandler = null) {
  }

  add(node: RoutingNode) {
    this.children.push(node)
  }

  find(name: string): RoutingNode {
    for (let node of this.children) {
      if (node.name === name) {
        return node
      }
    }

    return null
  }
}

class RoutingTree extends RoutingNode {

  constructor() {
    super(null)
  }

  public register(path: string, handler: CommandHandler) {
    this.iterate(path, () => {}, (token, hasNext) =>
      new RoutingNode(token, token[0] == '{' && token[-1] == '}', hasNext ? null : handler))
  }

  public search(path: string, pathVariables: Dictionary): RoutingNode {
    return this.iterate(path, (token, n) => {
      if (n.matchAny) {
        const name = n.name.substr(1, -1)
        pathVariables[name] = token
      }
    }, (token, hasNext) => {
      return null
    })
  }

  private iterate(path: string,
    onMatch: (token: string, n: RoutingNode) => void,
    onMismatch: (token: string, hasNext: boolean) => RoutingNode): RoutingNode {
    let parent: RoutingNode = this
    let n: RoutingNode = null
    let tokens = new StringTokenizer(path, '/')

    if (tokens.hasNext()) {
      while (true) {
        let token = tokens.nextToken().trim()
        if (token.length == 0) {
          continue
        }

        n = parent.find(token)
        let hasNext = tokens.hasNext()

        if (n) {
          onMatch(token, n)
        } else {
          n = onMismatch(token, hasNext)
          if (!n) {
            return null
          }
          parent.add(n)
        }

        if (!hasNext) {
          break
        }
        
        parent = n
      }

    }
    
    return n
  }
}

export const cr = new CommandRegistry()