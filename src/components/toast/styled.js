import styled from "styled-components";

export const ToastWrap = styled.div`
  @keyframes animation-timer {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  position: relative;
  margin: 8px 0 -12px -12px;
  &:after {
    content: "";
    animation: ${(props) => `animation-timer ${props.duration}ms linear`};
    animation-play-state: running;
    background-color: rgba(0, 0, 0, 0.2);
    bottom: 0;
    height: 5px;
    left: 0;
    opacity: 1;
    position: absolute;
    width: 0;
  }
  &:hover {
    &:after {
      animation-play-state: paused;
    }
  }

  .MuiAlert {
    &-message {
      width: 270px;
      font-size: 14px;
      word-wrap: break-word;
      word-break: keep-all;
    }
    &-filledSuccess {
      background-color: #4cae4f;
    }
    &-filledError {
      background-color: #f34336;
    }
    &-filledWarning {
      background-color: #ff9804;
    }
    &-filledInfo {
      background-color: #2196f3;
    }
    &-icon {
      padding: 19px 0;
    }
  }
`;
