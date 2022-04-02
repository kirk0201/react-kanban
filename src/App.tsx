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
    const category = draggableId.slice(9);
    // console.log(category);
    console.log(info);

    // 드래그를 하지 않았을 때
    if (!destination) return;

    // 카테고리를 이동할때
    if (
      source.droppableId === "category" &&
      destination.droppableId === "category"
    ) {
      setToDos((prev): any => {
        const newToDo = { ...prev };
        const makeArr = Object.keys(newToDo).map((cate) => newToDo[cate]);
        console.log("makeArr", makeArr);
        const taskObj = makeArr[source.index];

        makeArr.splice(source.index, 1);
        makeArr.splice(destination.index, 0, taskObj);
        console.log("makeArr", makeArr);
        return { makeArr };
      });

      return console.log("통과");
    }
    // 시작점과 목적지가 같은 카테고리일 때
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
    }
    // 시작점과 목적지가 다른 카테고리일 때
    else if (destination?.droppableId !== source.droppableId) {
      setToDos((prev) => {
        const prevBoardToDo = [...prev[source.droppableId]];
        const newBoardToDo = [...prev[destination?.droppableId]];
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
          <Droppable droppableId="category" type="category">
            {(magic) => (
              <Boards ref={magic.innerRef} {...magic.droppableProps}>
                {Object.keys(toDos).map((toDoKey, index) => (
                  <Board
                    boardId={toDoKey}
                    key={toDoKey}
                    toDos={toDos[toDoKey]}
                    index={index}
                  />
                ))}
                {magic.placeholder}
              </Boards>
            )}
          </Droppable>
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
  gap: 50px;
  padding: 10px 10px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default App;
