import { useState } from "react";
import styled from "styled-components";
import { StikerBox } from "./StickerBox";
import { AiOutlineMenu } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";
import { BiSticker } from "react-icons/bi";

const ButtonWrapper = styled.div`
  position: fixed;
  right: 2vw;
  bottom: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  z-index: 10;

  &:hover .subBtn {
    opacity: 1;
    visibility: visible;
  }

  .commonBtn {
    cursor: pointer;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    margin: 5px;
  }

  .stickerBtn {
    background-color: #ffda06;
    transition: all 0.4s ease;
  }
  .writeBtn {
    background-color: #9fc6ec;
    transition: all 0.5s ease;
  }
  .menuBtn {
    color: #ffffff;
    background-color: #2c3e50;
  }
  .subBtn {
    opacity: 0;
    visibility: hidden;
    top: 0px;
    position: relative;
  }
`;

export function MenuButton() {
  const [isShowStiBox, setIsShowStiBox] = useState(false);

  const showStiBox = () => {
    setIsShowStiBox(!isShowStiBox);
  };

  return (
    <div>
      {isShowStiBox ? <StikerBox /> : null}
      <ButtonWrapper>
        <button className={"commonBtn writeBtn subBtn"}>
          <RiAddFill size="33" />
        </button>
        <button onClick={showStiBox} className={"commonBtn stickerBtn subBtn"}>
          스티커
        </button>
        <button className="commonBtn menuBtn">
          <AiOutlineMenu size="33" />
        </button>
      </ButtonWrapper>
    </div>
  );
}
