import { fontStyles } from "@styles/mixins";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavBar = styled.div`
  width: 100%;
  height: 44px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 131px;

  .mainLogo {
    width: 120px;
    margin: 12px 0 4.67px 18px;
  }
`;

export const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .login-btn {
    display: inline-block;

    width: 80px;
    height: 28px;

    padding: 2px 14px;
    margin: 10px 0;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => fontStyles(theme.fonts.Subhead_4)}

    border-radius: 18px;
    border: 1px solid ${({ theme }) => theme.colors.White};
  }

  .close-btn {
    margin: 10px 16px 10px 0;
  }

  /* input 태그를 사용해 햄버거 버튼 모양을 X로 상호 변형 */
  #menu-toggle {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  #menu-toggle:checked + #menu-button span::before {
    transform: rotate(-45deg);
    top: 0;
    left: 0;
  }

  #menu-toggle:checked + #menu-button span {
    background: none;
  }

  #menu-toggle:checked + #menu-button span::after {
    transform: rotate(45deg);
    top: 0;
    left: 0;
  }
`;

export const HamburgerButton = styled.label`
  display: inline-block;

  width: 24px;
  height: 24px;

  position: relative;

  margin: 10px 16px;

  cursor: pointer;

  span {
    width: 22px;
    height: 3px;

    margin-top: 10px;

    position: absolute;
    top: 0;
    left: 0;

    background-color: ${({ theme }) => theme.colors.White};

    transition: 0.3s ease-in-out;

    &::before,
    &::after {
      content: "";
      position: absolute;

      width: 22px;
      height: 3px;

      background-color: ${({ theme }) => theme.colors.White};

      transition: 0.3s ease-in-out;
    }

    &::before {
      top: -8px;
    }

    &::after {
      top: 8px;
    }
  }
`;

export const MenuItems = styled.ul`
  width: 100%;
  
  display: flex;
  flex-direction: column;

  margin-top: 6px;

  ${({ theme }) => fontStyles(theme.fonts.Subhead_2_2)};
  color: ${({ theme }) => theme.colors.White};
  
  list-style: none;

  transform: translateX(150%);
  transition: 0.4s ease-out;

  li {
    width: 100%;
    height: 56px;

    padding-left: 24px;

    display: flex;
    align-items: center;

    border-top: 1px solid ${({ theme }) => theme.colors.Opacity_White_50};
  }

  button {
    width: 100%;
    height: 56px;

    padding-left: 24px;

    display: flex;
    align-items: center;

    ${({ theme }) => fontStyles(theme.fonts.Subhead_2_2)};
    color: ${({ theme }) => theme.colors.White};

    border-top: 1px solid ${({ theme }) => theme.colors.Opacity_White_50};

    &:disabled {
      cursor: default;
      color: ${({ theme }) => theme.colors.Opacity_White_25};
    }
  }

  .last-menu {
    border-bottom: 1px solid ${({ theme }) => theme.colors.Opacity_White_50};
  }
`;
