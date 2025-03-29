import { IUser } from "../interface/IUser";

type SocketEvent = "message" | "connect";

interface SocketMessage<T = any> {
    event: SocketEvent;
    data: T;
}
export class SocketService {
    private socket: WebSocket | null = null;
    private url: string;
    private onMessageCallbacks: ((message: any) => void)[] = [];
  
    constructor(url: string) {
      this.url = url;
      console.log(this.url)

    }
  
    connect(user: IUser, onOpen?: () => void) {
        this.socket = new WebSocket(this.url);
    
        this.socket.onopen = () => {
            console.log("WebSocket connected!");
            onOpen?.();
            this.send({ event: "connect", data: {user: user }});
        };
    
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.onMessageCallbacks.forEach((callback) => callback(message));
        };
    
        this.socket.onclose = () => {
            console.log("WebSocket соединение закрыто");
        };
    
        this.socket.onerror = (error) => {
            console.error("WebSocket ошибка:", error);
        };
    }
  
    send<T>(message: SocketMessage<T>) {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket не подключен");
      }
    }
  
    onMessage(callback: (message: any) => void) {
      this.onMessageCallbacks.push(callback);
      return () => {
        this.onMessageCallbacks = this.onMessageCallbacks.filter((cb) => cb !== callback);
      };
    }
  
    disconnect() {
      this.socket?.close();
    }
  }
    