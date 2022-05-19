import styled from "styled-components";

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.palette.grayscale[700]};
  ${(props) =>
    props.required &&
    css`
      &:after {
        content: "*";
        display: inline-flex;
        margin-left: 4px;
        color: ${(props) => props.theme.palette.error.main};
      }
    `};
`;
