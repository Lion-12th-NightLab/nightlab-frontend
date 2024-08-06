import * as WR from "./WorkReport.styled";

import { get } from "@apis/index";
import { useEffect, useState } from "react";

import Comparison from "@components/Comparison/Comparison";
import Header from "@components/header/Header";
import MyWorkTime from "@components/MyWorkTime/MyWorkTime";
import WorkPattern from "@components/WorkPattern/WorkPattern";
import FillProgressBar from "@components/FillProgressBar/FillProgressBar";
import { useData } from "../../contexts/WholeContext";

const WorkReport = () => {
  const { LoginButton, setHeader } = useData();

  // 사용자의 분석 리포트 데이터를 담을 State
  const [reportData, setReportData] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // 헤더 중 렌더링 할 요소들 결정
    setHeader({
      showLogo: true,
      showLoginButton: true,
      showHamburgerButton: true,
    });

    const fetchData = async () => {
      try {
        const response = await get("/api/analyze");
        const resData = await response.data;

        const userData = resData.data;
        console.log(userData);

        setReportData(userData);
      } catch (error) {
        console.error("Fail to load user data", error);
        alert("사용자 분석 리포트를 불러오는데 실패했습니다.");
      }
    };

    fetchData();
  }, [setHeader]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);

    setHeader({
      showLogo: true,
      showLoginButton: !LoginButton,
      showHamburgerButton: true,
    });
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} />

      {!isMenuOpen && (
        <>
          {reportData ? (
            <>
              <WorkPattern reportData={reportData} />
              <Comparison reportData={reportData} />
              <MyWorkTime reportData={reportData} />
            </>
          ) : (
            <WR.LoadingContainer>
              <div className="message">사용자의 리포트를 불러오는중...</div>
              <WR.ProgressionBar>
                <FillProgressBar duration={5000} />
              </WR.ProgressionBar>
            </WR.LoadingContainer>
          )}
        </>
      )}
    </>
  );
};

export default WorkReport;
