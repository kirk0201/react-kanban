import { atom } from "recoil";

export interface IToDo {
  toDo: string;
  id: number;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "todostate",
  default: {
    todo: [
      { id: 1, toDo: "one" },
      { id: 2, toDo: "two" },
    ],
    doing: [],
    done: [],
  },
});
