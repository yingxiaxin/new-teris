export class EventBus {
  static instance: EventBus;

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  // 事件列表和处理函数的关联映射map
  private eventMap: { [key: string]: Function[] } = {};

  /**
   * 为某个事件注册一个处理函数
   * @param eventName 事件名
   * @param handler 处理函数
   * @returns boolean 是否注册成功
   */
  public on(eventName: string, handler: Function) {
    const handlers = this.eventMap[eventName] || [];
    if (handlers.indexOf(handler) === -1) {
      handlers.push(handler);
      return true;
    } else {
      return false;
    }
  }

  /**
   * 取消某个事件的监听
   * @param eventName 事件名
   * @param handler 处理函数
   * @returns boolean
   */
  public off(eventName: string, handler: Function) {
    const handlers = this.eventMap[eventName] || [];
    const idx = handlers.indexOf(handler);
    handlers.splice(idx, 1);
    return true;
  }

  /**
   * 派发一个事件，执行相应处理函数
   * @param eventName 事件名
   * @param args 事件处理所需参数
   */
  public emit(eventName: string, ...args: any[]) {
    const handlers = this.eventMap[eventName] || [];
    handlers.forEach((handler) => {
      handler(...args);
    });
  }

  /**
   * 清除所有事件监听
   */
  public clear() {
    this.eventMap = {};
    return true;
  }
}