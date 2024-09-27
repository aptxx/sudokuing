declare module '*';

declare global {
  namespace NodeJS {
    interface Global {
      window: any;
    }
  }
}

export {};