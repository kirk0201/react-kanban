import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { SetLocalStorageHandler } from "../todo.utils";

interface IBoardForm {
  board: string;
}
function AddBoard() {
  const addBoard = useSetRecoilState(toDoState);
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
          placeholder="추가하시려는 보드명을 입력하세요"
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
`;
export default AddBoard;
