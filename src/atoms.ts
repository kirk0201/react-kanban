import { atom } from "recoil";

export const LOCAL_TODO = "LOCAL_TODO";
const getLocalStorage = localStorage.getItem(LOCAL_TODO) || "{}";

const parsedLocalStorage = JSON.parse(getLocalStorage);
export interface IToDo {
  toDo: string;
  id: number;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "todostate",
  default: parsedLocalStorage,
});
