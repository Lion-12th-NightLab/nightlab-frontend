import { post } from "@apis/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MemberPage.styled";
const MemberPage = () => {

  const [todos, setTodos] = useState({
    1: {text: ""},
    2: {text: ""},
    3: {text: ""},
    4: {text: ""},
    5: {text: ""},
  })
  const [isAnyInput, setIsAnyInput] = useState(false);
  useEffect(()=>{
    //some 메서드는 하나라도 주어진 조건을 만족하면 true를 반환함
    const hasAnyInput = Object.values(todos).some((todo)=> todo.text.trim() !== "");
    setIsAnyInput(hasAnyInput);
  },[todos])

  const handleChangeInput= (id) => (e) =>{
    setTodos((prevTodos)=>({
      ...prevTodos,
      [id]:{
        ...prevTodos[id],
        text: e.target.value,
      }
    }))
  }

  const navigate = useNavigate();

  //그냥 귀찮다고 api를 onClick에 반환하는 형식으로 하면 안됨.
  //내부적으로 실행되어야 함..
  const todoCreateApi = async() => {
    console.log("완료버튼");
    const formattedTodos = Object.values(todos).map((todo)=>({
      text: todo.text
    }));
    try{
      const response = await post("/api/todo", {
        todo: formattedTodos
      });
      console.log(response);
      navigate("/timer"); //성공 시 넘어감

    }catch(error){
      console.log("정상적으로 등록되지 않았습니다.")
      console.error(error);
    }
  }

  const handleCompleteButton = () => {
    todoCreateApi();
  }


  const handleSkipButton = () => {
    navigate("/timer");
  }

  return (
    <S.MemberPageWrapper>
      <S.MemberPageLayout>
        <S.TopBox>
          <S.TopBoxTitle>작업 타이머</S.TopBoxTitle>
          <S.GoalBox>
            <S.GoalBoxTitle>오늘의 목표 작업</S.GoalBoxTitle>
            <S.GoalBoxContents>
              {
                Object.entries(todos).map(([id,todo])=>(
                  <S.GoalBoxContentInput 
                    key={id}
                    onChange={handleChangeInput(id)}
                    value={todo.text}
                    placeholder={"to-do를 입력해주세요"}
                  />
                ))
              }
            </S.GoalBoxContents>
          </S.GoalBox>
        </S.TopBox>
        <S.ButtonWrapper>
          <S.Button onClick={handleCompleteButton} disabled={!isAnyInput} $isDisabled={!isAnyInput}>완료</S.Button>
          <S.Button onClick={handleSkipButton} $isDisabled={false}>건너뛰기</S.Button>
        </S.ButtonWrapper>
      </S.MemberPageLayout>
    </S.MemberPageWrapper>
  )
}

export default MemberPage