import { atom } from "recoil";

export interface IToDo {
  toDo: string;
  id: number;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "todostate",
  default: {
    todo: [
      { id: 1, toDo: "one" },
      { id: 2, toDo: "two" },
    ],
    doing: [
      { id: 3, toDo: "three" },
      { id: 4, toDo: "four" },
    ],
    done: [{ id: 5, toDo: "five" }],
    test: [],
    // test2: [],
    // test3: [],
    // test4: [],
  },
});
