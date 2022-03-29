import { createGlobalStyle } from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import { useRecoilState } from "recoil";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";
const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing:border-box;
}
body {
  font-family: 'Noto Sans KR', 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color: black
}
a {
  text-decoration: none;
  color:inherit;
}
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((prev): any => {
        const newToDo = [...prev[source.droppableId]];
        const taskObj = newToDo[source.index];

        newToDo.splice(source.index, 1);
        newToDo.splice(destination.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: newToDo,
        };
      });
    } else if (destination?.droppableId !== source.droppableId) {
      setToDos((prev) => {
        const prevBoardToDo = [...prev[source.droppableId]];
        const newBoardToDo = [...prev[destination?.droppableId as string]];
        const taskObj = prevBoardToDo[source.index];
        prevBoardToDo.splice(source.index, 1);
        newBoardToDo.splice(destination?.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: prevBoardToDo,
          [destination?.droppableId]: newBoardToDo,
        };
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((toDoKey) => (
              <Board key={toDoKey} toDos={toDos[toDoKey]} boardId={toDoKey} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
`;

export default App;
