import { GameEvent } from "../control/config";
import { INITIAL_DURATION } from "../utils/constants";
import { EventBus } from "./eventBus";
import { GameStore } from "./gameStore";

export class Timer {
  static instance: Timer;

  static getInstance(): Timer {
    if (!Timer.instance) {
      Timer.instance = new Timer();
    }
    return Timer.instance;
  }

  // setInterval的uid
  private timerUid: any = 0;

  // 游戏的数据对象
  private gameStore: GameStore | null = null;

  // 事件总线
  private eventBus: EventBus;

  // 定时器速度变化的间隔
  private intervalStep: number = 300;

  constructor() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.on(GameEvent.speedChange, this.onSpeedChange.bind(this));
  }
  
  // 定时器的触发间隔
  get interval() {
    const speed = this.gameStore!.speed;
    return INITIAL_DURATION - (speed - 1) * this.intervalStep;
  }

  // 速度改变，重新启动定时器
  private onSpeedChange() {
    this.stop();
    this.start();
  }

  private tick() {
    this.eventBus.emit(GameEvent.tick);
  }

  public registerGameStore(gameStore: GameStore) {
    this.gameStore = gameStore;
  }

  public start() {
    this.timerUid = setInterval(this.tick, this.interval);
  }

  public stop() {
    clearInterval(this.timerUid);
  }
}