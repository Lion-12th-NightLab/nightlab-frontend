import { fontStyles } from "@styles/mixins";
import styled from "styled-components";

export const Pattern = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 24px;
  padding: 0 16px;
  padding-bottom: 36px;

  border-bottom: 1px dashed ${({ theme }) => theme.colors.Gray_50};

  .title {
    ${({ theme }) => fontStyles(theme.fonts.Header_3)}
    color: ${({ theme }) => theme.colors.White};
  }

  .description {
    ${({ theme }) => fontStyles(theme.fonts.Body_2_1)}
    color: ${({ theme }) => theme.colors.Gray_20};

    margin-top: 12px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;

  gap: 12px;

  margin-top: 32px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 173px;
  height: 202px;

  border: 1px solid ${({ theme }) => theme.colors.Sub_Red_20};
  background: ${({ theme }) => theme.colors.Opacity_White_10};

  border-radius: 8px;

  .text {
    ${({ theme }) => fontStyles(theme.fonts.Body_2_1)}
    color: ${({ theme }) => theme.colors.Sub_Red_10};
  }

  .time {
    font-family: "'SUIT Variable', sans-serif";
    font-size: 48px;
    font-weight: 800;

    color: ${({ theme }) => theme.colors.Main_Red};

    margin: 36px auto;
  }
`;
