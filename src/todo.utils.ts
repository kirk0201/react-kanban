import { IToDoState, LOCAL_TODO } from "./atoms";

export const SetLocalStorageHandler = (result: IToDoState) => {
  return localStorage.setItem(LOCAL_TODO, JSON.stringify(result));
};
