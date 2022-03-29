import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableProps {
  toDoText: string;
  toDoId: number;
  index: number;
}
function DraggableCard({ toDoText, toDoId, index }: IDraggableProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 10px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
`;
export default DraggableCard;
