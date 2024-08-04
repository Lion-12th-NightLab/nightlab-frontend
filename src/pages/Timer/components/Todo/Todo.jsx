import { IcCheckGoal, IcPlusRed, IcUncheckGoal, IcXRed } from "@assets/svgs/index";
import { useState } from "react";
import * as S from "./Todo.styled";

const Todo = () => {
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [todos, setTodos] = useState({
    1: {text: '0721 목표작업', completed: false, isEditing: false },
    2: {text: '0721 목표작업', completed: false, isEditing: false },
    3: {text: '0721 목표작업', completed: false, isEditing: false },
    4: {text: '0721 목표작업', completed: false, isEditing: false },
    5: {text: '0721 목표작업', completed: false, isEditing: false },
  })
  

  return (
    <S.TodoWrapper>
      <S.TodoIconWrapper>
        <S.TodoText>to-do</S.TodoText>
        <S.TodoIcon/>
      </S.TodoIconWrapper>
      <S.TodoListWrapper>
        <S.TodoListLayout>
          <S.TodoListHeader>
            <S.TodoListTitle>목표 작업<IcPlusRed/></S.TodoListTitle>
            <S.TodoListCloseBtn><IcXRed/></S.TodoListCloseBtn>
          </S.TodoListHeader>

          <S.TodoListContainer>
            {Object.entries(todos).map(([id,todo])=>(
              <S.TodoListBox key={id}>
              <S.TodoListBoxContent>
                {todo.completed? <IcCheckGoal/> : <IcUncheckGoal/>}
                <S.TodoListBoxText>{todo.text}</S.TodoListBoxText>
              </S.TodoListBoxContent>
              <S.TodoListBoxEdit>
                <S.TodoListBoxEditBtn/>
                <S.TodoListBoxDeleteBtn/>
              </S.TodoListBoxEdit>
            </S.TodoListBox>
            ))}
          </S.TodoListContainer>

        </S.TodoListLayout>
      </S.TodoListWrapper>
    </S.TodoWrapper>
  )
}

export default Todo