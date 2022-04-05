import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "../atoms";
import { SetLocalStorageHandler } from "../todo.utils";

interface IBoardForm {
  board: string;
}
function AddBoard() {
  const [getBoard, addBoard] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IBoardForm>();

  const boardHandler = ({ board }: IBoardForm) => {
    addBoard((prev) => {
      const newBoard = {
        ...prev,
        [board]: [],
      };
      console.log("newBoard", newBoard);
      SetLocalStorageHandler(newBoard);
      return newBoard;
    });
    setValue("board", "");
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(boardHandler)}>
        <input
          type="text"
          placeholder="Please add your board name"
          {...register("board", { required: "board name is required" })}
        ></input>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  /* top: 15vh; */
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  padding-bottom: 5vh;
  input {
    width: 30vw;
    height: 5vh;
  }
`;
export default AddBoard;
