import { createGlobalStyle } from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { boardDragging, IToDoState, toDoState } from "./atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import Board from "./components/Board";
import AddBoard from "./components/AddBoard";
import DeleteBoard from "./components/DeleteBoard";
import { SetLocalStorageHandler } from "./todo.utils";
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
  const setDragging = useSetRecoilState(boardDragging);

  const onDragEnd = (info: DropResult) => {
    const { destination, source, type } = info;

    console.log(info);
    setDragging((prev) => {
      return !prev;
    });
    // ???????????? ?????? ????????? ???
    if (!destination) return;
    // if (source.droppableId === "board" && destination.droppableId === "trash")
    //   return console.log("?????????");
    if (type === "active") {
      // ?????? ??????
      if (
        source.droppableId === "board" &&
        destination.droppableId === "trash"
      ) {
        setToDos((prev) => {
          const newToDo = Object.keys(prev);

          newToDo.splice(source.index, 1);

          const newObj: IToDoState = {};
          newToDo.forEach((key) => {
            newObj[key] = prev[key];
          });
          console.log("newObj", newObj);
          SetLocalStorageHandler(newObj);

          return newObj;
        });
      }
      // ????????? ????????????
      if (
        source.droppableId === "board" &&
        destination.droppableId === "board"
      ) {
        setToDos((prev): IToDoState => {
          const newToDo = Object.keys(prev);
          const taskObj = String(newToDo[source.index]);

          newToDo.splice(source.index, 1);
          newToDo.splice(destination.index, 0, taskObj);

          const newObj: IToDoState = {};

          newToDo.forEach((key) => {
            newObj[key] = prev[key];
          });
          return newObj;
        });
      }
      return;
    }
    // ???????????? ???????????? ?????? ??????????????? ???
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
    // ???????????? ???????????? ?????? ??????????????? ???
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
        <Droppable droppableId="board" type="active" direction="horizontal">
          {(magic) => (
            <Wrapper>
              <AddBoard />
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
            </Wrapper>
          )}
        </Droppable>
        <DeleteBoard />
      </DragDropContext>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  max-width: calc(100vw / 2);
  height: 100vh;
  position: relative;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 50px;
  padding: 10px 10px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default App;
