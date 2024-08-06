import { useEffect, useState } from "react";
import * as MWT from "./MyWorkTime.styled";
import WeeklyAdvice from "./WeeklyAdvice/WeeklyAdvice";

const MyWorkTime = ({ reportData }) => {
  const { user_name, profile, total_average, user_average, total_comparison } =
    reportData;

  const changeTimeFormat = (time) => {
    const HoursString = time.split(":")[0];
    const Hours = parseInt(HoursString, 10);
    const MinutesString = time.split(":")[1];
    const Minutes = parseInt(MinutesString, 10);

    return `${Hours}시간 ${Minutes}분`;
  };

  const totalComparison = Math.abs(total_comparison);
  const userAverage = changeTimeFormat(user_average);
  const totalAverage = changeTimeFormat(total_average);
  
  const [moreOrLess, setMoreOrLess] = useState();
  
  useEffect(() => {
    if (total_comparison >= 0 && moreOrLess !== "많이") {
      setMoreOrLess("많이");
    } else if (total_comparison < 0 && moreOrLess !== "적게") {
      setMoreOrLess("적게");
    }
  }, [total_comparison, moreOrLess]);

  return (
    <>
      <MWT.Container>
        <h3 className="title">나의 작업 시간 분석</h3>
        <MWT.User>
          <img src={`/character/${profile}.svg`} alt="My-Character" className="profile" />
          <MWT.UserData>
            <p>
              {user_name}님의 평균 야작 시간
              <br />
              <span>{userAverage}</span>
            </p>
            <p>
              전체 유저의 평균 야작 시간
              <br />
              <span>{totalAverage}</span>
            </p>
            <p>
              전체 유저 대비
              <br />
              <span>
                {totalComparison}시간 더 {moreOrLess}
              </span>
              작업했어요
            </p>
          </MWT.UserData>
        </MWT.User>
      </MWT.Container>
      <WeeklyAdvice reportData={reportData} />
    </>
  );
};

export default MyWorkTime;
