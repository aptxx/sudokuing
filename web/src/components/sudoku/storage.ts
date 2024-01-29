import { GameState } from "./types";

export function loadGame(prefix: string): null | GameState {
  const data = localStorage.getItem(`${prefix || ''}game`);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

export function saveGame(prefix: string, state: GameState) {
  localStorage.setItem(`${prefix || ''}game`, JSON.stringify(state));
}

export function loadPlaytime(prefix: string): number {
  return +(localStorage.getItem(`${prefix || ''}playtime`) || '') || 0;
}

export function savePlaytime(playtime: number, prefix: string) {
  localStorage.setItem(`${prefix || ''}playtime`, playtime.toString());
}
