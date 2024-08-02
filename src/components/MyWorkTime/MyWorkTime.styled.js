import { fontStyles } from "@styles/mixins";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 36px 0 72px;

  .title {
    ${({ theme }) => fontStyles(theme.fonts.Header_3)}
    color: ${({ theme }) => theme.colors.White};
  }
`;

export const User = styled.div`
  display: flex;

  margin-top: 36px;

  .profile {
    width: 150px;
    height: 200px;

    margin-right: 32px;
  }
`;

export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => fontStyles(theme.fonts.Body_1_2)}
  color: ${({ theme }) => theme.colors.Gray_20};

  span {
    ${({ theme }) => fontStyles(theme.fonts.Subhead_1)}
    color: ${({ theme }) => theme.colors.Sub_Red_20};
  }
`;
