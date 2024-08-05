import Header from "@components/header/Header";
import EnterTimer from "@components/EnterTimer/EnterTimer";
import Footer from "@components/Footer/Footer";
import LiveUsers from "@components/LiveUsers/LiveUsers";
import LiveUserGraphic from "@components/UserType/LiveUserGraphic";
import MainGraphic from "@components/MainGraphic/MainGraphic";
import Introduction from "@components/Introduction/Introduction";
import ScrollTop from "@components/ScrollTop/ScrollTop";
import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { useData } from "../../contexts/WholeContext";

const HomePage = () => {
  const { header, setHeader } = useData();
  const LoginButton = header.showLoginButton;

  // console.log(LoginButton);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [liveUser, setLiveUser] = useState(null);
  const [dailyUser, setDailyUser] = useState(null);

  useEffect(() => {
    setHeader({
      showLogo: true,
      showLoginButton: true,
      showHamburgerButton: true,
    });

    const fetchData = async () => {
      try {
        const response = await axios.get("https://nightlab.site/api/main ");
        const resData = await response.data;

        const totalUser = resData.data.login_total_user;
        const connectedUser = resData.data.connect_total_user;

        setDailyUser(totalUser);
        setLiveUser(connectedUser);
      } catch (error) {
        console.error("Error:", error);
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
          <Introduction connectedUser={dailyUser} />
          <MainGraphic />
          <LiveUsers liveUser={liveUser} />
          <EnterTimer />
          <Footer />
          <ScrollTop />
        </>
      )}
    </>
  );
};

export default HomePage;
