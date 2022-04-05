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
  const { register, handleSubmit, setValue, setError, formState } =
    useForm<IBoardForm>();

  const boardHandler = (info: IBoardForm) => {
    const { board } = info;

    if (!board.match(/^[^0-9].*/gm)) {
      return setError(
        "board",
        { message: "Don't start with a number" },
        { shouldFocus: true }
      );
    }
    addBoard((prev) => {
      const newBoard = {
        ...prev,
        [board]: [],
      };
      console.log(info);
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
          {...register("board", {
            required: "board name is required",
            validate: (value) =>
              value.match(/^[^0-9].*/gm)
                ? true
                : alert("Don't start with a number")!,
          })}
        ></input>
        <ErrorDiv>{formState.errors.board?.message}</ErrorDiv>
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
  flex-direction: column;
  justify-content: center;
  padding-bottom: 5vh;
  input {
    width: 30vw;
    height: 5vh;
    margin-bottom: 10px;
  }
`;
const ErrorDiv = styled.span`
  display: flex;
  justify-content: center;
  background-color: #fc99aa;
  color: #ff4f4f;
  font-weight: 700;
  margin: 0 auto;
  /* padding: 3px 3px; */
`;
export default AddBoard;
