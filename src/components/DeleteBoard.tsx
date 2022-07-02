import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardDragging } from "../atoms";

function DeleteBoard() {
  const getDragging = useRecoilValue(boardDragging);
  return (
    <Droppable droppableId="trash" type="active">
      {(magic) => (
        <Trash ref={magic.innerRef} {...magic.droppableProps}>
          <TrashMention isDragging={Boolean(getDragging)}>
            삭제를 원하시면 이곳으로 옮기세요
          </TrashMention>
          <img src="trash.png"></img>
        </Trash>
      )}
    </Droppable>
  );
}

const Trash = styled.div`
  position: fixed;
  right: 10px;
  bottom: 0;
`;
interface ITrashProps {
  isDragging: boolean;
}
const TrashMention = styled.div<ITrashProps>`
  position: relative;
  background-color: white;
  padding: 5px;
  font-weight: 700;
  border-radius: 15px;
  ${(props) =>
    props.isDragging ? "animation: 1s linear infinite trashAni;" : ""}

  @keyframes trashAni {
    from {
      transform: translateY(10px);
    }
    to {
      transform: translateY(-10px);
    }
  }
`;

export default DeleteBoard;
