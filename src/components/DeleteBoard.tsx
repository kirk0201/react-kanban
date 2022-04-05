import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function DeleteBoard() {
  return (
    <Draggable draggableId="delete" index={0}>
      {(magic) => (
        <img
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          src="trash.png"
        ></img>
      )}
    </Draggable>
  );
}

export default DeleteBoard;
