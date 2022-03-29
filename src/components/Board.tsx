import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

interface IBoradProps {
  toDos: IToDo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}
function Board({ toDos, boardId }: IBoradProps) {
  const setToDo = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const submitHandler = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      toDo,
    };
    setToDo((prev) => {
      return {
        ...prev,
        [boardId]: [...prev[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId.toUpperCase()}</Title>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <input
          type="text"
          placeholder="ToDo"
          {...register("toDo", { required: "toDo is required" })}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <BoardArea
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoText={toDo.toDo}
                toDoId={toDo.id}
                index={index}
              />
            ))}
            {magic.placeholder}
          </BoardArea>
        )}
      </Droppable>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const Form = styled.form``;

interface IDragProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const BoardArea = styled.div<IDragProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#55efc4"
      : props.draggingFromThisWith
      ? "#fab1a0"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.5s ease-in-out;
`;
export default React.memo(Board);
