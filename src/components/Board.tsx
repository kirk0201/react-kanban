import React from "react";
import {
  Draggable,
  DraggableStateSnapshot,
  Droppable,
} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardDragging, IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

interface IBoradProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}
interface IForm {
  toDo: string;
}
function Board({ toDos, boardId, index }: IBoradProps) {
  const setDragBoard = useSetRecoilState(boardDragging);
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
  const isDragging = (snapshot: DraggableStateSnapshot) => {
    if (snapshot.isDragging) {
      setDragBoard(true);
    } else setDragBoard(false);
  };

  return (
    <Draggable key={boardId} draggableId={"board-" + boardId} index={index}>
      {(magic, snapshot) => (
        <BoardWrapper
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {isDragging(snapshot)}
          <Title>{boardId.toUpperCase()}</Title>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <input
              type="text"
              placeholder="ToDo"
              {...register("toDo", { required: "toDo is required" })}
            />
          </Form>
          <Droppable droppableId={boardId} type="card">
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
        </BoardWrapper>
      )}
    </Draggable>
  );
}

const BoardWrapper = styled.div`
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
